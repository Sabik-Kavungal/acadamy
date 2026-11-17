import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { SITE_CONFIG } from '../../config/site';
import { useApp } from '../../context/AppContext';
import { courseService } from '../../services/course.service';

export function AdminLessonsPage() {
  const { courses, refreshCourses, notify } = useApp();
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const course = courses.find((c) => c.id === courseId) ?? courses[0];

  const [moduleId, setModuleId] = useState(course?.modules[0]?.id ?? '');
  const activeMod = course?.modules.find((m) => m.id === moduleId) ?? course?.modules[0];

  const [lessonTitle, setLessonTitle] = useState('');
  const [durationLabel, setDurationLabel] = useState('18:00');
  const [videoUrl, setVideoUrl] = useState<string>(SITE_CONFIG.sampleVideos.intro);
  const [description, setDescription] = useState('');
  const [editingUrls, setEditingUrls] = useState<Record<string, string>>({});

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !activeMod || !lessonTitle.trim()) return;
    courseService.addLesson(course.id, activeMod.id, {
      title: lessonTitle.trim(),
      durationLabel: durationLabel.trim() || '15:00',
      durationMinutes: 15,
      description: description.trim() || 'Lesson added via Admin Lesson Manager.',
      videoUrl: videoUrl.trim() || SITE_CONFIG.sampleVideos.intro,
    });
    refreshCourses();
    setLessonTitle('');
    setDescription('');
    notify('Lesson added', `Added to ${activeMod.code}.`, 'success');
  };

  const handleSaveVideoUrl = (modId: string, lesId: string, currentUrl: string) => {
    if (!course) return;
    const nextUrl = (editingUrls[lesId] ?? currentUrl).trim();
    courseService.updateLesson(course.id, modId, lesId, { videoUrl: nextUrl });
    refreshCourses();
    notify('Video URL updated', 'Lesson stream configuration saved.', 'success');
  };

  const handleDeleteLesson = (modId: string, lesId: string, title: string) => {
    if (!course) return;
    courseService.deleteLesson(course.id, modId, lesId);
    refreshCourses();
    notify('Lesson deleted', title, 'info');
  };

  return (
    <AdminLayout title="Lesson & Video Management">
      <div className="space-y-6">
        <div className="rounded-xl bg-[#131728] border border-white/10 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#7F87A3] mb-1">Course</label>
            <select
              value={course?.id ?? ''}
              onChange={(e) => {
                setCourseId(e.target.value);
                const nextCourse = courses.find((c) => c.id === e.target.value);
                setModuleId(nextCourse?.modules[0]?.id ?? '');
              }}
              className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-[#7F87A3] mb-1">Module</label>
            <select
              value={activeMod?.id ?? ''}
              onChange={(e) => setModuleId(e.target.value)}
              className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            >
              {course?.modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.code} — {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Lesson Form */}
        {activeMod && (
          <form
            onSubmit={handleAddLesson}
            className="rounded-xl bg-[#1A1F35] border border-white/10 p-6 space-y-4"
          >
            <h2 className="font-display text-base font-bold text-white">
              Add Lesson to {activeMod.code}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Lesson title"
                className="sm:col-span-2 rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
              />
              <input
                type="text"
                value={durationLabel}
                onChange={(e) => setDurationLabel(e.target.value)}
                placeholder="Duration (e.g. 20:00)"
                className="rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
              />
            </div>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="MP4 Video URL"
              className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-xs font-mono text-white"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Lesson description..."
              className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Lesson
            </button>
          </form>
        )}

        {/* Lesson List with Inline Video URL Manager */}
        <div className="space-y-3">
          {activeMod?.lessons.map((les) => (
            <div
              key={les.id}
              className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-sm font-bold text-white">{les.title}</h3>
                  <p className="text-xs text-[#7F87A3] mt-0.5">Duration: {les.durationLabel}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteLesson(activeMod.id, les.id, les.title)}
                  aria-label={`Delete ${les.title}`}
                  className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  aria-label={`Video URL for ${les.title}`}
                  value={editingUrls[les.id] ?? les.videoUrl}
                  onChange={(e) =>
                    setEditingUrls((prev) => ({ ...prev, [les.id]: e.target.value }))
                  }
                  className="flex-1 rounded-lg bg-[#0B0D17] border border-white/15 px-3 py-2 text-xs font-mono text-[#B8BED4]"
                />
                <button
                  type="button"
                  onClick={() => handleSaveVideoUrl(activeMod.id, les.id, les.videoUrl)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/20 text-xs font-semibold text-white hover:border-[#A5F51F] cursor-pointer whitespace-nowrap"
                >
                  <Save className="w-3.5 h-3.5 text-[#A5F51F]" /> Update Video URL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
