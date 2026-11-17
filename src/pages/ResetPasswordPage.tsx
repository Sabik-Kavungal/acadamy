import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Info } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string().min(6, 'Please confirm your new password.'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const [showPass, setShowPass] = useState(false);
  const [completed, setCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 300));
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-[#131728] border border-white/10 p-6 sm:p-8 space-y-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A5F51F]">
              Reset Password UI (Demo)
            </p>
            <h1 className="font-display text-2xl font-extrabold text-white mt-1">
              Set a New Password
            </h1>
            <p className="text-sm text-[#B8BED4] mt-1">
              Choose a strong password for your account.
            </p>
          </div>

          <div className="rounded-lg bg-[#0B0D17] border border-white/10 p-3 flex items-start gap-2.5 text-xs text-[#B8BED4]">
            <Info className="w-4 h-4 text-[#A5F51F] shrink-0 mt-0.5" />
            <p>
              Frontend UI prototype only — no password is transmitted or stored in browser
              storage.
            </p>
          </div>

          {completed ? (
            <div className="space-y-4 py-2">
              <div className="rounded-xl bg-[#1A1F35] border border-[#A5F51F]/40 p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A5F51F] shrink-0 mt-0.5" />
                <p className="text-sm text-[#B8BED4]">
                  Password reset simulated successfully. You can now return to Sign In.
                </p>
              </div>
              <Link
                to="/login"
                className="block w-full text-center py-3 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm"
              >
                Continue to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <label htmlFor="new-pass" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-pass"
                    type={showPass ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...register('password')}
                    placeholder="Minimum 6 characters"
                    className="w-full rounded-lg bg-[#0B0D17] border border-white/15 pl-4 pr-11 py-3 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7F87A3] hover:text-white p-1 cursor-pointer"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-400 mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirm-new-pass" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                  Confirm New Password
                </label>
                <input
                  id="confirm-new-pass"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                  placeholder="Re-enter password"
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-3 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-rose-400 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Updating...' : 'Update Password (Demo)'}
              </button>
            </form>
          )}

          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#B8BED4] hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
