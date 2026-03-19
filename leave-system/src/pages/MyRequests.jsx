import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyRequests() {
  const navigate = useNavigate();
  const [requests] = useState([
    { id: 1, type: 'Annual Leave', start: '2026-03-01', end: '2026-03-05', status: 'Approved', reason: 'Family vacation', submittedOn: '2026-02-20' },
    { id: 2, type: 'Sick Leave', start: '2026-03-10', end: '2026-03-11', status: 'Pending', reason: 'Flu symptoms', submittedOn: '2026-03-08' },
    { id: 3, type: 'Study Leave', start: '2026-04-15', end: '2026-04-17', status: 'Rejected', reason: 'Exam preparation', submittedOn: '2026-03-15' },
    { id: 4, type: 'Annual Leave', start: '2026-05-20', end: '2026-05-27', status: 'Pending', reason: 'Summer vacation', submittedOn: '2026-03-18' },
  ]);

  return (
    <div className="w-screen min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-6 sticky top-0">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
        >
          <span>← Back to Dashboard</span>
        </button>
        <h1 className="text-3xl font-black text-slate-900">My Leave Requests</h1>
        <p className="text-slate-600 mt-2">View all your leave requests and their statuses</p>
      </header>

      {/* Content */}
      <main className="p-8">
        <div className="max-w-5xl mx-auto space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl shadow p-6 border border-slate-200">
              <div className="grid grid-cols-3 gap-4 items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{request.type}</h3>
                  <p className="text-slate-600 text-sm">{request.start} to {request.end}</p>
                  <p className="text-slate-500 text-sm mt-2">Reason: {request.reason}</p>
                  <p className="text-slate-400 text-xs mt-1">Submitted: {request.submittedOn}</p>
                </div>
                <div></div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                    request.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {request.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
