import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  RefreshCw, 
  ExternalLink 
} from 'lucide-react';
import { INITIAL_SCHOLARSHIPS } from '../data/scholarships';
import { evaluateEligibility } from '../utils/matchingEngine';
import type { StudentProfile, AssessmentResult } from '../utils/matchingEngine';

export function EligibilityPage() {
  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<StudentProfile>({
    educationLevel: 'Undergraduate',
    annualFamilyIncome: 350000,
    academicScore: 88,
    stateRegion: 'All States',
  });
  const [results, setResults] = useState<AssessmentResult[] | null>(null);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const evaluated = INITIAL_SCHOLARSHIPS.map(sch => evaluateEligibility(profile, sch));
    setResults(evaluated);
    setStep(3); // Results step
  };

  const handleReset = () => {
    setStep(1);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            Deterministic Eligibility Screening
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Eligibility Assistant</h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Answer a few simple questions to compare your academic profile against scholarship criteria without making unsupported guarantees.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between items-center max-w-md mx-auto border-b border-stone-200 pb-4 text-xs font-medium">
          <span className={`px-3 py-1 rounded-full ${step === 1 ? 'bg-blue-600 text-white' : 'bg-stone-100 text-slate-600'}`}>
            1. Student Profile
          </span>
          <span className={`px-3 py-1 rounded-full ${step === 2 ? 'bg-blue-600 text-white' : 'bg-stone-100 text-slate-600'}`}>
            2. Review Answers
          </span>
          <span className={`px-3 py-1 rounded-full ${step === 3 ? 'bg-blue-600 text-white' : 'bg-stone-100 text-slate-600'}`}>
            3. Results & Rules
          </span>
        </div>

        {/* STEP 1: Questionnaire */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Step 1: Basic Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Education Level</label>
                <select
                  value={profile.educationLevel}
                  onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Academic Percentage Score (%)</label>
                <input
                  type="number"
                  value={profile.academicScore || ''}
                  onChange={(e) => setProfile({ ...profile, academicScore: Number(e.target.value) })}
                  placeholder="e.g. 85"
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Annual Family Income (₹)</label>
                <input
                  type="number"
                  value={profile.annualFamilyIncome || ''}
                  onChange={(e) => setProfile({ ...profile, annualFamilyIncome: Number(e.target.value) })}
                  placeholder="e.g. 400000"
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-stone-100">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl flex items-center gap-2 shadow-2xs"
              >
                Review Answers <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Review Answers */}
        {step === 2 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Step 2: Confirm Details</h2>
            
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Education Level:</span>
                <span className="font-semibold text-slate-800">{profile.educationLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Academic Score:</span>
                <span className="font-semibold text-slate-800">{profile.academicScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Family Income:</span>
                <span className="font-semibold text-slate-800">₹{profile.annualFamilyIncome?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 border border-stone-300 hover:bg-stone-50 text-slate-700 font-medium text-sm rounded-xl flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Edit Answers
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl flex items-center gap-2 shadow-2xs"
              >
                Evaluate Matches <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Assessment Results */}
        {step === 3 && results && (
          <div className="space-y-6">
            
            {/* Legal / Informational Disclaimer */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <p className="font-bold">Disclaimer:</p>
              <p>
                This screening tool provides rule-based comparison using available criteria and your answers. 
                It does not determine official eligibility or guarantee award selection. Always verify requirements directly with the provider.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Assessment Breakdown ({results.length})</h2>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Restart Assessment
              </button>
            </div>

            {results.map((res) => {
              const isMatch = res.overallCategory === 'Likely Match';
              const isConflict = res.overallCategory === 'Known Criteria Conflict';

              return (
                <div key={res.scholarship.id} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{res.scholarship.name}</h3>
                      <p className="text-xs text-slate-500">{res.scholarship.provider}</p>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      isMatch ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      isConflict ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                      'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {isMatch && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                      {isConflict && <XCircle className="h-3.5 w-3.5 text-rose-600" />}
                      {!isMatch && !isConflict && <AlertCircle className="h-3.5 w-3.5 text-amber-600" />}
                      {res.overallCategory}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{res.summaryExplanation}</p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-slate-700">Detailed Rule Evaluation:</span>
                    <div className="space-y-2">
                      {res.criteriaAssessments.map((crit, idx) => (
                        <div key={idx} className="p-3 bg-stone-50 rounded-lg text-xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-800">{crit.description}</span>
                            <span className={`font-medium ${
                              crit.status === 'Match' ? 'text-emerald-700' :
                              crit.status === 'Conflict' ? 'text-rose-700' : 'text-amber-700'
                            }`}>
                              {crit.status}
                            </span>
                          </div>
                          <p className="text-slate-600">{crit.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <a
                      href={res.scholarship.officialInformationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
                    >
                      Official Source Guidelines <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}