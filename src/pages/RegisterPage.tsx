import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { useApp } from '../context/AppContext';

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required.'),
    email: z.string().email('Enter a valid email address.'),
    phone: z.string().min(8, 'Enter a valid phone number.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string().min(6, 'Confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const { registerDemo } = useApp();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterValues) => {
    await registerDemo({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-[#131728] border border-white/10 p-6 sm:p-8 space-y-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A5F51F]">
              Student Registration (Demo)
            </p>
            <h1 className="font-display text-2xl font-extrabold text-white mt-1">
              Create Your Account
            </h1>
            <p className="text-sm text-[#B8BED4] mt-1">
              Track lessons, progress, and assignments in local demo mode.
            </p>
          </div>

          <div className="rounded-lg bg-[#0B0D17] border border-white/10 p-3 flex items-start gap-2.5 text-xs text-[#B8BED4]">
            <Info className="w-4 h-4 text-[#A5F51F] shrink-0 mt-0.5" />
            <p>
              Demo registration creates a local browser profile. Passwords are validated in-form
              and never stored.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label htmlFor="reg-name" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Full Name
              </label>
              <input
                id="reg-name"
                type="text"
                autoComplete="name"
                {...register('fullName')}
                placeholder="Vikram Menon"
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                {...register('email')}
                placeholder="vikram@example.com"
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="reg-phone" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Phone Number
              </label>
              <input
                id="reg-phone"
                type="tel"
                autoComplete="tel"
                {...register('phone')}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
              />
              {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="reg-pass" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="reg-pass"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('password')}
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 pl-4 pr-11 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7F87A3] hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="reg-confirm" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Confirm Password
              </label>
              <input
                id="reg-confirm"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                {...register('confirmPassword')}
                placeholder="Re-enter password"
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-rose-400 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] disabled:opacity-60 transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account (Demo)'}
            </button>
          </form>

          <p className="text-center text-xs text-[#B8BED4]">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-[#A5F51F] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
