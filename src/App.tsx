import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/Landing';
import { ScholarshipsPage } from './pages/Scholarships';
import { EligibilityPage } from './pages/Eligibility';
import { DashboardPage } from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fcfbf9] text-slate-900 flex flex-col justify-between antialiased">
        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/scholarships" element={<ScholarshipsPage />} />
              <Route path="/eligibility" element={<EligibilityPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
        </div>

        <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-slate-500 mt-20">
          <p>ScholarPath — Civic Tech Platform. Designed for transparent student scholarship discovery.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}