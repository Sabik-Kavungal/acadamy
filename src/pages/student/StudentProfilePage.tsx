import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name is required.'),
  phone: z.string().min(8, 'Enter a valid phone number.'),
  title: z.string().min(2, 'Role or headline is required.'),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

export function StudentProfilePage() {
  const { user, updateProfile } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName ?? '',
      phone: user?.phone ?? '',
      title: user?.title ?? '',
      githubUrl: user?.githubUrl ?? '',
      linkedinUrl: user?.linkedinUrl ?? '',
      bio: user?.bio ?? '',
    },
  });

  const onSubmit = async (values: ProfileValues) => {
    await new Promise((r) => setTimeout(r, 200));
    updateProfile(values);
  };

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-2xl rounded-xl bg-[#1A1F35] border border-white/10 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Student Profile</h2>
          <p className="text-xs text-[#7F87A3] mt-0.5">
            Email: <span className="text-[#B8BED4]">{user?.email}</span> · Role:{' '}
            <span className="text-[#A5F51F] uppercase">{user?.role}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="prof-name" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Full Name
              </label>
              <input
                id="prof-name"
                type="text"
                {...register('fullName')}
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A5F51F]"
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="prof-phone" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Phone Number
              </label>
              <input
                id="prof-phone"
                type="tel"
                {...register('phone')}
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A5F51F]"
              />
              {errors.phone && (
                <p className="text-xs text-rose-400 mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="prof-title" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
              Current Engineering Role
            </label>
            <input
              id="prof-title"
              type="text"
              {...register('title')}
              className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A5F51F]"
            />
            {errors.title && (
              <p className="text-xs text-rose-400 mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="prof-gh" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                GitHub URL
              </label>
              <input
                id="prof-gh"
                type="url"
                {...register('githubUrl')}
                placeholder="https://github.com/username"
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
              />
            </div>

            <div>
              <label htmlFor="prof-li" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                LinkedIn URL
              </label>
              <input
                id="prof-li"
                type="url"
                {...register('linkedinUrl')}
                placeholder="https://linkedin.com/in/username"
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="prof-bio" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
              Learning Goals &amp; Bio
            </label>
            <textarea
              id="prof-bio"
              rows={3}
              {...register('bio')}
              className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#A5F51F]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
