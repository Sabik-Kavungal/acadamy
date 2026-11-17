import React from 'react';
import { CheckCircle2, Lock, Play, Video } from 'lucide-react';
import type { Lesson } from '../../types';

interface LessonItemProps {
  lesson: Lesson;
  index: number;
  isSelected?: boolean;
  isCompleted?: boolean;
  enrolled?: boolean;
  onSelect?: (lesson: Lesson) => void;
}

export function LessonItem({
  lesson,
  index,
  isSelected = false,
  isCompleted = false,
  enrolled = false,
  onSelect,
}: LessonItemProps) {
  const canPreview = Boolean(enrolled || lesson.isFreePreview);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(lesson)}
      className={`w-full px-4 sm:px-5 py-3.5 flex items-start justify-between gap-4 text-left transition-colors cursor-pointer ${
        isSelected ? 'bg-[#1A1F35]' : 'hover:bg-white/[0.02]'
      }`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <span className="mt-0.5 shrink-0">
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-[#A5F51F]" />
          ) : isSelected && canPreview ? (
            <Play className="w-4 h-4 text-[#A5F51F] fill-current" />
          ) : canPreview ? (
            <Video className={`w-4 h-4 ${isSelected ? 'text-[#A5F51F]' : 'text-[#B8BED4]'}`} />
          ) : (
            <Lock className="w-4 h-4 text-[#7F87A3]" />
          )}
        </span>
        <div className="min-w-0">
          <p
            className={`text-sm font-semibold leading-snug ${
              isSelected ? 'text-[#A5F51F]' : 'text-white'
            }`}
          >
            {String(index + 1).padStart(2, '0')}. {lesson.title}
          </p>
          {lesson.description && (
            <p className="text-xs text-[#7F87A3] mt-0.5 line-clamp-1">
              {lesson.description}
            </p>
          )}
        </div>
      </div>

      <div className="text-right shrink-0 space-y-0.5">
        <span className="font-mono text-xs text-[#B8BED4] tabular-nums block">
          {lesson.durationLabel}
        </span>
        <span
          className={`text-[11px] font-semibold block ${
            isCompleted || lesson.isFreePreview ? 'text-[#A5F51F]' : 'text-[#7F87A3]'
          }`}
        >
          {isCompleted
            ? 'Completed'
            : lesson.isFreePreview && !enrolled
            ? 'Preview'
            : enrolled
            ? 'Unlocked'
            : 'Locked'}
        </span>
      </div>
    </button>
  );
}
