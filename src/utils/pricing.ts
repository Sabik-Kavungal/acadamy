export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getCoursePricingMeta(originalPrice: number, launchPrice: number) {
  const hasDiscount = originalPrice > launchPrice;
  const savings = hasDiscount ? originalPrice - launchPrice : 0;
  const discountPercent = hasDiscount ? Math.round((savings / originalPrice) * 100) : 0;
  return {
    hasDiscount,
    savings,
    discountPercent,
  };
}
