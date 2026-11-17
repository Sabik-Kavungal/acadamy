import { INITIAL_COURSES } from '../data/courses';
import { FOUNDER_INSTRUCTOR } from '../data/instructor';
import type { Course, CourseModule, Lesson } from '../types';
import { storage } from './storage';

const COURSES_KEY = 'catalog_courses';

function loadCourses(): Course[] {
  const saved = storage.get<Course[] | null>(COURSES_KEY, null);
  if (!saved || saved.length === 0) {
    storage.set(COURSES_KEY, INITIAL_COURSES);
    return INITIAL_COURSES;
  }
  return saved.map((c) => ({
    ...c,
    language: c.language ?? 'English',
  }));
}

export const courseService = {
  getAllCourses(): Course[] {
    return loadCourses();
  },

  getFlagshipCourse(): Course {
    const courses = loadCourses();
    return courses.find((c) => c.featured) ?? courses[0];
  },

  createCourse(input: {
    title: string;
    subtitle: string;
    description: string;
    category: Course['category'];
    difficulty: Course['difficulty'];
    originalPrice: number;
    launchPrice: number;
    status: Course['status'];
    technologies: string[];
  }): Course[] {
    const courses = loadCourses();
    const slug = input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newCourse: Course = {
      ...INITIAL_COURSES[0],
      id: `course-${Date.now()}`,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      title: input.title,
      subtitle: input.subtitle,
      description: input.description,
      category: input.category,
      difficulty: input.difficulty,
      durationLabel: input.status === 'available' ? 'Self-Paced Track' : 'Coming Soon',
      durationHours: 6,
      status: input.status,
      featured: false,
      originalPrice: input.originalPrice,
      launchPrice: input.launchPrice,
      offerLabel: input.status === 'available' ? 'LAUNCH OFFER' : 'Upcoming Release',
      technologies: input.technologies,
      instructor: FOUNDER_INSTRUCTOR,
      modules: [],
      artworkVariant: input.category === 'Mobile Engineering' ? 'mobile' : 'ai',
      projectBased: true,
      language: 'English',
      publishedAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    const next = [...courses, newCourse];
    storage.set(COURSES_KEY, next);
    return next;
  },

  updateCourse(courseId: string, patch: Partial<Course>): Course[] {
    const courses = loadCourses();
    const next = courses.map((c) => (c.id === courseId ? { ...c, ...patch } : c));
    storage.set(COURSES_KEY, next);
    return next;
  },

  deleteCourse(courseId: string): Course[] {
    const courses = loadCourses();
    const next = courses.filter((c) => c.id !== courseId);
    storage.set(COURSES_KEY, next);
    return next;
  },

  addModule(courseId: string, input: { code: string; title: string; summary: string }): Course[] {
    const courses = loadCourses();
    const next = courses.map((c) => {
      if (c.id !== courseId) return c;
      const newMod: CourseModule = {
        id: `mod-${Date.now()}`,
        courseId,
        order: c.modules.length + 1,
        code: input.code,
        title: input.title,
        summary: input.summary,
        lessons: [],
      };
      return { ...c, modules: [...c.modules, newMod] };
    });
    storage.set(COURSES_KEY, next);
    return next;
  },

  deleteModule(courseId: string, moduleId: string): Course[] {
    const courses = loadCourses();
    const next = courses.map((c) =>
      c.id === courseId ? { ...c, modules: c.modules.filter((m) => m.id !== moduleId) } : c
    );
    storage.set(COURSES_KEY, next);
    return next;
  },

  addLesson(
    courseId: string,
    moduleId: string,
    input: { title: string; durationLabel: string; durationMinutes: number; description: string; videoUrl: string }
  ): Course[] {
    const courses = loadCourses();
    const next = courses.map((c) => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        modules: c.modules.map((m) => {
          if (m.id !== moduleId) return m;
          const newLesson: Lesson = {
            id: `les-${Date.now()}`,
            moduleId,
            courseId,
            order: m.lessons.length + 1,
            title: input.title,
            durationLabel: input.durationLabel,
            durationMinutes: input.durationMinutes,
            description: input.description,
            videoUrl: input.videoUrl,
            notes: ['Lesson added via Admin Curriculum Manager.'],
            resources: [],
          };
          return { ...m, lessons: [...m.lessons, newLesson] };
        }),
      };
    });
    storage.set(COURSES_KEY, next);
    return next;
  },

  updateLesson(courseId: string, moduleId: string, lessonId: string, patch: Partial<Lesson>): Course[] {
    const courses = loadCourses();
    const next = courses.map((c) => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        modules: c.modules.map((m) => {
          if (m.id !== moduleId) return m;
          return {
            ...m,
            lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)),
          };
        }),
      };
    });
    storage.set(COURSES_KEY, next);
    return next;
  },

  deleteLesson(courseId: string, moduleId: string, lessonId: string): Course[] {
    const courses = loadCourses();
    const next = courses.map((c) => {
      if (c.id !== courseId) return c;
      return {
        ...c,
        modules: c.modules.map((m) =>
          m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m
        ),
      };
    });
    storage.set(COURSES_KEY, next);
    return next;
  },
};
