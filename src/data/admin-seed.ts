import type { Coupon, Order, PlatformSettings, User } from '../types';

export const DEMO_USERS: User[] = [
  {
    id: 'usr-student-01',
    fullName: 'Ananya Deshmukh',
    email: 'ananya.dev@example.com',
    phone: '+91 98765 43210',
    role: 'student',
    title: 'Full-Stack Software Engineer',
    githubUrl: 'https://github.com/ananya-dev',
    linkedinUrl: 'https://linkedin.com/in/ananya-dev',
    bio: 'Building TypeScript & FastAPI web services; transitioning into applied RAG and agent systems.',
    joinedAt: '2026-10-12T09:30:00Z',
  },
  {
    id: 'usr-admin-01',
    fullName: 'Sabik',
    email: 'admin@axiomdev.academy',
    phone: '+91 98000 11223',
    role: 'admin',
    title: 'Founder · AI Product Engineer & Software Architect',
    githubUrl: 'https://github.com/sabik-dev',
    linkedinUrl: 'https://linkedin.com/in/sabik-dev',
    bio: 'Building intelligent products, engineering scalable software systems, and leading curriculum at AxiomDev Academy.',
    joinedAt: '2026-08-01T08:00:00Z',
  },
  {
    id: 'usr-student-02',
    fullName: 'Karthik Nair',
    email: 'karthik.backend@example.com',
    phone: '+91 98111 22334',
    role: 'student',
    title: 'Backend Engineer (Go & Postgres)',
    joinedAt: '2026-10-28T14:15:00Z',
  },
  {
    id: 'usr-student-03',
    fullName: 'Meera Iyer',
    email: 'meera.mobile@example.com',
    phone: '+91 98222 33445',
    role: 'student',
    title: 'React Native Developer',
    joinedAt: '2026-11-04T11:20:00Z',
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cpn-01',
    code: 'LAUNCH2026',
    discountPercent: 10,
    maxUses: 200,
    usedCount: 24,
    active: true,
    expiresAt: '2026-12-31',
  },
  {
    id: 'cpn-02',
    code: 'EARLYDEV',
    discountPercent: 15,
    maxUses: 100,
    usedCount: 12,
    active: true,
    expiresAt: '2026-12-15',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-1041',
    userId: 'usr-student-01',
    studentName: 'Ananya Deshmukh',
    studentEmail: 'ananya.dev@example.com',
    courseId: 'course-fdai-01',
    courseTitle: 'Forward Deployed AI Engineer',
    originalAmount: 3999,
    discountAmount: 1000,
    finalAmount: 2999,
    status: 'paid',
    paymentGateway: 'Razorpay (Demo)',
    createdAt: '2026-10-12T10:05:00Z',
  },
  {
    id: 'ORD-2026-1042',
    userId: 'usr-student-02',
    studentName: 'Karthik Nair',
    studentEmail: 'karthik.backend@example.com',
    courseId: 'course-fdai-01',
    courseTitle: 'Forward Deployed AI Engineer',
    originalAmount: 3999,
    discountAmount: 1300,
    finalAmount: 2699,
    couponCode: 'LAUNCH2026',
    status: 'paid',
    paymentGateway: 'Razorpay (Demo)',
    createdAt: '2026-10-28T15:00:00Z',
  },
];

export const INITIAL_SETTINGS: PlatformSettings = {
  brandName: 'AxiomDev.',
  supportEmail: 'admissions@axiomdev.academy',
  studentLaunchOfferActive: true,
  flagshipOriginalPrice: 3999,
  flagshipLaunchPrice: 2999,
  razorpayMode: 'test_simulation',
};
