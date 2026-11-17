import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import { enrollmentService } from '../../services/enrollment.service';

export function AdminAnalyticsPage() {
  const { courses } = useApp();
  const orders = enrollmentService.getAllOrders();
  const paidOrders = orders.filter((o) => o.status === 'paid');

  const courseBreakdown = courses.map((c) => {
    const courseOrders = paidOrders.filter((o) => o.courseId === c.id);
    return {
      name: c.title.split(' ').slice(0, 2).join(' '),
      lessons: c.modules.reduce((acc, m) => acc + m.lessons.length, 0),
      orders: courseOrders.length,
    };
  });

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        <p className="text-sm text-[#B8BED4]">
          Local demo platform metrics calculated directly from active catalog and simulated order
          state.
        </p>

        <section className="rounded-xl bg-[#1A1F35] border border-white/10 p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-white">
            Catalog Structure &amp; Demo Order Distribution
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseBreakdown} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#7F87A3" fontSize={12} />
                <YAxis stroke="#7F87A3" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B0D17',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="lessons" name="Published Lessons" fill="#A5F51F" radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" name="Demo Orders" fill="#5B9BD5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
