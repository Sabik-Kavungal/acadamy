import React, { useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useApp } from '../../context/AppContext';
import { adminService } from '../../services/admin.service';
import { courseService } from '../../services/course.service';

export function AdminSettingsPage() {
  const { settings, refreshSettings, refreshCourses, notify } = useApp();
  const [brandName, setBrandName] = useState(settings.brandName);
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);
  const [originalPrice, setOriginalPrice] = useState(settings.flagshipOriginalPrice);
  const [launchPrice, setLaunchPrice] = useState(settings.flagshipLaunchPrice);
  const [offerActive, setOfferActive] = useState(settings.studentLaunchOfferActive);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminService.updateSettings({
      brandName: brandName.trim() || 'AxiomDev.',
      supportEmail: supportEmail.trim(),
      flagshipOriginalPrice: Number(originalPrice),
      flagshipLaunchPrice: Number(launchPrice),
      studentLaunchOfferActive: offerActive,
    });
    const flagship = courseService.getFlagshipCourse();
    if (flagship) {
      courseService.updateCourse(flagship.id, {
        originalPrice: Number(originalPrice),
        launchPrice: Number(launchPrice),
      });
    }
    refreshSettings();
    refreshCourses();
    notify('Platform settings saved', 'Brand & pricing configuration updated locally.', 'success');
  };

  return (
    <AdminLayout title="Platform Settings">
      <div className="max-w-2xl rounded-xl bg-[#1A1F35] border border-white/10 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Academy Configuration</h2>
          <p className="text-xs text-[#7F87A3] mt-0.5">
            Changes update the brand wordmark and contact details across the demo app.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="set-brand" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
              Configurable Brand Name
            </label>
            <input
              id="set-brand"
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            />
          </div>

          <div>
            <label htmlFor="set-email" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
              Support Email
            </label>
            <input
              id="set-email"
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="set-orig" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Flagship Regular Price (₹)
              </label>
              <input
                id="set-orig"
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label htmlFor="set-launch" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                Student Launch Price (₹)
              </label>
              <input
                id="set-launch"
                type="number"
                value={launchPrice}
                onChange={(e) => setLaunchPrice(Number(e.target.value))}
                className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-3.5 py-2.5 text-sm text-white"
              />
            </div>
          </div>

          <label className="inline-flex items-center gap-2.5 text-sm text-[#B8BED4] cursor-pointer">
            <input
              type="checkbox"
              checked={offerActive}
              onChange={(e) => setOfferActive(e.target.checked)}
              className="accent-[#A5F51F]"
            />
            <span>Enable Student Launch Promotional Offer</span>
          </label>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] cursor-pointer"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
