import { User, Bell, Search, Edit2 } from 'lucide-react';

export default function Topbar({ user }) {
  const studentName = user.fullName || 'Student';
  
  return (
    <header className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 overflow-hidden border-2 border-white shadow-sm">
            <User className="w-6 h-6" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">Student Dashboard ({studentName})</h1>
            <button className="p-1 text-[#94A3B8] hover:text-indigo-600 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-[#64748B]">B.Tech Computer Science • Batch of 2026</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
          <input type="text" placeholder="Search jobs, events..." className="bg-[#F1F5F9] border-none rounded-xl pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-indigo-500 transition-all outline-none" />
        </div>
        <button className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-xl relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}
