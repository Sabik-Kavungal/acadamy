import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { enrollmentService } from '../../services/enrollment.service';

export function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'failed' | 'cancelled'>('all');
  const orders = enrollmentService.getAllOrders();

  const filtered = orders.filter((o) =>
    statusFilter === 'all' ? true : o.status === statusFilter
  );

  return (
    <AdminLayout title="Orders & Payments">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[#B8BED4]">
            Simulated checkout ledger prepared for future server-side Razorpay webhook verification.
          </p>
          <div className="flex flex-wrap gap-2">
            {(['all', 'paid', 'pending', 'failed', 'cancelled'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#A5F51F] text-[#0B0D17]'
                    : 'bg-[#131728] text-[#B8BED4] border border-white/10'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-[#1A1F35] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#131728] text-[#7F87A3]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Order ID</th>
                  <th className="px-5 py-3.5 font-semibold">Student</th>
                  <th className="px-5 py-3.5 font-semibold">Course</th>
                  <th className="px-5 py-3.5 font-semibold">Coupon</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Amount</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 font-mono text-white">{ord.id}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-white font-medium">{ord.studentName}</p>
                      <p className="text-[11px] text-[#7F87A3]">{ord.studentEmail}</p>
                    </td>
                    <td className="px-5 py-3.5 text-[#B8BED4]">{ord.courseTitle}</td>
                    <td className="px-5 py-3.5 font-mono text-[#B8BED4]">
                      {ord.couponCode ?? '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono tabular-nums text-white">
                      ₹{ord.finalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`font-semibold uppercase ${
                          ord.status === 'paid'
                            ? 'text-[#A5F51F]'
                            : ord.status === 'pending'
                            ? 'text-amber-400'
                            : ord.status === 'cancelled'
                            ? 'text-[#7F87A3]'
                            : 'text-rose-400'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[#7F87A3]">
                      {new Date(ord.createdAt).toLocaleDateString()}
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
