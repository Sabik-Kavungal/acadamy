import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100%-2rem)]"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-start gap-3 rounded-xl bg-[#1A1F35] border border-white/15 px-4 py-3 shadow-xl"
        >
          {t.variant === 'success' && <CheckCircle2 className="w-5 h-5 text-[#A5F51F] shrink-0 mt-0.5" />}
          {t.variant === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
          {(!t.variant || t.variant === 'info') && (
            <Info className="w-5 h-5 text-[#B8BED4] shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{t.title}</p>
            {t.description && <p className="text-xs text-[#B8BED4] mt-0.5">{t.description}</p>}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss notification"
            className="text-[#7F87A3] hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
