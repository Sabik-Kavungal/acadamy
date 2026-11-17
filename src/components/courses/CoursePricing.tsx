import React from 'react';
import { formatINR, getCoursePricingMeta } from '../../utils/pricing';

interface CoursePricingProps {
  originalPrice: number;
  launchPrice: number;
  offerLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  showSavings?: boolean;
  className?: string;
}

export function CoursePricing({
  originalPrice,
  launchPrice,
  offerLabel,
  size = 'md',
  showSavings = false,
  className = '',
}: CoursePricingProps) {
  const { hasDiscount, savings, discountPercent } = getCoursePricingMeta(
    originalPrice,
    launchPrice
  );

  const priceClass =
    size === 'lg'
      ? 'text-3xl'
      : size === 'sm'
      ? 'text-lg'
      : 'text-xl sm:text-2xl';

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={`font-display font-extrabold text-white tabular-nums ${priceClass}`}>
          {formatINR(launchPrice)}
        </span>
        {hasDiscount && (
          <span className="text-xs sm:text-sm text-[#7F87A3] line-through tabular-nums">
            {formatINR(originalPrice)}
          </span>
        )}
        {hasDiscount && (
          <span className="rounded bg-[#A5F51F]/15 border border-[#A5F51F]/35 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#A5F51F] whitespace-nowrap">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {(offerLabel || (showSavings && hasDiscount)) && (
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          {offerLabel && (
            <span className="font-bold uppercase tracking-wider text-[#A5F51F]">
              {offerLabel}
            </span>
          )}
          {showSavings && hasDiscount && (
            <span className="text-[#B8BED4] tabular-nums">
              Save {formatINR(savings)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
