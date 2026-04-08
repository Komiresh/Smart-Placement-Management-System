import { LayoutDashboard, Briefcase, ClipboardCheck, Calendar, LogOut } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, activeAppsCount }) {
  const tabs = [
    { name: 'Your Dashboard', icon: LayoutDashboard },
    { name: 'Job Postings', icon: Briefcase },
    { name: 'Applied Jobs', icon: ClipboardCheck },
    { name: 'Schedule', icon: Calendar },
  ];

  const signOut = () => {
    localStorage.clear();
    window.location.href = 'http://localhost:3000/index1.html';
  };

  return (
    <aside className="w-full md:w-64 bg-white border-r border-[#E2E8F0] flex flex-col sticky top-0 h-auto md:h-screen z-20">
      <div className="p-6 border-b border-[#E2E8F0] flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
        <span className="font-bold text-xl tracking-tight">SmartPlacement</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#E2E8F0]">
        <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50 font-semibold mb-4">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
        <div className="bg-[#F1F5F9] rounded-2xl p-4">
          <p className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Placement Status</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Active Applications</span>
            <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">{activeAppsCount}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
