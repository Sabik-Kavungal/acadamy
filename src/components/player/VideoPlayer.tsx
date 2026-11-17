import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  FileText,
  Loader2,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  lessonKey?: string;
  initialTime?: number;
  onSavePosition?: (seconds: number) => void;
  onEnded?: () => void;
  onFallbackAction?: () => void;
  fallbackActionLabel?: string;
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;

type VideoSource =
  | { kind: 'html5'; url: string }
  | { kind: 'embed'; embedUrl: string }
  | { kind: 'invalid' };

function formatTime(secs: number): string {
  if (!Number.isFinite(secs) || secs < 0) return '0:00';
  const total = Math.floor(secs);
  const mins = Math.floor(total / 60);
  const rem = total % 60;
  return `${mins}:${rem.toString().padStart(2, '0')}`;
}

function resolveVideoSource(rawUrl: string): VideoSource {
  const trimmed = rawUrl.trim();
  if (!trimmed) return { kind: 'invalid' };

  if (trimmed.startsWith('/')) {
    return { kind: 'html5', url: trimmed };
  }

  try {
    const parsed = new URL(trimmed);
    if (
      parsed.protocol !== 'https:' &&
      parsed.protocol !== 'http:' &&
      parsed.protocol !== 'blob:'
    ) {
      return { kind: 'invalid' };
    }

    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();

    // YouTube watch / short / embed links
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const videoId = parsed.searchParams.get('v');
      if (videoId) {
        return {
          kind: 'embed',
          embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`,
        };
      }
      if (parsed.pathname.startsWith('/embed/')) {
        return { kind: 'embed', embedUrl: trimmed };
      }
    }
    if (host === 'youtu.be') {
      const videoId = parsed.pathname.replace(/^\/+/, '').split('/')[0];
      if (videoId) {
        return {
          kind: 'embed',
          embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`,
        };
      }
    }

    // Vimeo links
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const match = parsed.pathname.match(/\/(\d+)/);
      if (match?.[1]) {
        return {
          kind: 'embed',
          embedUrl: `https://player.vimeo.com/video/${match[1]}`,
        };
      }
    }

    return { kind: 'html5', url: trimmed };
  } catch {
    return { kind: 'invalid' };
  }
}

