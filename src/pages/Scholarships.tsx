import { useState, useMemo } from 'react';
import { Search, ShieldCheck, Bookmark, ExternalLink } from 'lucide-react';
import { INITIAL_SCHOLARSHIPS } from '../data/scholarships';
import type { EducationLevel } from '../types/scholarship';

export function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredScholarships = useMemo(() => {
    return INITIAL_SCHOLARSHIPS.filter(sch => {
      const matchesSearch = sch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            sch.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            sch.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === 'All' || sch.educationLevels.includes(selectedLevel as EducationLevel);
      const matchesCategory = selectedCategory === 'All' || sch.category === selectedCategory;
      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchQuery, selectedLevel, selectedCategory]);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Scholarship Discovery</h1>
          <p className="text-slate-600 mt-1">Explore verified and sample funding opportunities with transparent eligibility criteria.</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, provider, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="All">All Education Levels</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="High School">High School</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="All">All Categories</option>
                <option value="STEM">STEM</option>
                <option value="Need-Based">Need-Based</option>
                <option value="Merit-Based">Merit-Based</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span>Showing <strong>{filteredScholarships.length}</strong> opportunities</span>
        </div>

        {/* Scholarship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScholarships.map(sch => {
            const isSaved = savedIds.includes(sch.id);
            return (
              <div key={sch.id} className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between hover:border-blue-300 transition-all">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                      {sch.verificationStatus}
                    </span>
                    <button
                      onClick={() => toggleSave(sch.id)}
                      className={`p-2 rounded-lg border transition-colors ${isSaved ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-stone-200 text-slate-400 hover:text-slate-600'}`}
                      title="Save scholarship"
                    >
                      <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{sch.name}</h3>
                    <p className="text-sm text-slate-500">{sch.provider}</p>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2">{sch.description}</p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {sch.educationLevels.map(lvl => (
                      <span key={lvl} className="px-2.5 py-1 bg-stone-100 text-slate-700 text-xs rounded-md">
                        {lvl}
                      </span>
                    ))}
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                      {sch.awardCurrency} {sch.awardAmountMin?.toLocaleString()} - {sch.awardAmountMax?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500">Deadline: <strong className="text-slate-700">{sch.applicationDeadline}</strong></span>
                  <a
                    href={sch.officialInformationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
                  >
                    Official Source <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}