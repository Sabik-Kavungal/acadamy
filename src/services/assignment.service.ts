import { INITIAL_ASSIGNMENTS } from '../data/assignments';
import type { Assignment, AssignmentSubmission } from '../types';
import { progressService } from './progress.service';
import { storage } from './storage';

const SUBMISSIONS_KEY = 'demo_assignment_submissions';

function getSeedSubmissions(): AssignmentSubmission[] {
  return [
    {
      assignmentId: 'asg-01',
      userId: 'usr-student-01',
      githubUrl: 'https://github.com/ananya-dev/fdai-structured-triage',
      notes: 'Implemented Zod strict enum validation with retry backoff and 6 Vitest unit specs.',
      submittedAt: '2026-11-12T16:40:00Z',
      status: 'submitted',
    },
  ];
}

export const assignmentService = {
  getAssignments(): Assignment[] {
    return INITIAL_ASSIGNMENTS;
  },

  getUserSubmissions(userId: string): AssignmentSubmission[] {
    const saved = storage.get<AssignmentSubmission[] | null>(SUBMISSIONS_KEY, null);
    const list = saved ?? getSeedSubmissions();
    if (!saved) {
      storage.set(SUBMISSIONS_KEY, list);
    }
    return list.filter((s) => s.userId === userId);
  },

  submitAssignment(input: {
    assignmentId: string;
    assignmentTitle: string;
    courseId: string;
    userId: string;
    githubUrl: string;
    notes: string;
  }): AssignmentSubmission[] {
    const saved = storage.get<AssignmentSubmission[]>(SUBMISSIONS_KEY, getSeedSubmissions());
    const filtered = saved.filter(
      (s) => !(s.assignmentId === input.assignmentId && s.userId === input.userId)
    );
    const entry: AssignmentSubmission = {
      assignmentId: input.assignmentId,
      userId: input.userId,
      githubUrl: input.githubUrl.trim(),
      notes: input.notes.trim(),
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    };
    const next = [entry, ...filtered];
    storage.set(SUBMISSIONS_KEY, next);

    progressService.logActivity(input.userId, {
      courseId: input.courseId,
      title: `Submitted assignment: ${input.assignmentTitle}`,
      type: 'assignment_submitted',
    });

    return next.filter((s) => s.userId === input.userId);
  },
};
