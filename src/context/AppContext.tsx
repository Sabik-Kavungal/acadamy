import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { adminService } from '../services/admin.service';
import { authService } from '../services/auth.service';
import { courseService } from '../services/course.service';
import { enrollmentService } from '../services/enrollment.service';
import { progressService } from '../services/progress.service';
import type { Course, Enrollment, PlatformSettings, User, UserRole } from '../types';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'info';
}

export type CourseAccessState =
  | 'enrolled'
  | 'unauthenticated'
  | 'pending'
  | 'failed'
  | 'not_enrolled';

interface AppContextValue {
  user: User | null;
  courses: Course[];
  enrollments: Enrollment[];
  settings: PlatformSettings;
  toasts: ToastMessage[];
  notify: (title: string, description?: string, variant?: ToastMessage['variant']) => void;
  dismissToast: (id: string) => void;
  loginDemo: (email: string, password: string) => Promise<User>;
  quickDemoLogin: (role: UserRole) => Promise<User>;
  registerDemo: (input: { fullName: string; email: string; phone: string }) => Promise<User>;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<User, 'fullName' | 'phone' | 'title' | 'githubUrl' | 'linkedinUrl' | 'bio'>>) => void;
  refreshCourses: () => void;
  refreshEnrollments: () => void;
  refreshSettings: () => void;
  isEnrolled: (courseId: string) => boolean;
  getCourseAccessState: (courseId: string) => CourseAccessState;
  recordLessonAccess: (courseId: string, lessonId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string, lessonTitle?: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [courses, setCourses] = useState<Course[]>(() => courseService.getAllCourses());
  const [settings, setSettings] = useState<PlatformSettings>(() => adminService.getSettings());
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() =>
    user ? enrollmentService.getEnrollmentsForUser(user.id) : []
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [, setProgressRevision] = useState(0);
  const [, setOrderRevision] = useState(0);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (title: string, description?: string, variant: ToastMessage['variant'] = 'info') => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-2), { id, title, description, variant }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 4000);
    },
    [dismissToast]
  );

  const refreshEnrollments = useCallback(() => {
    if (user) {
      setEnrollments(enrollmentService.getEnrollmentsForUser(user.id));
    } else {
      setEnrollments([]);
    }
    setOrderRevision((n) => n + 1);
  }, [user]);

  useEffect(() => {
    refreshEnrollments();
  }, [refreshEnrollments]);

  const refreshCourses = useCallback(() => {
    setCourses(courseService.getAllCourses());
  }, []);

  const refreshSettings = useCallback(() => {
    setSettings(adminService.getSettings());
  }, []);

  const loginDemo = useCallback(
    async (email: string, password: string) => {
      const { user: loggedIn } = await authService.loginDemo(email, password);
      setUser(loggedIn);
      setEnrollments(enrollmentService.getEnrollmentsForUser(loggedIn.id));
      notify('Signed in (Demo Mode)', `Welcome back, ${loggedIn.fullName}.`, 'success');
      return loggedIn;
    },
    [notify]
  );

  const quickDemoLogin = useCallback(
    async (role: UserRole) => {
      const loggedIn = await authService.quickDemoLogin(role);
      setUser(loggedIn);
      setEnrollments(enrollmentService.getEnrollmentsForUser(loggedIn.id));
      notify(
        `Demo ${role === 'admin' ? 'Admin' : 'Student'} Active`,
        `Signed in as ${loggedIn.fullName}.`,
        'success'
      );
      return loggedIn;
    },
    [notify]
  );

  const registerDemo = useCallback(
    async (input: { fullName: string; email: string; phone: string }) => {
      const created = await authService.registerDemo(input);
      setUser(created);
      setEnrollments(enrollmentService.getEnrollmentsForUser(created.id));
      notify('Account Created (Demo Mode)', `Welcome to ${settings.brandName}`, 'success');
      return created;
    },
    [notify, settings.brandName]
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setEnrollments([]);
    notify('Signed out', 'Your demo session has ended.', 'info');
  }, [notify]);

  const updateProfile = useCallback(
    (patch: Partial<Pick<User, 'fullName' | 'phone' | 'title' | 'githubUrl' | 'linkedinUrl' | 'bio'>>) => {
      if (!user) return;
      const updated = authService.updateProfile(user.id, patch);
      if (updated) {
        setUser(updated);
        notify('Profile updated', 'Your demo profile changes were saved locally.', 'success');
      }
    },
    [user, notify]
  );

  const isEnrolled = useCallback(
    (courseId: string) => {
      if (!user) return false;
      if (user.role === 'admin') return true;
      return enrollments.some((e) => e.courseId === courseId);
    },
    [user, enrollments]
  );

  const getCourseAccessState = useCallback(
    (courseId: string): CourseAccessState => {
      if (!user) return 'unauthenticated';
      if (user.role === 'admin' || enrollments.some((e) => e.courseId === courseId)) {
        return 'enrolled';
      }
      const latestOrder = enrollmentService.getLatestOrderForCourse(user.id, courseId);
      if (latestOrder?.status === 'pending') return 'pending';
      if (latestOrder?.status === 'failed') return 'failed';
      return 'not_enrolled';
    },
    [user, enrollments]
  );

  const recordLessonAccess = useCallback(
    (courseId: string, lessonId: string) => {
      if (!user) return;
      const prev = progressService.getCourseProgress(user.id, courseId).lastAccessedLessonId;
      if (prev === lessonId) return;
      progressService.recordLessonAccess(user.id, courseId, lessonId);
      setProgressRevision((n) => n + 1);
    },
    [user]
  );

  const toggleLessonComplete = useCallback(
    (courseId: string, lessonId: string, lessonTitle?: string) => {
      if (!user) return;
      progressService.toggleLessonCompleted(user.id, courseId, lessonId, lessonTitle);
      setProgressRevision((n) => n + 1);
    },
    [user]
  );

  return (
    <AppContext.Provider
      value={{
        user,
        courses,
        enrollments,
        settings,
        toasts,
        notify,
        dismissToast,
        loginDemo,
        quickDemoLogin,
        registerDemo,
        logout,
        updateProfile,
        refreshCourses,
        refreshEnrollments,
        refreshSettings,
        isEnrolled,
        getCourseAccessState,
        recordLessonAccess,
        toggleLessonComplete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
