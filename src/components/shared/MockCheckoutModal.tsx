import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  CheckCircle2,
  Clock,
  Loader2,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { enrollmentService } from '../../services/enrollment.service';
import type { Course, Order } from '../../types';
import { getCourseDurationSummary } from '../../utils/courseFormatters';
import { formatINR, getCoursePricingMeta } from '../../utils/pricing';

interface MockCheckoutModalProps {
  course: Course;
  open: boolean;
  onClose: () => void;
}

type CheckoutStatus = 'idle' | 'processing' | 'pending' | 'paid' | 'failed' | 'cancelled';

export function MockCheckoutModal({ course, open, onClose }: MockCheckoutModalProps) {
  const { user, isEnrolled, refreshEnrollments, notify } = useApp();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<Order | null>(null);
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  const [autoRedirectEnabled, setAutoRedirectEnabled] = useState(true);
  const [redirectSeconds, setRedirectSeconds] = useState(2);
  const submittingRef = useRef(false);

  const firstLessonId = course.modules[0]?.lessons[0]?.id;
  const alreadyEnrolled = isEnrolled(course.id);
  const { moduleCount, lessonCount, formattedTotal } = getCourseDurationSummary(course);

  useEffect(() => {
    if (open) {
      const existingLatest = user
        ? enrollmentService.getLatestOrderForCourse(user.id, course.id)
        : undefined;
      setCouponInput('');
      setAppliedCoupon(null);
      setCouponMessage(null);
      setCouponError(null);
      setOrderResult(existingLatest && existingLatest.status === 'pending' ? existingLatest : null);
      setStatus(existingLatest?.status === 'pending' && !alreadyEnrolled ? 'pending' : 'idle');
      setAutoRedirectEnabled(true);
      setRedirectSeconds(2);
      submittingRef.current = false;
    }
  }, [open, course.id, user?.id, alreadyEnrolled]);

  useEffect(() => {
    if (!open || status !== 'paid' || !autoRedirectEnabled || !firstLessonId) return;
    if (redirectSeconds <= 0) {
      onClose();
      navigate(`/learn/${course.id}/${firstLessonId}`);
      return;
    }
    const timer = window.setTimeout(() => {
      setRedirectSeconds((s) => s - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [open, status, autoRedirectEnabled, redirectSeconds, firstLessonId, course.id, navigate, onClose]);

  if (!open) return null;

  const baseLaunchPrice = course.launchPrice;
  const { hasDiscount, savings, discountPercent } = getCoursePricingMeta(
    course.originalPrice,
    course.launchPrice
  );
  const extraCouponSavings = appliedCoupon
    ? Math.round((baseLaunchPrice * appliedCoupon.percent) / 100)
    : 0;
  const finalAmount = Math.max(0, baseLaunchPrice - extraCouponSavings);

  const handleApplyCoupon = () => {
    setCouponMessage(null);
    setCouponError(null);
    const res = enrollmentService.validateCoupon(couponInput);
    if (!res.valid || !res.coupon) {
      setAppliedCoupon(null);
      setCouponError(res.message);
      return;
    }
    setAppliedCoupon({ code: res.coupon.code, percent: res.coupon.discountPercent });
    setCouponMessage(res.message);
  };

  const handleSimulatePayment = async (outcome: 'paid' | 'failed' | 'pending' | 'cancel') => {
    if (!user) {
      onClose();
      navigate('/login', { state: { from: `/courses/${course.slug}` } });
      return;
    }

    if (alreadyEnrolled) {
      notify('Already Enrolled', `You already have full access to ${course.title}.`, 'info');
      return;
    }

    if (submittingRef.current) return;

    if (outcome === 'cancel') {
      enrollmentService.cancelPendingOrder(user.id, course.id);
      refreshEnrollments();
      setStatus('cancelled');
      notify('Payment Cancelled', 'Checkout cancelled. No enrollment was created.', 'info');
      return;
    }

    submittingRef.current = true;
    setStatus('processing');
    await new Promise((r) => setTimeout(r, 450));

    const { order } = enrollmentService.processMockCheckout({
      user,
      course,
      couponCode: appliedCoupon?.code,
      outcome,
    });

    submittingRef.current = false;
    setOrderResult(order);
    refreshEnrollments();

    if (outcome === 'paid') {
      setStatus('paid');
      setRedirectSeconds(2);
      setAutoRedirectEnabled(true);
      notify('Enrollment Confirmed', `Access unlocked for ${course.title}.`, 'success');
    } else if (outcome === 'pending') {
      setStatus('pending');
      notify('Payment Pending', 'Awaiting payment verification before granting access.', 'info');
    } else {
      setStatus('failed');
      notify('Payment Failed', 'Transaction failed. No course access was granted.', 'error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="w-full max-w-lg rounded-xl bg-[#131728] border border-white/15 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10">
          <div>
            <h2 id="checkout-modal-title" className="font-display text-lg font-bold text-white">
              Course Enrollment Checkout
            </h2>
            <p className="text-xs text-[#7F87A3]">Demo Checkout · No Real Payment Processed</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout dialog"
            className="p-2 rounded-lg text-[#B8BED4] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {alreadyEnrolled && status !== 'paid' ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#A5F51F]/15 text-[#A5F51F] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-white">Already Enrolled</h3>
                <p className="text-sm text-[#B8BED4]">
                  You already have full access to <strong className="text-white">{course.title}</strong>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {firstLessonId && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(`/learn/${course.id}/${firstLessonId}`);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 px-4 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#B3FA38] cursor-pointer"
                  >
                    Continue Learning <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : status === 'idle' || status === 'processing' ? (
            <>
              <div className="rounded-xl bg-[#1A1F35] border border-white/10 p-4 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A5F51F]">
                    {course.offerLabel}
                  </span>
                  {hasDiscount && (
                    <span className="rounded bg-[#A5F51F]/15 border border-[#A5F51F]/35 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#A5F51F]">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <h3 className="font-display text-base font-bold text-white">{course.title}</h3>
                <p className="text-xs text-[#B8BED4]">
                  {formattedTotal} · {course.difficulty} · {moduleCount} modules · {lessonCount} lessons
                </p>
              </div>

              {user && (
                <div className="rounded-xl bg-[#0B0D17] border border-white/10 px-4 py-3 flex items-center gap-3 text-xs">
                  <UserCheck className="w-4 h-4 text-[#A5F51F] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white font-semibold truncate">{user.fullName}</p>
                    <p className="text-[#7F87A3] truncate">{user.email}</p>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="coupon-input" className="block text-xs font-medium text-[#B8BED4] mb-1.5">
                  Coupon Code (try <span className="font-mono text-white">LAUNCH2026</span>)
                </label>
                <div className="flex gap-2">
                  <input
                    id="coupon-input"
                    type="text"
                    disabled={status === 'processing'}
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F] disabled:opacity-60"
                  />
                  <button
                    type="button"
                    disabled={status === 'processing'}
                    onClick={handleApplyCoupon}
                    className="px-4 py-2.5 rounded-lg border border-white/20 text-sm font-medium text-white hover:bg-white/5 disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && <p className="text-xs text-[#A5F51F] mt-1.5">{couponMessage}</p>}
                {couponError && <p className="text-xs text-rose-400 mt-1.5">{couponError}</p>}
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between text-[#B8BED4]">
                  <span>Original Price</span>
                  <span className="tabular-nums line-through">{formatINR(course.originalPrice)}</span>
                </div>
                <div className="flex justify-between text-[#B8BED4]">
                  <span>Launch Offer Discount</span>
                  <span className="tabular-nums text-[#A5F51F]">-{formatINR(savings)}</span>
                </div>
                {extraCouponSavings > 0 && (
                  <div className="flex justify-between text-[#B8BED4]">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span className="tabular-nums text-[#A5F51F]">-{formatINR(extraCouponSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white border-t border-white/10 pt-3">
                  <span>Total Payable (Demo)</span>
                  <span className="tabular-nums text-[#A5F51F]">{formatINR(finalAmount)}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg bg-[#0B0D17] border border-white/10 p-3 text-xs text-[#B8BED4]">
                <ShieldCheck className="w-4 h-4 text-[#A5F51F] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Demo Checkout Only:</strong> Enrollment is granted
                  only after payment verification succeeds. No real payment is charged.
                </p>
              </div>

              {!user ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/login', { state: { from: `/courses/${course.slug}` } });
                  }}
                  className="w-full min-h-[44px] py-3 px-5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#B3FA38] transition-colors cursor-pointer"
                >
                  Sign In to Enroll
                </button>
              ) : (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    disabled={status === 'processing'}
                    onClick={() => handleSimulatePayment('paid')}
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] py-3 px-4 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#B3FA38] disabled:opacity-70 transition-colors cursor-pointer"
                  >
                    {status === 'processing' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Verifying Payment...
                      </>
                    ) : (
                      `Complete Demo Payment · ${formatINR(finalAmount)}`
                    )}
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={status === 'processing'}
                      onClick={() => handleSimulatePayment('pending')}
                      className="min-h-[40px] py-2 px-2 rounded-lg border border-white/15 text-[#B8BED4] font-medium text-xs hover:text-white hover:bg-white/5 disabled:opacity-60 transition-colors cursor-pointer"
                    >
                      Pending
                    </button>
                    <button
                      type="button"
                      disabled={status === 'processing'}
                      onClick={() => handleSimulatePayment('failed')}
                      className="min-h-[40px] py-2 px-2 rounded-lg border border-white/15 text-white font-medium text-xs hover:bg-white/5 disabled:opacity-60 transition-colors cursor-pointer"
                    >
                      Simulate Fail
                    </button>
                    <button
                      type="button"
                      disabled={status === 'processing'}
                      onClick={() => handleSimulatePayment('cancel')}
                      className="min-h-[40px] py-2 px-2 rounded-lg border border-white/15 text-[#B8BED4] font-medium text-xs hover:text-white hover:bg-white/5 disabled:opacity-60 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : status === 'pending' ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Payment Pending</h3>
                <p className="text-sm text-[#B8BED4] mt-1">
                  Order <span className="font-mono text-white">{orderResult?.id ?? 'Pending'}</span> is awaiting verification. Course access remains locked until payment is confirmed.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleSimulatePayment('paid')}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#B3FA38] cursor-pointer"
                >
                  Verify &amp; Complete Payment
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulatePayment('cancel')}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 cursor-pointer"
                >
                  Cancel Checkout
                </button>
              </div>
            </div>
          ) : status === 'paid' && orderResult ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#A5F51F]/15 text-[#A5F51F] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Enrollment Confirmed (Demo)</h3>
                <p className="text-sm text-[#B8BED4] mt-1">
                  Order <span className="font-mono text-white">{orderResult.id}</span> ·{' '}
                  {formatINR(orderResult.finalAmount)}
                </p>
              </div>
              <p className="text-xs text-[#B8BED4]">
                Curriculum access unlocked for <strong className="text-white">{course.title}</strong>.
                {autoRedirectEnabled && firstLessonId
                  ? ` Opening Lesson 01 in ${redirectSeconds}s...`
                  : ''}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {firstLessonId && (
                  <button
                    type="button"
                    onClick={() => {
                      setAutoRedirectEnabled(false);
                      onClose();
                      navigate(`/learn/${course.id}/${firstLessonId}`);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 px-4 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#B3FA38] cursor-pointer"
                  >
                    Continue Learning <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setAutoRedirectEnabled(false);
                    onClose();
                    navigate('/dashboard/courses');
                  }}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 cursor-pointer"
                >
                  My Courses
                </button>
              </div>
            </div>
          ) : status === 'cancelled' ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 text-[#B8BED4] flex items-center justify-center">
                <Ban className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Payment Cancelled</h3>
                <p className="text-sm text-[#B8BED4] mt-1">
                  Checkout was cancelled. No enrollment or charge was made.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#B3FA38] cursor-pointer"
                >
                  Resume Checkout
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Payment Failed</h3>
                <p className="text-sm text-[#B8BED4] mt-1">
                  Order <span className="font-mono text-white">{orderResult?.id}</span> did not complete. Course access remains locked.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOrderResult(null);
                    setStatus('idle');
                  }}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#B3FA38] cursor-pointer"
                >
                  Retry Payment
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
