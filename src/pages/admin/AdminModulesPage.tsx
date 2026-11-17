import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import { courseService } from '../../services/course.service';

export function AdminModulesPage() {
  const { courses, refreshCourses, notify } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id ?? '');
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const course = courses.find((c) => c.id === selectedCourseId) ?? courses[0];

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course || !title.trim()) return;
    courseService.addModule(course.id, {
      code: code.trim() || `MODULE 0${course.modules.length + 1}`,
      title: title.trim(),
      summary: summary.trim() || 'New module summary.',
    });
    refreshCourses();
    setCode('');
    setTitle('');
    setSummary('');
    notify('Module added', `Added to ${course.title}.`, 'success');
  };

  const handleDeleteModule = (modId: string, modTitle: string) => {
    if (!course) return;
    courseService.deleteModule(course.id, modId);
    refreshCourses();
    notify('Module removed', modTitle, 'info');
  };

  return (
    <AdminLayout title="Module Management">
      <div className="space-y-6">
        <div className="rounded-xl bg-[#131728] border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="w-full sm:max-w-md">
            <label htmlFor="mod-course-select" className="block text-xs text-[#7F87A3] mb-1">
              Select Course
            </label>
            <select
              id="mod-course-select"
              value={course?.id ?? ''}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-[#B8BED4] tabular-nums">
            {course?.modules.length ?? 0} Modules configured
          </p>
        </div>

        {/* Add Module Form */}
        <form
          onSubmit={handleAddModule}
          className="rounded-xl bg-[#1A1F35] border border-white/10 p-6 space-y-4"
        >
          <h2 className="font-display text-base font-bold text-white">Add Curriculum Module</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`MODULE 0${(course?.modules.length ?? 0) + 1}`}
              className="rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Module Title"
              className="sm:col-span-2 rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            />
          </div>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Brief module summary..."
            className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Module
          </button>
        </form>

        {/* Modules List */}
        <div className="space-y-3">
          {course?.modules.map((mod) => (
            <div
              key={mod.id}
              className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="font-mono text-xs text-[#A5F51F]">{mod.code}</p>
                <h3 className="font-display text-base font-bold text-white">{mod.title}</h3>
                <p className="text-xs text-[#B8BED4]">{mod.summary}</p>
                <p className="text-[11px] font-mono text-[#7F87A3] pt-1">
                  {mod.lessons.length} lessons attached
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteModule(mod.id, mod.title)}
                aria-label={`Delete ${mod.title}`}
                className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
