import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([
    { id: 1, employeeId: 'EMP001', employeeName: 'John Doe', type: 'Annual Leave', start: '2026-03-01', end: '2026-03-05', status: 'Pending', reason: 'Family vacation', submittedDate: '2026-02-20' },
    { id: 2, employeeId: 'EMP002', employeeName: 'Jane Smith', type: 'Sick Leave', start: '2026-03-10', end: '2026-03-11', status: 'Pending', reason: 'Flu symptoms', document: 'medical_cert.pdf', submittedDate: '2026-03-08' },
    { id: 3, employeeId: 'EMP003', employeeName: 'Mike Johnson', type: 'Study Leave', start: '2026-04-15', end: '2026-04-17', status: 'Pending', reason: 'Exam preparation', document: 'study_proof.pdf', submittedDate: '2026-03-15' },
    { id: 4, employeeId: 'EMP004', employeeName: 'Sarah Williams', type: 'Annual Leave', start: '2026-05-20', end: '2026-05-27', status: 'Approved', reason: 'Vacation', submittedDate: '2026-03-18' },
    { id: 5, employeeId: 'EMP005', employeeName: 'David Brown', type: 'Unpaid Leave', start: '2026-06-01', end: '2026-06-03', status: 'Rejected', reason: 'Personal', submittedDate: '2026-03-10' },
  ]);

  const [selectedApp, setSelectedApp] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (id) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: 'Approved' } : app
    ));
    setSelectedApp(null);
  };

  const handleReject = (id) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: 'Rejected', rejectionReason } : app
    ));
    setSelectedApp(null);
    setRejectionReason('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="w-screen min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-screen">
          <div className="p-6 text-xl font-bold border-b border-slate-800">Admin Panel</div>
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition"
            >
              Dashboard
            </button>
            <button className="w-full text-left block px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
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
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 font-semibold"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-black text-slate-900">Leave Applications</h1>
            <p className="text-slate-600 mt-2">Review and manage all leave applications</p>
          </header>

          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{app.employeeName}</h3>
                      <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                        {app.employeeId}
                      </span>
                    </div>
                    <p className="text-slate-600 font-semibold">{app.type}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-slate-500">Duration</p>
                    <p className="text-slate-900 font-semibold">{app.start} to {app.end}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Submitted</p>
                    <p className="text-slate-900 font-semibold">{app.submittedDate}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-slate-500 text-sm">Reason</p>
                  <p className="text-slate-900">{app.reason}</p>
                </div>

                {app.document && (
                  <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded text-sm">
                    📎 Document: <a href="#" className="text-blue-600 hover:underline font-semibold">{app.document}</a>
                  </div>
                )}

                {app.status === 'Pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => setSelectedApp(app.id)}
                      className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                    >
                      ✗ Reject
                    </button>
                  </div>
                )}

                {selectedApp === app.id && app.status === 'Pending' && (
                  <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Rejection Reason
                    </label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded text-sm mb-3"
                      placeholder="Enter reason for rejection..."
                      rows="3"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(app.id)}
                        className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition"
                      >
                        Confirm Rejection
                      </button>
                      <button
                        onClick={() => setSelectedApp(null)}
                        className="flex-1 px-3 py-2 bg-slate-300 hover:bg-slate-400 text-slate-900 font-semibold rounded transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
