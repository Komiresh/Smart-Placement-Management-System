import { useEffect, useState } from 'react';
import { Briefcase, MapPin, DollarSign, Calendar as CalIcon } from 'lucide-react';

export default function JobDrives({ onApply }) {
  const [drives, setDrives] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/student/jobs', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => {
      setDrives(data.map(j => ({
        id: j.id,
        company: j.Recruiter ? j.Recruiter.company : j.company,
        role: j.title || j.role,
        package: j.package,
        deadline: new Date(j.deadline).toLocaleDateString(),
        location: j.location,
        logo: (j.Recruiter && j.Recruiter.company) ? j.Recruiter.company.substring(0,2).toUpperCase() : 'Co'
      })));
    })
    .catch(console.error);
  }, []);

  return (
    <section className="xl:col-span-2 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          Active Placement Drives
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {drives.length === 0 ? (
          <div className="p-4 text-sm text-[#64748B]">No active placement drives available.</div>
        ) : (
          drives.map(drive => (
            <div key={drive.id} className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-lg font-black text-[#0F172A] shadow-sm">
                    {drive.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] leading-tight">{drive.company}</h3>
                    <p className="text-sm font-medium text-indigo-600 mt-0.5">{drive.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2.5 mb-5">
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <MapPin className="w-4 h-4" /><span>{drive.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <DollarSign className="w-4 h-4" /><span>{drive.package}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CalIcon className="w-4 h-4 text-red-500" />
                  <span className="text-red-600 font-medium tracking-tight">Apply by {drive.deadline}</span>
                </div>
              </div>
              <button 
                onClick={() => onApply(drive.id)}
                className="w-full py-2.5 rounded-xl font-bold bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200"
              >
                Apply Now
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
