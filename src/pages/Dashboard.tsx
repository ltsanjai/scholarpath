import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckSquare, 
  Clock, 
  ExternalLink, 
  PlusCircle, 
  Trash2, 
  UserCheck 
} from 'lucide-react';
import { INITIAL_SCHOLARSHIPS } from '../data/scholarships';
import type { ApplicationStatus, TrackerItem } from '../types/scholarship';

const STATUS_OPTIONS: ApplicationStatus[] = [
  'Interested',
  'Preparing documents',
  'Ready to apply',
  'Applied',
  'Awaiting response',
  'Awarded',
  'Not selected',
];

export function DashboardPage() {
  const [trackerItems, setTrackerItems] = useState<TrackerItem[]>(() => {
    const saved = localStorage.getItem('scholarpath_tracker');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      {
        scholarshipId: 'demo-1',
        status: 'Preparing documents',
        notes: 'Need to get Income Certificate verified by local authority.',
        updatedAt: '2026-10-20',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('scholarpath_tracker', JSON.stringify(trackerItems));
  }, [trackerItems]);

  const updateStatus = (scholarshipId: string, status: ApplicationStatus) => {
    setTrackerItems(prev => prev.map(item => 
      item.scholarshipId === scholarshipId 
        ? { ...item, status, updatedAt: new Date().toISOString().split('T')[0] } 
        : item
    ));
  };

  const updateNotes = (scholarshipId: string, notes: string) => {
    setTrackerItems(prev => prev.map(item => 
      item.scholarshipId === scholarshipId 
        ? { ...item, notes, updatedAt: new Date().toISOString().split('T')[0] } 
        : item
    ));
  };

  const removeFromTracker = (scholarshipId: string) => {
    setTrackerItems(prev => prev.filter(item => item.scholarshipId !== scholarshipId));
  };

  const addToTracker = (scholarshipId: string) => {
    if (trackerItems.some(item => item.scholarshipId === scholarshipId)) return;
    const newItem: TrackerItem = {
      scholarshipId,
      status: 'Interested',
      notes: '',
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setTrackerItems(prev => [...prev, newItem]);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Student Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">
              Track your saved funding opportunities, manage application progress, and review pending requirements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/scholarships"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs"
            >
              <PlusCircle className="h-4 w-4" /> Add Scholarship
            </Link>
          </div>
        </div>

        {/* Guest Mode Data Warning Banner */}
        <div className="p-4 bg-stone-100 border border-stone-200 rounded-2xl text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span><strong>Guest Mode Active:</strong> Your tracker data is saved locally in your browser cache.</span>
          </div>
          <button
            onClick={() => {
              if (confirm('Reset demo tracker data?')) {
                localStorage.removeItem('scholarpath_tracker');
                setTrackerItems([]);
              }
            }}
            className="text-stone-500 hover:text-rose-600 underline text-[11px]"
          >
            Reset Demo Data
          </button>
        </div>

        {/* Application Tracker Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-blue-600" />
            Application Tracker ({trackerItems.length})
          </h2>

          {trackerItems.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-3">
              <Clock className="h-8 w-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No scholarships currently in your tracker.</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore available scholarships and click "Add to Tracker" to manage your deadlines and progress.
              </p>
              <Link
                to="/scholarships"
                className="inline-block mt-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-medium rounded-lg"
              >
                Find Scholarships
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {trackerItems.map((item) => {
                const scholarship = INITIAL_SCHOLARSHIPS.find(s => s.id === item.scholarshipId);
                if (!scholarship) return null;

                return (
                  <div key={item.scholarshipId} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                      <div>
                        <h3 className="font-bold text-base text-slate-900">{scholarship.name}</h3>
                        <p className="text-xs text-slate-500">{scholarship.provider}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.scholarshipId, e.target.value as ApplicationStatus)}
                          className="px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-50 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>

                        <button
                          onClick={() => removeFromTracker(item.scholarshipId)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Remove from tracker"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-semibold text-slate-700 block mb-1">Required Documents:</span>
                        <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                          {scholarship.requiredDocuments.map((doc, i) => (
                            <li key={i}>{doc}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Private Notes:</label>
                        <textarea
                          value={item.notes}
                          onChange={(e) => updateNotes(item.scholarshipId, e.target.value)}
                          placeholder="Add personal reminders or missing document tracking..."
                          rows={2}
                          className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-stone-100">
                      <span>Deadline: <strong className="text-slate-700">{scholarship.applicationDeadline}</strong></span>
                      <a
                        href={scholarship.officialApplicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
                      >
                        Official Application Portal <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Untracked Quick Add Section */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
          <h3 className="font-bold text-sm text-slate-900">Explore Additional Demo Scholarships</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INITIAL_SCHOLARSHIPS.map((sch) => {
              const isTracked = trackerItems.some(t => t.scholarshipId === sch.id);
              return (
                <div key={sch.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-medium text-slate-800">{sch.name}</p>
                    <p className="text-slate-500">{sch.provider}</p>
                  </div>
                  <button
                    onClick={() => addToTracker(sch.id)}
                    disabled={isTracked}
                    className={`px-3 py-1 rounded-lg font-medium ${
                      isTracked 
                        ? 'bg-stone-200 text-slate-500 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isTracked ? 'Tracked' : 'Track'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}