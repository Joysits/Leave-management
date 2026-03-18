import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [applications] = useState([
    { id: 1, employeeId: 'EMP001', employeeName: 'John Doe', type: 'Annual Leave', start: '2026-03-01', end: '2026-03-05', status: 'Pending', reason: 'Family vacation' },
    { id: 2, employeeId: 'EMP002', employeeName: 'Jane Smith', type: 'Sick Leave', start: '2026-03-10', end: '2026-03-11', status: 'Pending', reason: 'Flu symptoms', document: 'medical_cert.pdf' },
    { id: 3, employeeId: 'EMP003', employeeName: 'Mike Johnson', type: 'Study Leave', start: '2026-04-15', end: '2026-04-17', status: 'Pending', reason: 'Exam preparation', document: 'study_proof.pdf' },
    { id: 4, employeeId: 'EMP001', employeeName: 'John Doe', type: 'Unpaid Leave', start: '2026-05-20', end: '2026-05-22', status: 'Approved', reason: 'Personal' },
  ]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('adminEmail');
    navigate('/');
  };

  const stats = [
    { label: 'Pending Applications', value: '8', color: 'bg-blue-500' },
    { label: 'Approved This Month', value: '12', color: 'bg-green-500' },
    { label: 'Total Employees', value: '45', color: 'bg-purple-500' },
  ];

  const pendingApplications = applications.filter(app => app.status === 'Pending').length;

  return (
    <div className="w-screen min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-screen">
          <div className="p-6 text-xl font-bold border-b border-slate-800">Admin Panel</div>
          <nav className="flex-1 p-4 space-y-2">
            <button className="w-full text-left block px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Dashboard
            </button>
            <button
              onClick={() => navigate('/admin/applications')}
              className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition"
            >
              Applications
            </button>
            <button
              onClick={() => navigate('/admin/employees')}
              className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition"
            >
              Employee Records
            </button>
            <button
              onClick={() => navigate('/admin/reports')}
              className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition"
            >
              Reports
            </button>
          </nav>
          <div className="p-4 border-t border-slate-800">
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-slate-400 hover:text-white transition">
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-black text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage all leave applications and employee records</p>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                <p className="text-slate-600 text-sm font-semibold">{stat.label}</p>
                <h3 className="text-4xl font-black text-slate-900 mt-2">{stat.value}</h3>
                <div className={`h-2 w-full ${stat.color} mt-4 rounded-full opacity-30`}></div>
              </div>
            ))}
          </div>

          {/* Critical Alert */}
          {pendingApplications > 0 && (
            <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-800 font-semibold">
                ⚠️ You have {pendingApplications} pending applications awaiting approval
              </p>
            </div>
          )}

          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Recent Applications</h2>
              <button
                onClick={() => navigate('/admin/applications')}
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Employee</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Type</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Duration</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 5).map((app) => (
                    <tr key={app.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{app.employeeName}</td>
                      <td className="px-6 py-4 text-slate-600">{app.type}</td>
                      <td className="px-6 py-4 text-slate-600 text-xs">{app.start} to {app.end}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
