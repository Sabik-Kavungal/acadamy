import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { SITE_CONFIG } from '../config/site';
import { useApp } from '../context/AppContext';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  topic: z.enum(['Course Curriculum', 'Team Training', 'Student Offer', 'Technical Support']),
  message: z.string().min(15, 'Message must be at least 15 characters.'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactPage() {
  const { notify } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: 'Course Curriculum' },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 300));
    setSubmitted(true);
    notify('Inquiry received (Demo)', 'Thank you for reaching out to our team.', 'success');
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
                Contact Us
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Questions About Curriculum or Access?
              </h1>
              <p className="text-sm text-[#B8BED4] mt-3 leading-relaxed">
                Reach out regarding prerequisites, corporate engineering training, or technical
                support.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="rounded-xl bg-[#131728] border border-white/10 p-4 flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#A5F51F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#7F87A3]">Admissions &amp; Support</p>
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="text-sm font-semibold text-white hover:text-[#A5F51F]"
                  >
                    {SITE_CONFIG.supportEmail}
                  </a>
                </div>
              </div>

              <div className="rounded-xl bg-[#131728] border border-white/10 p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A5F51F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#7F87A3]">Academy Operations</p>
                  <p className="text-sm font-semibold text-white">{SITE_CONFIG.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#131728] border border-white/10 p-6 sm:p-8">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#A5F51F]/15 text-[#A5F51F] flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white">Message Sent (Demo)</h2>
                  <p className="text-sm text-[#B8BED4] max-w-md mx-auto">
                    Your inquiry was validated and logged in this frontend prototype.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      {...register('name')}
                      placeholder="Ananya Deshmukh"
                      className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-3 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      {...register('email')}
                      placeholder="you@company.com"
                      className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-3 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                    />
                    {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      id="contact-topic"
                      {...register('topic')}
                      className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#A5F51F]"
                    >
                      <option value="Course Curriculum">Course Curriculum</option>
                      <option value="Student Offer">Student Launch Offer</option>
                      <option value="Team Training">Team Training</option>
                      <option value="Technical Support">Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#B8BED4] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      {...register('message')}
                      placeholder="Tell us about your engineering background and what you want to build..."
                      className="w-full rounded-lg bg-[#0B0D17] border border-white/15 px-4 py-3 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