export function VideoPlayer({
  src,
  title,
  lessonKey,
  initialTime = 0,
  onSavePosition,
  onEnded,
  onFallbackAction,
  fallbackActionLabel = 'Read Lesson Notes & Resources',
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastSavedRef = useRef<number>(0);
  const initialTimeRef = useRef<number>(initialTime);
  initialTimeRef.current = initialTime;

  const source = useMemo(() => resolveVideoSource(src), [src]);
  const validSrc = source.kind !== 'invalid';
  const activeKey = `${lessonKey ?? src}`;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(validSrc);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasError, setHasError] = useState(!validSrc);
  const [retryKey, setRetryKey] = useState(0);
  const [resumedFrom, setResumedFrom] = useState<number | null>(null);

  // Only reset player state when lesson or stream URL actually changes,
  // never when initialTime updates as playback position is saved.
  useEffect(() => {
    const startAt = initialTimeRef.current || 0;
    lastSavedRef.current = 0;
    setHasError(!validSrc);
    setIsLoading(validSrc);
    setIsPlaying(false);
    setDuration(0);
    setCurrentTime(startAt);
    setResumedFrom(startAt > 5 ? startAt : null);
  }, [src, activeKey, validSrc]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Persist playback position on lesson unmount or source switch
  useEffect(() => {
    return () => {
      if (videoRef.current && onSavePosition && videoRef.current.currentTime > 0) {
        onSavePosition(videoRef.current.currentTime);
      }
    };
  }, [onSavePosition, src, activeKey]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid || hasError || source.kind !== 'html5') return;
    if (vid.paused) {
      vid.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      vid.pause();
      onSavePosition?.(vid.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setIsLoading(false);
    setDuration(vid.duration || 0);
    vid.volume = volume;
    vid.muted = muted;
    vid.playbackRate = playbackRate;
    const resumeTarget = initialTimeRef.current;
    if (resumeTarget > 0 && resumeTarget < (vid.duration || Infinity) - 2) {
      vid.currentTime = resumeTarget;
      setCurrentTime(resumeTarget);
    }
  };

  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setCurrentTime(vid.currentTime);
    if (onSavePosition && Math.abs(vid.currentTime - lastSavedRef.current) >= 2) {
      lastSavedRef.current = vid.currentTime;
      onSavePosition(vid.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const vid = videoRef.current;
    if (!vid || hasError) return;
    vid.currentTime = val;
    setCurrentTime(val);
    onSavePosition?.(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    setMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) {
      videoRef.current.muted = next;
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const retryVideo = () => {
    if (!validSrc) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
    setHasError(false);
    setIsLoading(true);
    setRetryKey((k) => k + 1);
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden bg-[#0E0E1D] border border-white/10 shadow-xl"
    >
      {/* Video Viewport */}
      <div className="relative aspect-video bg-black flex items-center justify-center">
        {!hasError && source.kind === 'embed' ? (
          <iframe
            key={`${activeKey}-${source.embedUrl}-${retryKey}`}
            src={source.embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className="w-full h-full border-0"
          />
        ) : !hasError && source.kind === 'html5' ? (
          <video
            ref={videoRef}
            key={`${activeKey}-${source.url}-${retryKey}`}
            src={source.url}
            preload="metadata"
            playsInline
            onClick={togglePlay}
            onLoadStart={() => setIsLoading(true)}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => {
              setIsLoading(false);
              setIsPlaying(true);
            }}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => {
              setIsPlaying(false);
              if (videoRef.current) onSavePosition?.(videoRef.current.currentTime);
            }}
            onEnded={() => {
              setIsPlaying(false);
              onEnded?.();
            }}
            onError={() => {
              setIsLoading(false);
              setIsPlaying(false);
              setHasError(true);
            }}
            className="w-full h-full object-contain cursor-pointer"
            aria-label={title}
          />
        ) : (
          <div className="p-5 sm:p-6 text-center max-w-md space-y-3">
            <div className="mx-auto w-11 h-11 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              {validSrc ? 'Video Stream Unavailable' : 'Lesson Video Not Configured'}
            </h3>
            <p className="text-xs text-[#B8BED4] leading-relaxed">
              {validSrc
                ? 'Unable to stream this lesson video right now. Retry loading the stream or read the written lesson notes below.'
                : 'No valid video URL is configured for this lesson yet. Configure a stream URL in Admin Lessons or review the lesson notes below.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              {validSrc && (
                <button
                  type="button"
                  onClick={retryVideo}
                  className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold hover:bg-[#B3FA38] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retry Stream
                </button>
              )}
              {onFallbackAction && (
                <button
                  type="button"
                  onClick={onFallbackAction}
                  className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-lg border border-white/20 text-white text-xs font-semibold hover:bg-white/5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#A5F51F]" /> {fallbackActionLabel}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Loading / Buffering State */}
        {isLoading && !hasError && validSrc && (
          <div
            role="status"
            aria-label="Loading video stream"
            className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-2 pointer-events-none"
          >
            <Loader2 className="w-8 h-8 text-[#A5F51F] animate-spin" />
            <span className="text-xs font-mono text-[#B8BED4]">Loading video...</span>
          </div>
        )}

        {/* Center Play overlay for HTML5 video when paused and ready */}
        {!isPlaying && !isLoading && !hasError && source.kind === 'html5' && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play video"
            className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#A5F51F] text-[#0B0D17] flex items-center justify-center shadow-lg hover:bg-[#B3FA38] transition-colors cursor-pointer"
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
          </button>
        )}

        {resumedFrom !== null && !isPlaying && !hasError && source.kind === 'html5' && (
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-[#0B0D17]/90 border border-white/15 text-xs text-[#B8BED4]">
            Resumed from <span className="font-mono text-[#A5F51F]">{formatTime(resumedFrom)}</span>
          </div>
        )}
      </div>

      {/* Controls Bar (for HTML5 native video streams) */}
      {source.kind !== 'embed' && (
        <div className="bg-[#0B0D17] border-t border-white/10 px-3 sm:px-4 py-2.5 space-y-2">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.5}
              disabled={hasError || !validSrc}
              value={Math.min(currentTime, duration || 100)}
              onChange={handleSeek}
              aria-label="Seek video progress"
              className="w-full h-1.5 accent-[#A5F51F] cursor-pointer bg-[#1A1F35] rounded-lg disabled:opacity-40"
              style={{
                background: `linear-gradient(to right, #A5F51F ${progressPercent}%, #1A1F35 ${progressPercent}%)`,
              }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                type="button"
                disabled={hasError || !validSrc}
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-white hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={hasError || !validSrc}
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute' : 'Mute'}
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-[#B8BED4] hover:text-white hover:bg-white/10 disabled:opacity-40 cursor-pointer"
                >
                  {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  disabled={hasError || !validSrc}
                  value={muted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume"
                  className="hidden sm:block w-20 h-1 accent-[#A5F51F] cursor-pointer disabled:opacity-40"
                />
              </div>

              <span className="text-xs font-mono tabular-nums text-[#B8BED4]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor={`playback-speed-${activeKey}`} className="sr-only">
                Playback Speed
              </label>
              <select
                id={`playback-speed-${activeKey}`}
                value={playbackRate}
                disabled={hasError || !validSrc}
                onChange={(e) => handleSpeedChange(Number(e.target.value))}
                aria-label="Playback speed"
                className="min-h-[36px] rounded-md bg-[#131728] border border-white/15 px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-[#A5F51F] cursor-pointer disabled:opacity-40"
              >
                {SPEEDS.map((s) => (
                  <option key={s} value={s}>
                    {s}x
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-[#B8BED4] hover:text-white hover:bg-white/10 cursor-pointer"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
