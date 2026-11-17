import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { authService } from '../../services/auth.service';
import { enrollmentService } from '../../services/enrollment.service';

export function AdminStudentsPage() {
  const users = authService.getAllUsers();
  const enrollments = enrollmentService.getAllEnrollments();

  return (
    <AdminLayout title="Student Management">
      <div className="space-y-6">
        <p className="text-sm text-[#B8BED4]">
          Directory of demo student profiles and active course enrollments.
        </p>

        <div className="rounded-xl bg-[#1A1F35] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#131728] text-[#7F87A3]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Name</th>
                  <th className="px-5 py-3.5 font-semibold">Email</th>
                  <th className="px-5 py-3.5 font-semibold">Role Title</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Enrollments</th>
                  <th className="px-5 py-3.5 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => {
                  const count = enrollments.filter((e) => e.userId === u.id).length;
                  return (
                    <tr key={u.id} className="hover:bg-white/[0.02]">
                      <td className="px-5 py-3.5 font-semibold text-white">{u.fullName}</td>
                      <td className="px-5 py-3.5 text-[#B8BED4]">{u.email}</td>
                      <td className="px-5 py-3.5 text-[#B8BED4]">{u.title}</td>
                      <td className="px-5 py-3.5 text-right font-mono tabular-nums text-[#A5F51F]">
                        {count}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[#7F87A3]">
                        {new Date(u.joinedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
