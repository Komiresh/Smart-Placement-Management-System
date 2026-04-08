import { useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';

export default function AppliedJobs({ refreshTrigger }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/student/applications', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => setApps(data))
    .catch(console.error);
  }, [refreshTrigger]);

  return (
    <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardCheck className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-[#0F172A]">Your Applied Jobs</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {!apps || apps.length === 0 ? (
          <div className="text-[#64748B] p-4 text-sm col-span-full">You have not applied to any jobs yet.</div>
        ) : (
          apps.map(app => (
            <div key={app.id} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col items-start gap-4">
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
                {app.status}
              </span>
              <div>
                <h3 className="font-bold text-lg text-[#0F172A]">{app.Job?.title || 'Job Title'}</h3>
                <p className="text-sm text-[#64748B] font-medium mt-1">{app.Job?.Recruiter?.company || 'Company'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
