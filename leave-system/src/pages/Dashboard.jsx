import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplyLeaveModal from '../components/ApplyLeaveModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isApplyLeaveOpen, setIsApplyLeaveOpen] = useState(false);

  // Personalized greeting logic using Admin-defined data or Email
  const [greeting] = useState(() => {
    const adminSetFirstName = localStorage.getItem('userFirstName');
    const adminSetEmail = localStorage.getItem('userEmail') || "";
    let displayName = "Employee";

    if (adminSetFirstName && adminSetFirstName !== "null") {
      displayName = adminSetFirstName;
    } else if (adminSetEmail) {
      displayName = adminSetEmail.split('@')[0].split('.')[0];
    }
    
    const finalName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    const hasVisited = localStorage.getItem('hasVisitedBefore');

    if (!hasVisited) {
      localStorage.setItem('hasVisitedBefore', 'true');
      return `Hello, ${finalName}`;
    }
    return `Welcome again, ${finalName}`;
  });

  // Leave history data with Admin comments
  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 1, 
      type: 'Annual Leave', 
      start: '2026-03-01', 
      end: '2026-03-05', 
      status: 'Approved', 
      reason: 'Family vacation',
      adminComment: 'Enjoy your time off!' 
    },
    { 
      id: 2, 
      type: 'Sick Leave', 
      start: '2026-03-10', 
      end: '2026-03-11', 
      status: 'Pending', 
      reason: 'Flu symptoms',
      adminComment: '-' 
    },
    { 
      id: 3, 
      type: 'Study Leave', 
      start: '2026-04-15', 
      end: '2026-04-17', 
      status: 'Rejected', 
      reason: 'Exam preparation',
      adminComment: 'Please attach your official exam timetable for verification.' 
    },
  ]);

  const handleLogout = () => navigate('/login');

  const handleApplyLeave = (formData) => {
    const newRequest = {
      id: leaveRequests.length + 1,
      type: formData.leaveType,
      start: formData.startDate,
      end: formData.endDate,
      status: 'Pending',
      reason: formData.reason,
      adminComment: '-' 
    };
    setLeaveRequests([...leaveRequests, newRequest]);
    setIsApplyLeaveOpen(false);
  };

  const stats = [
    { label: 'Annual Leave', value: '12 Days', color: 'bg-blue-500' },
    { label: 'Sick Leave', value: '5 Days', color: 'bg-emerald-500' },
    { label: 'Study Leave', value: '3 Days', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-slate-800 tracking-tight">LeaveSystem</div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left block px-4 py-2 bg-blue-600 rounded-lg font-medium">Dashboard</button>
          <button onClick={() => navigate('/my-requests')} className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition text-slate-300">My Requests</button>
          {/* Calendar link returned here */}
          <button onClick={() => navigate('/calendar')} className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition text-slate-300">Calendar</button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-slate-400 hover:text-white transition">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{greeting}</h1>
            <p className="text-slate-500 mt-1">Track your status and view admin feedback.</p>
          </div>
          <button 
            onClick={() => setIsApplyLeaveOpen(true)}
            className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 active:scale-95"
          >
            <span className="text-xl">+</span> Request Leave
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</h3>
              <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${stat.color} w-2/3 rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave History Table with Admin Comments */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
            <h2 className="font-bold text-slate-800 text-lg">Leave History & Admin Remarks</h2>
            <button onClick={() => navigate('/my-requests')} className="text-blue-600 text-sm font-bold hover:underline">View Full History</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                  <th className="px-6 py-4 font-bold">Type & Dates</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Your Reason</th>
                  <th className="px-6 py-4 font-bold text-blue-600">Admin Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaveRequests.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-semibold text-slate-900">{item.type}</div>
                      <div className="text-slate-400 text-xs">{item.start} — {item.end}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-600 text-sm max-w-xs truncate">
                      {item.reason}
                    </td>
                    <td className="px-6 py-5">
                      {item.status !== 'Pending' ? (
                        <div className={`text-sm p-3 rounded-lg border leading-relaxed ${
                          item.status === 'Rejected' 
                            ? 'bg-red-50 border-red-100 text-red-900' 
                            : 'bg-slate-50 border-slate-100 text-slate-700'
                        }`}>
                          <span className="font-bold block text-[10px] uppercase opacity-60 mb-1">Admin Response:</span>
                          {item.adminComment}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Pending review...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <ApplyLeaveModal 
        isOpen={isApplyLeaveOpen}
        onClose={() => setIsApplyLeaveOpen(false)}
        onSubmit={handleApplyLeave}
      />
    </div>
  );
}