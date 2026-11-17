import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { authService } from '../services/auth.service';

const resetSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
});

export function ForgotPasswordPage() {
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({ resolver: zodResolver(resetSchema) });

  const onSubmit = async (values: { email: string }) => {
    const res = await authService.requestPasswordResetDemo(values.email);
    setResultMsg(res.message);
  };

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-[#131728] border border-white/10 p-6 sm:p-8 space-y-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A5F51F]">
              Password Recovery (Demo)
            </p>
            <h1 className="font-display text-2xl font-extrabold text-white mt-1">
              Forgot Password
            </h1>
            <p className="text-sm text-[#B8BED4] mt-1">
              Enter your email address to simulate a password recovery email.
            </p>
          </div>

          {resultMsg ? (
            <div className="space-y-4 py-2">
              <div className="rounded-xl bg-[#1A1F35] border border-[#A5F51F]/35 p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A5F51F] shrink-0 mt-0.5" />
                <p className="text-sm text-[#B8BED4]">{resultMsg}</p>
              </div>
              <Link
                to="/reset-password"
                className="block w-full text-center py-3 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm"
              >
                Open Reset Password UI →
              </Link>
              <Link
                to="/login"
                className="block w-full text-center py-2.5 rounded-lg border border-white/15 text-xs font-semibold text-white hover:bg-white/5"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <label htmlFor="reset-email" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                  Email Address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  placeholder="you@example.com"
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-3 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Sending...' : 'Send Recovery Link (Demo)'}
              </button>
            </form>
          )}

          <div className="flex items-center justify-between text-xs text-[#B8BED4]">
            <Link to="/login" className="inline-flex items-center gap-1.5 hover:text-white">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
            <Link to="/reset-password" className="text-[#A5F51F] hover:underline">
              Reset Password UI
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
