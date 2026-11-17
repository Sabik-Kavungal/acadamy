import type { Course, CourseModule, Lesson } from '../types';

export function getSortedModules(course: Course): CourseModule[] {
  return [...course.modules]
    .sort((a, b) => a.order - b.order)
    .map((m) => ({
      ...m,
      lessons: [...m.lessons].sort((a, b) => a.order - b.order),
    }));
}

export function getFlatLessons(course: Course): Lesson[] {
  return getSortedModules(course).flatMap((m) => m.lessons);
}

export function getModuleDurationMinutes(mod: CourseModule): number {
  return mod.lessons.reduce((sum, l) => sum + (l.durationMinutes || 0), 0);
}

export function formatMinutesLabel(totalMinutes: number): string {
  if (totalMinutes <= 0) return '0m';
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function getCourseDurationSummary(course: Course): {
  moduleCount: number;
  lessonCount: number;
  totalMinutes: number;
  formattedTotal: string;
} {
  const modules = getSortedModules(course);
  const lessons = modules.flatMap((m) => m.lessons);
  const totalMinutes = lessons.reduce((sum, l) => sum + (l.durationMinutes || 0), 0);
  const formattedTotal =
    totalMinutes > 0
      ? formatMinutesLabel(totalMinutes)
      : `${course.durationHours}h`;

  return {
    moduleCount: modules.length,
    lessonCount: lessons.length,
    totalMinutes,
    formattedTotal,
  };
}

export function formatCourseDate(isoDate?: string): string {
  if (!isoDate) return 'Recently updated';
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });
}
