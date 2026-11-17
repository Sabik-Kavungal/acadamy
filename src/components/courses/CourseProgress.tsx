import React from 'react';

interface CourseProgressProps {
  completed: number;
  total: number;
  percent: number;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export function CourseProgress({
  completed,
  total,
  percent,
  size = 'md',
  showLabel = true,
  className = '',
}: CourseProgressProps) {
  const safePercent = Math.max(0, Math.min(100, percent));

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between gap-2 text-xs tabular-nums">
          <span className="text-[#B8BED4]">
            {completed} of {total} lessons completed
          </span>
          <span className="font-mono font-bold text-[#A5F51F]">{safePercent}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={safePercent}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`w-full rounded-full bg-[#0B0D17] overflow-hidden ${
          size === 'sm' ? 'h-1.5' : 'h-2'
        }`}
      >
        <div
          className="h-full bg-[#A5F51F] transition-all duration-300"
          style={{ width: `${safePercent}%` }}
        />
      </div>
    </div>
  );
}
