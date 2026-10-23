import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Search, UserCheck, Bookmark } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-stone-200 bg-white sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-blue-600 text-white rounded-lg group-hover:bg-blue-700 transition-colors">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none tracking-tight text-slate-900">ScholarPath</span>
            <span className="text-[10px] text-slate-500 font-medium">Public Discovery Portal</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-600">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md transition-colors ${
              isActive('/') ? 'bg-stone-100 text-blue-700 font-semibold' : 'hover:text-slate-900 hover:bg-stone-50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/scholarships"
            className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 ${
              isActive('/scholarships') ? 'bg-stone-100 text-blue-700 font-semibold' : 'hover:text-slate-900 hover:bg-stone-50'
            }`}
          >
            <Search className="h-4 w-4" /> Find Scholarships
          </Link>
          <Link
            to="/eligibility"
            className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 ${
              isActive('/eligibility') ? 'bg-stone-100 text-blue-700 font-semibold' : 'hover:text-slate-900 hover:bg-stone-50'
            }`}
          >
            <UserCheck className="h-4 w-4" /> Eligibility Checker
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 ${
              isActive('/dashboard') ? 'bg-stone-100 text-blue-700 font-semibold' : 'hover:text-slate-900 hover:bg-stone-50'
            }`}
          >
            <Bookmark className="h-4 w-4" /> Dashboard
          </Link>
        </nav>

        {/* Guest Mode Indicator / CTA */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 border border-stone-200 text-slate-600 text-xs rounded-full">
            <UserCheck className="h-3.5 w-3.5 text-emerald-600" /> Guest Mode
          </span>
          <Link
            to="/scholarships"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all shadow-xs"
          >
            Explore Grants
          </Link>
        </div>

      </div>
    </header>
  );
}