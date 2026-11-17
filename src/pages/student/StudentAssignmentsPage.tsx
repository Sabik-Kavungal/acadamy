import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, GitBranch, Info } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';
import { assignmentService } from '../../services/assignment.service';
import type { AssignmentSubmission } from '../../types';

export function StudentAssignmentsPage() {
  const { user, courses, notify } = useApp();
  const assignments = assignmentService.getAssignments();

  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() =>
    user ? assignmentService.getUserSubmissions(user.id) : []
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const visibleAssignments =
    courseFilter === 'all'
      ? assignments
      : assignments.filter((a) => a.courseId === courseFilter);

  const openSubmissionForm = (assignmentId: string) => {
    const existing = submissions.find((s) => s.assignmentId === assignmentId);
    setActiveId(assignmentId);
    setGithubUrl(existing?.githubUrl ?? '');
    setNotes(existing?.notes ?? '');
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent, assignmentId: string, title: string, courseId: string) => {
    e.preventDefault();
    if (!user) return;
    if (!githubUrl.trim().startsWith('https://')) {
      setFormError('Please enter a valid HTTPS GitHub repository URL.');
      return;
    }
    const next = assignmentService.submitAssignment({
      assignmentId,
      assignmentTitle: title,
      courseId,
      userId: user.id,
      githubUrl,
      notes,
    });
    setSubmissions(next);
    setActiveId(null);
    notify('Assignment Submitted (Demo)', 'Saved to your local demo portfolio.', 'success');
  };

  return (
    <DashboardLayout title="Assignments">
      <div className="space-y-6">
        <div className="rounded-xl bg-[#131728] border border-white/10 p-4 flex items-start gap-3 text-xs text-[#B8BED4]">
          <Info className="w-4 h-4 text-[#A5F51F] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Frontend Submission Demo:</strong> GitHub repository URLs
            and engineering notes are stored locally in your browser to demonstrate the assignment
            workflow. Production mentor review requires backend API integration.
          </p>
        </div>

        {courses.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCourseFilter('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                courseFilter === 'all'
                  ? 'bg-[#A5F51F] text-[#0B0D17]'
                  : 'bg-[#131728] text-[#B8BED4] border border-white/10 hover:text-white'
              }`}
            >
              All Pathways ({assignments.length})
            </button>
            {courses.map((course) => (
              <button
                key={course.id}
                type="button"
                onClick={() => setCourseFilter(course.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  courseFilter === course.id
                    ? 'bg-[#A5F51F] text-[#0B0D17]'
                    : 'bg-[#131728] text-[#B8BED4] border border-white/10 hover:text-white'
                }`}
              >
                {course.category}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-5">
          {visibleAssignments.map((asg) => {
            const existing = submissions.find((s) => s.assignmentId === asg.id);
            const isEditing = activeId === asg.id;
            const courseLabel =
              courses.find((c) => c.id === asg.courseId)?.title ?? 'Engineering Pathway';

            return (
              <article
                key={asg.id}
                className="rounded-xl bg-[#1A1F35] border border-white/10 p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-[#A5F51F]">
                      {courseLabel} · {asg.moduleCode} · {asg.difficulty} · ~{asg.estimatedHours}h
                    </p>
                    <h2 className="font-display text-xl font-bold text-white">{asg.title}</h2>
                  </div>

                  {existing ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A5F51F] shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Submitted (Demo)
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-[#7F87A3] shrink-0">
                      Not Submitted
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#B8BED4] leading-relaxed">{asg.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs text-[#B8BED4]">
                  <div>
                    <p className="font-semibold text-white mb-1.5">Instructions</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {asg.instructions.map((ins) => (
                        <li key={ins}>{ins}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1.5">Deliverables</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {asg.deliverables.map((del) => (
                        <li key={del}>{del}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {existing && !isEditing && (
                  <div className="rounded-lg bg-[#0B0D17] border border-white/10 p-4 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <a
                        href={existing.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[#A5F51F] hover:underline break-all min-w-0"
                      >
                        <GitBranch className="w-3.5 h-3.5 shrink-0" /> {existing.githubUrl}
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                      <span className="text-[#7F87A3]">
                        {new Date(existing.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {existing.notes && <p className="text-[#B8BED4]">{existing.notes}</p>}
                  </div>
                )}

                {isEditing ? (
                  <form
                    onSubmit={(e) => handleSubmit(e, asg.id, asg.title, asg.courseId)}
                    className="rounded-lg bg-[#0B0D17] border border-white/15 p-4 space-y-3"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-[#B8BED4] mb-1">
                        GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder={`https://github.com/username/${asg.starterRepoLabel.split('/')[1]}`}
                        className="w-full rounded-lg bg-[#131728] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#B8BED4] mb-1">
                        Implementation Notes
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Summarize architectural choices, eval results, or known edge cases..."
                        className="w-full rounded-lg bg-[#131728] border border-white/15 px-3.5 py-2 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                      />
                    </div>
                    {formError && <p className="text-xs text-rose-400">{formError}</p>}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold hover:bg-[#93E012] cursor-pointer"
                      >
                        Save Submission (Demo)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveId(null)}
                        className="px-4 py-2 rounded-lg border border-white/15 text-xs text-[#B8BED4] hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => openSubmissionForm(asg.id)}
                      className="px-4 py-2 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold hover:bg-[#93E012] cursor-pointer"
                    >
                      {existing ? 'Update Submission' : 'Submit GitHub Repo'}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
