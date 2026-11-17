import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import { adminService } from '../../services/admin.service';
import type { Coupon } from '../../types';

export function AdminCouponsPage() {
  const { notify } = useApp();
  const [coupons, setCoupons] = useState<Coupon[]>(() => adminService.getCoupons());
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [maxUses, setMaxUses] = useState(100);
  const [expiresAt, setExpiresAt] = useState('2026-12-31');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    const next = adminService.createCoupon({
      code,
      discountPercent: Number(discountPercent),
      maxUses: Number(maxUses),
      expiresAt,
    });
    setCoupons(next);
    setCode('');
    notify('Coupon created', 'Available immediately in demo checkout.', 'success');
  };

  const handleToggle = (id: string) => {
    setCoupons(adminService.toggleCoupon(id));
  };

  const handleDelete = (id: string) => {
    setCoupons(adminService.deleteCoupon(id));
    notify('Coupon removed', undefined, 'info');
  };

  return (
    <AdminLayout title="Coupon Management">
      <div className="space-y-6">
        <form
          onSubmit={handleCreate}
          className="rounded-xl bg-[#1A1F35] border border-white/10 p-6 space-y-4"
        >
          <h2 className="font-display text-base font-bold text-white">Create Promotional Coupon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code (e.g. WINTER15)"
              className="rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm font-mono text-white uppercase"
            />
            <input
              type="number"
              min={1}
              max={90}
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              placeholder="Discount %"
              className="rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            />
            <input
              type="number"
              min={1}
              value={maxUses}
              onChange={(e) => setMaxUses(Number(e.target.value))}
              placeholder="Max Uses"
              className="rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            />
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Coupon
          </button>
        </form>

        <div className="rounded-xl bg-[#1A1F35] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#131728] text-[#7F87A3]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Code</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Discount</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Redemptions</th>
                  <th className="px-5 py-3.5 font-semibold">Expires</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 font-mono font-bold text-white">{c.code}</td>
                    <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#A5F51F]">
                      {c.discountPercent}%
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#B8BED4]">
                      {c.usedCount} / {c.maxUses}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[#7F87A3]">{c.expiresAt}</td>
                    <td className="px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggle(c.id)}
                        className={`font-semibold cursor-pointer hover:underline ${
                          c.active ? 'text-[#A5F51F]' : 'text-[#7F87A3]'
                        }`}
                      >
                        {c.active ? 'Active' : 'Paused'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(c.id)}
                        aria-label={`Delete ${c.code}`}
                        className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
