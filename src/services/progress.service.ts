import type { ActivityLogItem, Course, LessonProgressRecord } from '../types';
import { storage } from './storage';

const PROGRESS_KEY = 'demo_progress_by_user';
const ACTIVITY_KEY = 'demo_activity_by_user';

type ProgressMap = Record<string, Record<string, LessonProgressRecord>>; // userId -> courseId -> record

function getSeedProgress(): ProgressMap {
  return {
    'usr-student-01': {
      'course-fdai-01': {
        completedLessonIds: ['les-01-01', 'les-01-02'],
        playbackPositions: { 'les-01-03': 42 },
        lastAccessedLessonId: 'les-01-03',
        lastUpdatedAt: '2026-11-15T18:20:00Z',
      },
    },
  };
}

function getSeedActivity(): Record<string, ActivityLogItem[]> {
  return {
    'usr-student-01': [
      {
        id: 'act-01',
        courseId: 'course-fdai-01',
        lessonId: 'les-01-02',
        title: 'Completed: Understanding LLMs & Modern AI Application Architecture',
        timestamp: '2026-11-15T18:10:00Z',
        type: 'lesson_completed',
      },
      {
        id: 'act-02',
        courseId: 'course-fdai-01',
        lessonId: 'les-01-01',
        title: 'Completed: Introduction & Role of a Forward Deployed AI Engineer',
        timestamp: '2026-11-14T19:45:00Z',
        type: 'lesson_completed',
      },
      {
        id: 'act-03',
        courseId: 'course-fdai-01',
        title: 'Enrolled in Forward Deployed AI Engineer',
        timestamp: '2026-10-12T10:05:00Z',
        type: 'enrolled',
      },
    ],
  };
}

function getProgressMap(): ProgressMap {
  const saved = storage.get<ProgressMap | null>(PROGRESS_KEY, null);
  if (!saved) {
    const seed = getSeedProgress();
    storage.set(PROGRESS_KEY, seed);
    return seed;
  }
  return saved;
}

export const progressService = {
  getCourseProgress(userId: string, courseId: string): LessonProgressRecord {
    const map = getProgressMap();
    const record = map[userId]?.[courseId];
    if (!record) {
      return {
        completedLessonIds: [],
        playbackPositions: {},
        lastUpdatedAt: new Date().toISOString(),
      };
    }
    return {
      ...record,
      completedLessonIds: Array.from(new Set(record.completedLessonIds)),
    };
  },

  recordLessonAccess(userId: string, courseId: string, lessonId: string): LessonProgressRecord {
    const map = getProgressMap();
    const current = this.getCourseProgress(userId, courseId);
    if (current.lastAccessedLessonId === lessonId) {
      return current;
    }
    const updated: LessonProgressRecord = {
      ...current,
      lastAccessedLessonId: lessonId,
      lastUpdatedAt: new Date().toISOString(),
    };
    storage.set(PROGRESS_KEY, {
      ...map,
      [userId]: {
        ...(map[userId] ?? {}),
        [courseId]: updated,
      },
    });
    return updated;
  },

  toggleLessonCompleted(userId: string, courseId: string, lessonId: string, lessonTitle?: string): LessonProgressRecord {
    const map = getProgressMap();
    const current = this.getCourseProgress(userId, courseId);
    const exists = current.completedLessonIds.includes(lessonId);
    const nextCompleted = Array.from(
      new Set(
        exists
          ? current.completedLessonIds.filter((id) => id !== lessonId)
          : [...current.completedLessonIds, lessonId]
      )
    );

    const updated: LessonProgressRecord = {
      ...current,
      completedLessonIds: nextCompleted,
      lastAccessedLessonId: lessonId,
      lastUpdatedAt: new Date().toISOString(),
    };

    const nextMap: ProgressMap = {
      ...map,
      [userId]: {
        ...(map[userId] ?? {}),
        [courseId]: updated,
      },
    };
    storage.set(PROGRESS_KEY, nextMap);

    if (!exists && lessonTitle) {
      this.logActivity(userId, {
        courseId,
        lessonId,
        title: `Completed: ${lessonTitle}`,
        type: 'lesson_completed',
      });
    }

    return updated;
  },

  savePlaybackPosition(userId: string, courseId: string, lessonId: string, seconds: number): void {
    if (!Number.isFinite(seconds) || seconds < 0) return;
    const map = getProgressMap();
    const current = this.getCourseProgress(userId, courseId);
    const updated: LessonProgressRecord = {
      ...current,
      playbackPositions: {
        ...current.playbackPositions,
        [lessonId]: Math.floor(seconds),
      },
      lastAccessedLessonId: lessonId,
      lastUpdatedAt: new Date().toISOString(),
    };
    storage.set(PROGRESS_KEY, {
      ...map,
      [userId]: {
        ...(map[userId] ?? {}),
        [courseId]: updated,
      },
    });
  },

  getPlaybackPosition(userId: string, courseId: string, lessonId: string): number {
    return this.getCourseProgress(userId, courseId).playbackPositions[lessonId] ?? 0;
  },

  getCompletionPercentage(userId: string, course: Course): { completed: number; total: number; percent: number } {
    const allLessons = course.modules.flatMap((m) => m.lessons);
    const total = allLessons.length;
    if (total === 0) return { completed: 0, total: 0, percent: 0 };
    const record = this.getCourseProgress(userId, course.id);
    const completedSet = new Set(record.completedLessonIds);
    const completed = allLessons.filter((l) => completedSet.has(l.id)).length;
    return {
      completed,
      total,
      percent: Math.round((completed / total) * 100),
    };
  },

  getRecentActivity(userId: string): ActivityLogItem[] {
    const saved = storage.get<Record<string, ActivityLogItem[]> | null>(ACTIVITY_KEY, null);
    if (!saved) {
      const seed = getSeedActivity();
      storage.set(ACTIVITY_KEY, seed);
      return seed[userId] ?? [];
    }
    return saved[userId] ?? [];
  },

  logActivity(
    userId: string,
    item: Omit<ActivityLogItem, 'id' | 'timestamp'>
  ): ActivityLogItem[] {
    const saved = storage.get<Record<string, ActivityLogItem[]>>(ACTIVITY_KEY, getSeedActivity());
    const userLogs = saved[userId] ?? [];
    const newItem: ActivityLogItem = {
      ...item,
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    const next = [newItem, ...userLogs].slice(0, 20);
    storage.set(ACTIVITY_KEY, { ...saved, [userId]: next });
    return next;
  },
};
