import React, { useState } from 'react';
import {
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  UserCircle,
  X,
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';
import { useApp } from '../../context/AppContext';

const STUDENT_NAV = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'My Learning', to: '/dashboard/courses', icon: BookOpen },
  { label: 'Learning Progress', to: '/dashboard/progress', icon: BarChart3 },
  { label: 'Assignments', to: '/dashboard/assignments', icon: ClipboardCheck },
  { label: 'Certificates', to: '/dashboard/certificates', icon: Award },
  { label: 'Profile', to: '/dashboard/profile', icon: UserCircle },
];

export function DashboardLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { user, settings, logout, quickDemoLogin } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const displayBrand = settings.brandName.replace(/\.$/, '');

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0D17] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-2xl bg-[#131728] border border-white/10 p-8 text-center space-y-5">
          <h1 className="font-display text-2xl font-bold text-white">Student Sign-In Required</h1>
          <p className="text-sm text-[#B8BED4]">
            Sign in with your demo student account to view enrolled courses, track lesson progress,
            and manage your profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={async () => {
                await quickDemoLogin('student');
              }}
              className="flex-1 py-3 px-4 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] cursor-pointer"
            >
              Use Demo Student
            </button>
            <Link
              to="/login"
              className="flex-1 py-3 px-4 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5"
            >
              Go to Login
            </Link>
          </div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#7F87A3] hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-5 h-16 flex items-center justify-between border-b border-white/10">
        <Link to="/" className="inline-flex items-center gap-2 text-white">
          <span className="font-display text-lg font-extrabold tracking-tight">
            {displayBrand}
            <span className="text-[#A5F51F] font-semibold ml-1">{SITE_CONFIG.brandSuffix}</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-[#B8BED4] hover:text-white"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 py-4 border-b border-white/10">
        <p className="font-mono text-[11px] text-[#A5F51F]">STUDENT WORKSPACE</p>
        <p className="text-sm font-semibold text-white truncate mt-1">{user.fullName}</p>
        <p className="text-xs text-[#B8BED4] truncate">{user.title}</p>
      </div>

      <nav aria-label="Student dashboard navigation" className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {STUDENT_NAV.map((item) => {
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
                    ? 'bg-[#A5F51F] text-[#0B0D17] font-bold'
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
          to="/courses"
          className="block w-full text-center py-2 px-3 rounded-lg border border-white/15 text-xs font-medium text-[#B8BED4] hover:text-white hover:bg-white/5"
        >
          Browse Courses
        </Link>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
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
            aria-label="Close navigation overlay"
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
              aria-label="Open student menu"
              className="lg:hidden p-2 -ml-2 rounded-lg text-[#B8BED4] hover:text-white hover:bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <p className="text-xs text-[#7F87A3]">Dashboard / {title}</p>
              <h1 className="font-display text-lg font-bold text-white truncate">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="px-3 py-1.5 rounded-lg border border-white/15 text-xs font-medium text-[#B8BED4] hover:text-white"
              >
                Admin Console
              </Link>
            )}
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg border border-white/15 text-xs font-medium text-[#B8BED4] hover:text-white whitespace-nowrap"
            >
              Public Site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
