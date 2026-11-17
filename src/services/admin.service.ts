import { INITIAL_COUPONS, INITIAL_SETTINGS } from '../data/admin-seed';
import type { Coupon, PlatformSettings } from '../types';
import { storage } from './storage';

const COUPONS_KEY = 'demo_coupons';
const SETTINGS_KEY = 'demo_platform_settings';

export const adminService = {
  getCoupons(): Coupon[] {
    const saved = storage.get<Coupon[] | null>(COUPONS_KEY, null);
    if (!saved) {
      storage.set(COUPONS_KEY, INITIAL_COUPONS);
      return INITIAL_COUPONS;
    }
    return saved;
  },

  createCoupon(input: { code: string; discountPercent: number; maxUses: number; expiresAt: string }): Coupon[] {
    const list = this.getCoupons();
    const newCoupon: Coupon = {
      id: `cpn-${Date.now()}`,
      code: input.code.trim().toUpperCase(),
      discountPercent: input.discountPercent,
      maxUses: input.maxUses,
      usedCount: 0,
      active: true,
      expiresAt: input.expiresAt,
    };
    const next = [newCoupon, ...list];
    storage.set(COUPONS_KEY, next);
    return next;
  },

  toggleCoupon(id: string): Coupon[] {
    const next = this.getCoupons().map((c) => (c.id === id ? { ...c, active: !c.active } : c));
    storage.set(COUPONS_KEY, next);
    return next;
  },

  deleteCoupon(id: string): Coupon[] {
    const next = this.getCoupons().filter((c) => c.id !== id);
    storage.set(COUPONS_KEY, next);
    return next;
  },

  getSettings(): PlatformSettings {
    const saved = storage.get<PlatformSettings | null>(SETTINGS_KEY, null);
    if (!saved) {
      storage.set(SETTINGS_KEY, INITIAL_SETTINGS);
      return INITIAL_SETTINGS;
    }
    return saved;
  },

  updateSettings(patch: Partial<PlatformSettings>): PlatformSettings {
    const next = { ...this.getSettings(), ...patch };
    storage.set(SETTINGS_KEY, next);
    return next;
  },
};
