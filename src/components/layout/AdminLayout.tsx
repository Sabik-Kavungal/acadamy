import React, { useState } from 'react';
import {
  BarChart2,
  BookOpen,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Tag,
  Users,
  Video,
  X,
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ADMIN_NAV = [
  { label: 'Overview', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Courses', to: '/admin/courses', icon: BookOpen },
  { label: 'Modules', to: '/admin/modules', icon: FolderKanban },
  { label: 'Lessons & Videos', to: '/admin/lessons', icon: Video },
  { label: 'Students', to: '/admin/students', icon: Users },
  { label: 'Orders & Payments', to: '/admin/orders', icon: CreditCard },
  { label: 'Coupons', to: '/admin/coupons', icon: Tag },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart2 },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export function AdminLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { user, settings, logout, quickDemoLogin } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0B0D17] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-xl bg-[#131728] border border-white/10 p-8 text-center space-y-5">
          <h1 className="font-display text-2xl font-bold text-white">Admin Demo Access</h1>
          <p className="text-sm text-[#B8BED4]">
            Switch to the Demo Admin profile to manage courses, modules, lessons, video URLs,
            coupons, and platform settings.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={async () => {
                await quickDemoLogin('admin');
              }}
              className="flex-1 py-3 px-4 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] cursor-pointer"
            >
              Enter Demo Admin
            </button>
            <Link
              to="/"
              className="flex-1 py-3 px-4 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-5 h-16 flex items-center justify-between border-b border-white/10">
        <Link to="/" className="inline-flex items-center gap-2.5 text-white">
          <svg viewBox="0 0 28 28" className="w-6 h-6 shrink-0" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="10.5" stroke="#FFFFFF" strokeWidth="3.2" />
            <circle cx="14" cy="14" r="3" fill="#A5F51F" />
          </svg>
          <span className="font-display text-lg font-extrabold">{settings.brandName}</span>
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-[#B8BED4] hover:text-white"
          aria-label="Close admin sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 py-4 border-b border-white/10">
        <p className="text-xs font-medium text-[#A5F51F]">Admin Console (Demo)</p>
        <p className="text-sm font-semibold text-white truncate mt-0.5">{user.fullName}</p>
      </div>

      <nav aria-label="Admin navigation" className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#A5F51F] text-[#0B0D17] font-semibold'
                    : 'text-[#B8BED4] hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          to="/dashboard"
          className="block w-full text-center py-2 px-3 rounded-lg border border-white/15 text-xs font-medium text-[#B8BED4] hover:text-white hover:bg-white/5"
        >
          Student View
        </Link>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-rose-300 hover:bg-rose-500/10 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0D17] flex">
      <aside className="hidden lg:block w-64 shrink-0 bg-[#131728] border-r border-white/10">
        {SidebarContent}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="w-72 bg-[#131728] border-r border-white/10 h-full">{SidebarContent}</div>
          <button
            type="button"
            aria-label="Close overlay"
            className="flex-1 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-[#0B0D17] border-b border-white/10 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin menu"
              className="lg:hidden p-2 -ml-2 rounded-lg text-[#B8BED4] hover:text-white hover:bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <p className="text-xs text-[#7F87A3]">Admin / {title}</p>
              <h1 className="font-display text-lg font-bold text-white truncate">{title}</h1>
            </div>
          </div>

          <Link
            to="/"
            className="px-3 py-1.5 rounded-lg border border-white/15 text-xs font-medium text-[#B8BED4] hover:text-white whitespace-nowrap"
          >
            View Live Site
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
