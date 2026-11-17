export type CourseStatus = 'available' | 'coming_soon';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseCategory = 'AI Engineering' | 'Mobile Engineering';

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'github' | 'article' | 'slides';
  url: string;
  sizeOrNote: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  order: number;
  title: string;
  durationMinutes: number;
  durationLabel: string;
  description: string;
  videoUrl: string;
  isFreePreview?: boolean;
  notes: string[];
  resources: LessonResource[];
}

export interface CourseModule {
  id: string;
  courseId: string;
  order: number;
  code: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface InstructorLinks {
  linkedin: string;
  github: string;
  website: string;
}

export interface Instructor {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  extendedBio: string;
  experience: string;
  experienceYears: number;
  productPhilosophy: string;
  aiEngineeringFocus: string;
  specialties: string[];
  expertise: string[];
  links: InstructorLinks;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: CourseCategory;
  difficulty: DifficultyLevel;
  durationLabel: string;
  durationHours: number;
  status: CourseStatus;
  featured: boolean;
  originalPrice: number;
  launchPrice: number;
  offerLabel: string;
  technologies: string[];
  outcomes: string[];
  skills: string[];
  whoShouldEnroll: string[];
  prerequisites: string[];
  careerBenefits: string[];
  interviewPrep: string[];
  capstoneProject: {
    title: string;
    description: string;
    deliverables: string[];
  };
  curriculumGroups?: Array<{
    title: string;
    items: string[];
  }>;
  practicalProjects?: Array<{
    title: string;
    description: string;
    stack?: string;
  }>;
  pathNumber?: string;
  introVideoUrl: string;
  instructor: Instructor;
  modules: CourseModule[];
  artworkVariant: 'ai' | 'mobile';
  projectBased?: boolean;
  language?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  title: string;
  githubUrl?: string;
  linkedinUrl?: string;
  bio?: string;
  joinedAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  orderId: string;
  amountPaid: number;
}

export interface LessonProgressRecord {
  completedLessonIds: string[];
  playbackPositions: Record<string, number>; // lessonId -> seconds
  lastAccessedLessonId?: string;
  lastUpdatedAt: string;
}

export interface ActivityLogItem {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  timestamp: string;
  type: 'lesson_completed' | 'enrolled' | 'assignment_submitted';
}

export interface Assignment {
  id: string;
  courseId: string;
  moduleCode: string;
  title: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  description: string;
  instructions: string[];
  deliverables: string[];
  starterRepoLabel: string;
}

export interface AssignmentSubmission {
  assignmentId: string;
  userId: string;
  githubUrl: string;
  notes: string;
  submittedAt: string;
  status: 'submitted' | 'reviewed';
}

export interface Order {
  id: string;
  userId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  couponCode?: string;
  status: 'paid' | 'failed' | 'pending' | 'cancelled';
  paymentGateway: 'Razorpay (Demo)';
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  maxUses: number;
  usedCount: number;
  active: boolean;
  expiresAt: string;
}

export interface PlatformSettings {
  brandName: string;
  supportEmail: string;
  studentLaunchOfferActive: boolean;
  flagshipOriginalPrice: number;
  flagshipLaunchPrice: number;
  razorpayMode: 'test_simulation';
}

export interface FAQItem {
  id: string;
  category: 'Curriculum' | 'Pricing' | 'Access & Demo' | 'Careers';
  question: string;
  answer: string;
}
