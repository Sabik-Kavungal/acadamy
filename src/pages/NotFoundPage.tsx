import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-5">
          <p className="font-mono text-sm font-bold text-[#A5F51F]">404 · PAGE NOT FOUND</p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            This Route Does Not Exist
          </h1>
          <p className="text-sm text-[#B8BED4]">
            The page or lesson link you followed could not be found. Return to the homepage or
            explore our flagship engineering program.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#A5F51F] px-5 py-3 text-sm font-bold text-[#0B0D17] hover:bg-[#93E012]"
            >
              <ArrowLeft className="w-4 h-4" /> Back Home
            </Link>
            <Link
              to="/courses"
              className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
