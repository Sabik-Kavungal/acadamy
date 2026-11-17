import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { useApp } from '../context/AppContext';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  rememberMe: z.boolean().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { loginDemo, quickDemoLogin } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: true },
  });

  const onSubmit = async (values: LoginValues) => {
    const user = await loginDemo(values.email, values.password);
    if (from) {
      navigate(from);
    } else {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-[#131728] border border-white/10 p-6 sm:p-8 space-y-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A5F51F]">
              Demo Authentication
            </p>
            <h1 className="font-display text-2xl font-extrabold text-white mt-1">
              Sign In to AxiomDev
            </h1>
            <p className="text-sm text-[#B8BED4] mt-1">
              Access your enrolled course modules, video progress, and assignments.
            </p>
          </div>

          <div className="rounded-lg bg-[#0B0D17] border border-white/10 p-3.5 flex items-start gap-2.5 text-xs text-[#B8BED4]">
            <Info className="w-4 h-4 text-[#A5F51F] shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Frontend Demo Mode:</strong> Local browser session for
              prototype evaluation only, isolated for future production auth integration.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={async () => {
                await quickDemoLogin('student');
                navigate(from ?? '/dashboard');
              }}
              className="py-2.5 px-3 rounded-lg bg-[#1A1F35] border border-white/15 text-xs font-semibold text-white hover:border-[#A5F51F] transition-colors cursor-pointer"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={async () => {
                await quickDemoLogin('admin');
                navigate('/admin');
              }}
              className="py-2.5 px-3 rounded-lg bg-[#1A1F35] border border-white/15 text-xs font-semibold text-white hover:border-[#A5F51F] transition-colors cursor-pointer"
            >
              Demo Admin
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                {...register('email')}
                placeholder="ananya.dev@example.com"
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-3 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="text-xs font-semibold text-[#B8BED4]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-[#A5F51F] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  placeholder="Enter demo password (6+ chars)"
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 pl-4 pr-11 py-3 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7F87A3] hover:text-white p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <label className="inline-flex items-center gap-2 text-xs text-[#B8BED4] cursor-pointer">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="rounded border-white/20 bg-[#0B0D17] accent-[#A5F51F]"
              />
              <span>Remember me on this browser</span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] disabled:opacity-60 transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In (Demo)'}
            </button>
          </form>

          <p className="text-center text-xs text-[#B8BED4]">
            New to AxiomDev Academy?{' '}
            <Link to="/register" className="font-semibold text-[#A5F51F] hover:underline">
              Create a demo account
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
