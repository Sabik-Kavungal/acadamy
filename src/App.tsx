import React, { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from './components/shared/ToastContainer';
import { AppProvider } from './context/AppContext';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CoursesPage } from './pages/CoursesPage';
import { FaqPage } from './pages/FaqPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { RegisterPage } from './pages/RegisterPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { TermsPage } from './pages/TermsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminCouponsPage } from './pages/admin/AdminCouponsPage';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { AdminLessonsPage } from './pages/admin/AdminLessonsPage';
import { AdminModulesPage } from './pages/admin/AdminModulesPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { CourseResourcesPage } from './pages/learn/CourseResourcesPage';
import { LearnLessonPage } from './pages/learn/LearnLessonPage';
import { StudentAssignmentsPage } from './pages/student/StudentAssignmentsPage';
import { StudentCertificatesPage } from './pages/student/StudentCertificatesPage';
import { StudentCoursesPage } from './pages/student/StudentCoursesPage';
import { StudentOverviewPage } from './pages/student/StudentOverviewPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentProgressPage } from './pages/student/StudentProgressPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Student Platform */}
          <Route path="/dashboard" element={<StudentOverviewPage />} />
          <Route path="/dashboard/courses" element={<StudentCoursesPage />} />
          <Route path="/my-learning" element={<StudentCoursesPage />} />
          <Route path="/dashboard/progress" element={<StudentProgressPage />} />
          <Route path="/dashboard/assignments" element={<StudentAssignmentsPage />} />
          <Route path="/dashboard/certificates" element={<StudentCertificatesPage />} />
          <Route path="/dashboard/profile" element={<StudentProfilePage />} />

          {/* Learning Platform */}
          <Route path="/learn/:courseId/resources" element={<CourseResourcesPage />} />
          <Route path="/learn/:courseId/:lessonId" element={<LearnLessonPage />} />

          {/* Admin Platform */}
          <Route path="/admin" element={<AdminOverviewPage />} />
          <Route path="/admin/courses" element={<AdminCoursesPage />} />
          <Route path="/admin/modules" element={<AdminModulesPage />} />
          <Route path="/admin/lessons" element={<AdminLessonsPage />} />
          <Route path="/admin/students" element={<AdminStudentsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/coupons" element={<AdminCouponsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AppProvider>
    </MotionConfig>
  );
}
