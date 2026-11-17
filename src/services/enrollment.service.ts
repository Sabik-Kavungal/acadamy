import { INITIAL_COUPONS, INITIAL_ORDERS } from '../data/admin-seed';
import type { Coupon, Course, Enrollment, Order, User } from '../types';
import { courseService } from './course.service';
import { storage } from './storage';

const ENROLLMENTS_KEY = 'demo_enrollments';
const ORDERS_KEY = 'demo_orders';
const COUPONS_KEY = 'demo_coupons';

function getInitialEnrollments(): Enrollment[] {
  const saved = storage.get<Enrollment[] | null>(ENROLLMENTS_KEY, null);
  if (saved) return saved;
  const seed: Enrollment[] = [
    {
      id: 'enr-seed-01',
      userId: 'usr-student-01',
      courseId: 'course-fdai-01',
      enrolledAt: '2026-10-12T10:05:00Z',
      orderId: 'ORD-2026-1041',
      amountPaid: 2999,
    },
  ];
  storage.set(ENROLLMENTS_KEY, seed);
  return seed;
}

export const enrollmentService = {
  getEnrollmentsForUser(userId: string): Enrollment[] {
    return getInitialEnrollments().filter((e) => e.userId === userId);
  },

  getAllEnrollments(): Enrollment[] {
    return getInitialEnrollments();
  },

  isEnrolled(userId: string | undefined, courseId: string): boolean {
    if (!userId) return false;
    return getInitialEnrollments().some((e) => e.userId === userId && e.courseId === courseId);
  },

  getCoupons(): Coupon[] {
    const saved = storage.get<Coupon[] | null>(COUPONS_KEY, null);
    if (!saved) {
      storage.set(COUPONS_KEY, INITIAL_COUPONS);
      return INITIAL_COUPONS;
    }
    return saved;
  },

  validateCoupon(code: string): { valid: boolean; coupon?: Coupon; message: string } {
    const cleaned = code.trim().toUpperCase();
    if (!cleaned) return { valid: false, message: 'Enter a coupon code.' };
    const coupon = this.getCoupons().find((c) => c.code.toUpperCase() === cleaned);
    if (!coupon) return { valid: false, message: 'Coupon code not found.' };
    if (!coupon.active) return { valid: false, message: 'This coupon is currently inactive.' };
    if (coupon.usedCount >= coupon.maxUses) return { valid: false, message: 'Coupon usage limit reached.' };
    return {
      valid: true,
      coupon,
      message: `${coupon.discountPercent}% extra launch discount applied.`,
    };
  },

  getAllOrders(): Order[] {
    const saved = storage.get<Order[] | null>(ORDERS_KEY, null);
    if (!saved) {
      storage.set(ORDERS_KEY, INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    return saved;
  },

  getLatestOrderForCourse(userId: string | undefined, courseId: string): Order | undefined {
    if (!userId) return undefined;
    return this.getAllOrders().find((o) => o.userId === userId && o.courseId === courseId);
  },

  cancelPendingOrder(userId: string, courseId: string): void {
    const orders = this.getAllOrders();
    let changed = false;
    const nextOrders = orders.map((o) => {
      if (o.userId === userId && o.courseId === courseId && o.status === 'pending') {
        changed = true;
        return { ...o, status: 'cancelled' as const };
      }
      return o;
    });
    if (changed) {
      storage.set(ORDERS_KEY, nextOrders);
    }
  },

  processMockCheckout(params: {
    user: User;
    course: Course;
    couponCode?: string;
    outcome: 'paid' | 'failed' | 'pending';
  }): { order: Order; enrollment?: Enrollment } {
    const authoritativeCourse =
      courseService.getAllCourses().find((c) => c.id === params.course.id) ?? params.course;
    const enrollments = getInitialEnrollments();
    const existingEnrollment = enrollments.find(
      (e) => e.userId === params.user.id && e.courseId === authoritativeCourse.id
    );
    const existingOrder = this.getLatestOrderForCourse(params.user.id, authoritativeCourse.id);

    // Idempotent guard: never duplicate enrollment or charge an already-enrolled student
    if (existingEnrollment && existingOrder?.status === 'paid') {
      return { order: existingOrder, enrollment: existingEnrollment };
    }

    const basePrice = authoritativeCourse.launchPrice;
    let couponDiscount = 0;
    let appliedCode: string | undefined;

    if (params.couponCode) {
      const check = this.validateCoupon(params.couponCode);
      if (check.valid && check.coupon) {
        couponDiscount = Math.round((basePrice * check.coupon.discountPercent) / 100);
        appliedCode = check.coupon.code;
        if (params.outcome === 'paid') {
          const coupons = this.getCoupons().map((c) =>
            c.id === check.coupon!.id ? { ...c, usedCount: c.usedCount + 1 } : c
          );
          storage.set(COUPONS_KEY, coupons);
        }
      }
    }

    const finalAmount = Math.max(0, basePrice - couponDiscount);
    const totalDiscount = Math.max(0, authoritativeCourse.originalPrice - finalAmount);

    const order: Order = {
      id: `ORD-DEMO-${Date.now().toString().slice(-6)}`,
      userId: params.user.id,
      studentName: params.user.fullName,
      studentEmail: params.user.email,
      courseId: authoritativeCourse.id,
      courseTitle: authoritativeCourse.title,
      originalAmount: authoritativeCourse.originalPrice,
      discountAmount: totalDiscount,
      finalAmount,
      couponCode: appliedCode,
      status: params.outcome,
      paymentGateway: 'Razorpay (Demo)',
      createdAt: new Date().toISOString(),
    };

    // Replace previous pending order for same user+course cleanly, otherwise prepend
    const orders = this.getAllOrders().filter(
      (o) => !(o.userId === params.user.id && o.courseId === params.course.id && o.status === 'pending')
    );
    storage.set(ORDERS_KEY, [order, ...orders]);

    // Enrollment is ONLY created on verified 'paid' outcome
    if (params.outcome !== 'paid') {
      return { order };
    }

    if (existingEnrollment) {
      return { order, enrollment: existingEnrollment };
    }

    const enrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      userId: params.user.id,
      courseId: params.course.id,
      enrolledAt: new Date().toISOString(),
      orderId: order.id,
      amountPaid: finalAmount,
    };
    storage.set(ENROLLMENTS_KEY, [enrollment, ...enrollments]);
    return { order, enrollment };
  },
};
