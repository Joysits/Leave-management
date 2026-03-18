import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplyLeaveModal from '../components/ApplyLeaveModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isApplyLeaveOpen, setIsApplyLeaveOpen] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, type: 'Annual Leave', start: '2026-03-01', end: '2026-03-05', status: 'Approved', reason: 'Family vacation' },
    { id: 2, type: 'Sick Leave', start: '2026-03-10', end: '2026-03-11', status: 'Pending', reason: 'Flu symptoms' },
    { id: 3, type: 'Study Leave', start: '2026-04-15', end: '2026-04-17', status: 'Rejected', reason: 'Exam preparation' },
  ]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleApplyLeave = (formData) => {
    const newRequest = {
      id: leaveRequests.length + 1,
      type: formData.leaveType,
      start: formData.startDate,
      end: formData.endDate,
      status: 'Pending',
      reason: formData.reason,
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
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-slate-800">LeaveSystem</div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left block px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">Dashboard</button>
          <button onClick={() => navigate('/my-requests')} className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition">My Requests</button>
          <button onClick={() => navigate('/calendar')} className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition">Calendar</button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-slate-400 hover:text-white transition">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, Employee</h1>
            <p className="text-slate-500">Track and manage your leave applications.</p>
          </div>
          <button 
            onClick={() => setIsApplyLeaveOpen(true)}
            className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2"
          >
            <span>+</span> Request Leave
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              <div className={`h-1.5 w-full ${stat.color} mt-4 rounded-full opacity-20`}></div>
            </div>
          ))}
        </div>

        {/* Leave History Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Recent Leave History</h2>
            <button 
              onClick={() => navigate('/my-requests')}
              className="text-blue-600 text-sm font-semibold hover:underline transition-colors"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Leave Type</th>
                  <th className="px-6 py-4 font-semibold">Duration</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaveRequests.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.type}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {item.start} to {item.end}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm italic">
                      "{item.reason}"
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Apply Leave Modal */}
      <ApplyLeaveModal 
        isOpen={isApplyLeaveOpen}
        onClose={() => setIsApplyLeaveOpen(false)}
        onSubmit={handleApplyLeave}
      />
    </div>
  );
}