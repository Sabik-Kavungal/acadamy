import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import { courseService } from '../../services/course.service';
import type { CourseCategory, CourseStatus, DifficultyLevel } from '../../types';

export function AdminCoursesPage() {
  const { courses, refreshCourses, notify } = useApp();
  const [showCreate, setShowCreate] = useState(false);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CourseCategory>('AI Engineering');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [originalPrice, setOriginalPrice] = useState(3999);
  const [launchPrice, setLaunchPrice] = useState(2999);
  const [status, setStatus] = useState<CourseStatus>('available');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    courseService.createCourse({
      title: title.trim(),
      subtitle: subtitle.trim() || 'Practical engineering track',
      description: description.trim() || 'Created via Admin Course Manager.',
      category,
      difficulty,
      originalPrice: Number(originalPrice),
      launchPrice: Number(launchPrice),
      status,
      technologies: ['TypeScript', 'Python', 'Docker'],
    });
    refreshCourses();
    setShowCreate(false);
    setTitle('');
    setSubtitle('');
    setDescription('');
    notify('Course created (Demo)', 'Catalog updated across the application.', 'success');
  };

  const handleToggleStatus = (courseId: string, current: CourseStatus) => {
    const nextStatus: CourseStatus = current === 'available' ? 'coming_soon' : 'available';
    courseService.updateCourse(courseId, {
      status: nextStatus,
      offerLabel: nextStatus === 'available' ? 'LAUNCH OFFER' : 'Upcoming Release',
    });
    refreshCourses();
    notify('Course status updated', `Set to ${nextStatus.replace('_', ' ')}.`, 'info');
  };

  const handleDelete = (courseId: string, courseTitle: string) => {
    if (courses.length <= 1) {
      notify('Cannot delete last course', 'Keep at least one course in the catalog.', 'error');
      return;
    }
    courseService.deleteCourse(courseId);
    refreshCourses();
    notify('Course removed', courseTitle, 'info');
  };

  return (
    <AdminLayout title="Course Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-[#B8BED4]">
            Create courses, toggle availability status, or remove draft tracks in local demo state.
          </p>
          <button
            type="button"
            onClick={() => setShowCreate((s) => !s)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-xs hover:bg-[#93E012] cursor-pointer self-start"
          >
            <Plus className="w-4 h-4" /> New Course
          </button>
        </div>

        {showCreate && (
          <form
            onSubmit={handleCreate}
            className="rounded-xl bg-[#131728] border border-white/15 p-6 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">Add New Course (Demo)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#B8BED4] mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed AI Systems"
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-[#B8BED4] mb-1">Subtitle</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Short value statement"
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-[#B8BED4] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CourseCategory)}
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                >
                  <option value="AI Engineering">AI Engineering</option>
                  <option value="Mobile Engineering">Mobile Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#B8BED4] mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#B8BED4] mb-1">Regular Price (₹)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-[#B8BED4] mb-1">Launch Price (₹)</label>
                <input
                  type="number"
                  value={launchPrice}
                  onChange={(e) => setLaunchPrice(Number(e.target.value))}
                  className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#B8BED4] mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2 text-sm text-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CourseStatus)}
                className="rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2 text-xs text-white"
              >
                <option value="available">Available Now</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold cursor-pointer"
              >
                Save Course
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg border border-white/15 text-xs text-[#B8BED4] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="rounded-xl bg-[#1A1F35] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#131728] text-[#7F87A3]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Course</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Modules</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Launch Price</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-white">{c.title}</p>
                      <p className="text-[11px] text-[#7F87A3]">{c.difficulty}</p>
                    </td>
                    <td className="px-5 py-3.5 text-[#B8BED4]">{c.category}</td>
                    <td className="px-5 py-3.5 font-mono tabular-nums text-[#B8BED4]">
                      {c.modules.length}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono tabular-nums text-white">
                      ₹{c.launchPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(c.id, c.status)}
                        className={`font-semibold cursor-pointer hover:underline ${
                          c.status === 'available' ? 'text-[#A5F51F]' : 'text-[#7F87A3]'
                        }`}
                      >
                        {c.status === 'available' ? 'Available' : 'Coming Soon'}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(c.id, c.title)}
                        aria-label={`Delete ${c.title}`}
                        className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
