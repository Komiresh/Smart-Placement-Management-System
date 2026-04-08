import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import JobDrives from '../components/JobDrives';
import AppliedJobs from '../components/AppliedJobs';
import { Calendar, Bell } from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Your Dashboard');
  const [user, setUser] = useState({});
  const [activeAppsCount, setActiveAppsCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    const urlUser = params.get('user');

    if (urlToken) {
      localStorage.setItem('token', urlToken);
      if (urlUser) localStorage.setItem('user', decodeURIComponent(urlUser));
      // Clean up the URL so tokens don't remain visible
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'http://localhost:3000/index1.html';
      return;
    }

    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userObj);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = 'http://localhost:3000/index1.html';
        return;
      }
      const res = await fetch('/api/student/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setActiveAppsCount(data.activeApplications || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/student/apply/${jobId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Applied successfully');
        fetchData(); // update count
        setRefreshTrigger(prev => prev + 1); // refresh applied jobs view
      } else {
        alert(data.error || 'Failed to apply');
      }
    } catch (err) {
      console.error(err);
      alert('Error applying');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC] text-[#0F172A]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} activeAppsCount={activeAppsCount} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar user={user} />
        
        {activeTab === 'Your Dashboard' && (
          <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <JobDrives onApply={handleApply} />
              
              <section className="space-y-4">
                <div className="flex flex-col gap-3">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    Upcoming Events
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                  <div className="p-4 text-sm text-[#64748B]">No upcoming events.</div>
                </div>
              </section>
            </div>
            
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Bell className="w-5 h-5 text-indigo-600" />
                  Notice Board
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-4 text-sm text-[#64748B]">No new notices.</div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'Applied Jobs' && (
          <AppliedJobs refreshTrigger={refreshTrigger} />
        )}

        {(activeTab === 'Job Postings' || activeTab === 'Schedule') && (
          <div className="p-8 flex items-center justify-center text-[#64748B] flex-1">
            {activeTab} module is under development.
          </div>
        )}
      </main>
    </div>
  );
}
