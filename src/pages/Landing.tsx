import { Link } from 'react-router-dom';
import { Search, ShieldCheck, CheckCircle2, BookOpen, Lock } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="space-y-16 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200/60 shadow-2xs">
          <ShieldCheck className="h-4 w-4 text-blue-600" />
          Transparent & Non-Misleading Eligibility Portal
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
          Your next opportunity <br /> starts here.
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          ScholarPath helps students discover funding opportunities, understand exact eligibility criteria with explainable rules, and apply with confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          <Link
            to="/scholarships"
            className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" /> Find My Scholarships
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg text-slate-900">Verified & Explicit Sources</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every scholarship displays source-verification metadata, official application URLs, and explicit requirement dates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg text-slate-900">Deterministic Matching</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            No vague AI guesses. Rule-based evaluation separates matches, conflicts, and missing information with plain-language reasons.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg text-slate-900">Privacy First</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Full guest access support without mandatory account registration. We never ask for Aadhaar numbers, passwords, or bank details.
          </p>
        </div>
      </section>

    </div>
  );
}