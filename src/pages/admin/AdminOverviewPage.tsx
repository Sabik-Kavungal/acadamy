import React from 'react';
import { BookOpen, CreditCard, Tag, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import { adminService } from '../../services/admin.service';
import { authService } from '../../services/auth.service';
import { enrollmentService } from '../../services/enrollment.service';

export function AdminOverviewPage() {
  const { courses } = useApp();
  const users = authService.getAllUsers().filter((u) => u.role === 'student');
  const orders = enrollmentService.getAllOrders();
  const paidOrders = orders.filter((o) => o.status === 'paid');
  const totalRevenue = paidOrders.reduce((acc, o) => acc + o.finalAmount, 0);
  const coupons = adminService.getCoupons();

  return (
    <AdminLayout title="Overview">
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#7F87A3]">
              <span>Catalog Courses</span>
              <BookOpen className="w-4 h-4 text-[#A5F51F]" />
            </div>
            <p className="font-display text-3xl font-extrabold text-white tabular-nums">
              {courses.length}
            </p>
            <p className="text-xs text-[#B8BED4]">
              {courses.filter((c) => c.status === 'available').length} active ·{' '}
              {courses.filter((c) => c.status === 'coming_soon').length} coming soon
            </p>
          </div>

          <div className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#7F87A3]">
              <span>Demo Students</span>
              <Users className="w-4 h-4 text-[#A5F51F]" />
            </div>
            <p className="font-display text-3xl font-extrabold text-white tabular-nums">
              {users.length}
            </p>
            <p className="text-xs text-[#B8BED4]">Registered in demo directory</p>
          </div>

          <div className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#7F87A3]">
              <span>Demo Orders (Paid)</span>
              <CreditCard className="w-4 h-4 text-[#A5F51F]" />
            </div>
            <p className="font-display text-3xl font-extrabold text-[#A5F51F] tabular-nums">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-[#B8BED4] tabular-nums">{paidOrders.length} paid orders</p>
          </div>

          <div className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#7F87A3]">
              <span>Active Coupons</span>
              <Tag className="w-4 h-4 text-[#A5F51F]" />
            </div>
            <p className="font-display text-3xl font-extrabold text-white tabular-nums">
              {coupons.filter((c) => c.active).length}
            </p>
            <p className="text-xs text-[#B8BED4]">Launch promo codes</p>
          </div>
        </div>

        {/* Quick Management Links */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/courses"
            className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 hover:border-[#A5F51F]/50 transition-colors"
          >
            <h2 className="font-display text-base font-bold text-white">Manage Courses</h2>
            <p className="text-xs text-[#B8BED4] mt-1">
              Add new courses, update pricing, or toggle Available / Coming Soon status.
            </p>
          </Link>
          <Link
            to="/admin/lessons"
            className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 hover:border-[#A5F51F]/50 transition-colors"
          >
            <h2 className="font-display text-base font-bold text-white">Lessons &amp; Video URLs</h2>
            <p className="text-xs text-[#B8BED4] mt-1">
              Add lessons, edit descriptions, and configure HTML5 video stream URLs.
            </p>
          </Link>
          <Link
            to="/admin/orders"
            className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 hover:border-[#A5F51F]/50 transition-colors"
          >
            <h2 className="font-display text-base font-bold text-white">Review Demo Orders</h2>
            <p className="text-xs text-[#B8BED4] mt-1">
              Inspect Razorpay-ready simulated checkout transactions and applied coupons.
            </p>
          </Link>
        </section>

        {/* Recent Orders Table */}
        <section className="rounded-xl bg-[#1A1F35] border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-white">Recent Orders (Demo)</h3>
            <Link to="/admin/orders" className="text-xs font-semibold text-[#A5F51F] hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#131728] text-[#7F87A3]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Order ID</th>
                  <th className="px-5 py-3 font-semibold">Student</th>
                  <th className="px-5 py-3 font-semibold">Course</th>
                  <th className="px-5 py-3 font-semibold text-right">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-mono text-white">{ord.id}</td>
                    <td className="px-5 py-3 text-[#B8BED4]">{ord.studentName}</td>
                    <td className="px-5 py-3 text-[#B8BED4]">{ord.courseTitle}</td>
                    <td className="px-5 py-3 text-right font-mono tabular-nums text-white">
                      ₹{ord.finalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`font-semibold uppercase ${
                          ord.status === 'paid' ? 'text-[#A5F51F]' : 'text-rose-400'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
