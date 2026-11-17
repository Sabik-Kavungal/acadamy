import React from 'react';
import { AlertTriangle, BookOpen, Loader2 } from 'lucide-react';

interface StateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className = '' }: StateProps) {
  return (
    <div
      className={`rounded-xl bg-[#131728] border border-white/10 p-8 sm:p-10 text-center space-y-3 ${className}`}
    >
      <div className="mx-auto w-10 h-10 rounded-full bg-[#1A1F35] border border-white/10 flex items-center justify-center text-[#A5F51F]">
        <BookOpen className="w-5 h-5" />
      </div>
      <h3 className="font-display text-lg font-bold text-white">{title}</h3>
      {description && (
        <p className="text-xs sm:text-sm text-[#B8BED4] max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}

export function LoadingState({
  title = 'Loading content...',
  description,
  className = '',
}: Partial<StateProps>) {
  return (
    <div
      className={`rounded-xl bg-[#131728] border border-white/10 p-8 text-center space-y-2.5 ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="w-6 h-6 text-[#A5F51F] animate-spin mx-auto" />
      <p className="font-display text-sm font-bold text-white">{title}</p>
      {description && <p className="text-xs text-[#B8BED4]">{description}</p>}
    </div>
  );
}

export function ErrorState({ title, description, action, className = '' }: StateProps) {
  return (
    <div
      role="alert"
      className={`rounded-xl bg-[#131728] border border-rose-500/30 p-8 text-center space-y-3 ${className}`}
    >
      <div className="mx-auto w-10 h-10 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <h3 className="font-display text-lg font-bold text-white">{title}</h3>
      {description && (
        <p className="text-xs sm:text-sm text-[#B8BED4] max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}
