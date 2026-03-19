import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminEmployeeRecords() {
  const navigate = useNavigate();

  const [employees] = useState([
    {
      id: 'EMP001',
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      joinDate: '2023-01-15',
      leaveBalance: { annual: 12, sick: 5, study: 3, unpaid: 0 },
      leaveUsed: { annual: 8, sick: 2, study: 0, unpaid: 0 },
      applications: 3,
    },
    {
      id: 'EMP002',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'HR',
      joinDate: '2022-06-20',
      leaveBalance: { annual: 15, sick: 5, study: 3, unpaid: 0 },
      leaveUsed: { annual: 5, sick: 1, study: 0, unpaid: 0 },
      applications: 2,
    },
    {
      id: 'EMP003',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      department: 'Engineering',
      joinDate: '2023-03-10',
      leaveBalance: { annual: 12, sick: 5, study: 3, unpaid: 0 },
      leaveUsed: { annual: 4, sick: 3, study: 1, unpaid: 0 },
      applications: 4,
    },
    {
      id: 'EMP004',
      name: 'Sarah Williams',
      email: 'sarah.williams@company.com',
      department: 'Finance',
      joinDate: '2021-08-05',
      leaveBalance: { annual: 15, sick: 5, study: 3, unpaid: 0 },
      leaveUsed: { annual: 10, sick: 0, study: 0, unpaid: 0 },
      applications: 5,
    },
    {
      id: 'EMP005',
      name: 'David Brown',
      email: 'david.brown@company.com',
      department: 'Marketing',
      joinDate: '2022-11-12',
      leaveBalance: { annual: 12, sick: 5, study: 3, unpaid: 0 },
      leaveUsed: { annual: 2, sick: 1, study: 0, unpaid: 0 },
      applications: 1,
    },
  ]);

  const [expandedEmployee, setExpandedEmployee] = useState(null);

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
            <button
              onClick={() => navigate('/admin/applications')}
              className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition"
            >
              Applications
            </button>
            <button className="w-full text-left block px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
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
            <h1 className="text-3xl font-black text-slate-900">Employee Records</h1>
            <p className="text-slate-600 mt-2">View detailed leave records for all employees</p>
          </header>

          <div className="space-y-4">
            {employees.map((emp) => (
              <div key={emp.id} className="bg-white rounded-xl shadow-md border border-slate-200">
                <button
                  onClick={() => setExpandedEmployee(expandedEmployee === emp.id ? null : emp.id)}
                  className="w-full p-6 text-left hover:bg-slate-50 transition flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{emp.name}</h3>
                    <p className="text-slate-600 text-sm">{emp.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>Department: {emp.department}</span>
                      <span>Joined: {emp.joinDate}</span>
                    </div>
                  </div>
                  <span className="text-2xl text-slate-400">
                    {expandedEmployee === emp.id ? '−' : '+'}
                  </span>
                </button>

                {expandedEmployee === emp.id && (
                  <div className="border-t border-slate-200 p-6 bg-slate-50">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-slate-900 mb-3">Leave Balance</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Annual Leave:</span>
                            <span className="font-semibold text-slate-900">{emp.leaveBalance.annual} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Sick Leave:</span>
                            <span className="font-semibold text-slate-900">{emp.leaveBalance.sick} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Study Leave:</span>
                            <span className="font-semibold text-slate-900">{emp.leaveBalance.study} days</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 mb-3">Leave Used</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Annual Leave:</span>
                            <span className="font-semibold text-slate-900">{emp.leaveUsed.annual} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Sick Leave:</span>
                            <span className="font-semibold text-slate-900">{emp.leaveUsed.sick} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Study Leave:</span>
                            <span className="font-semibold text-slate-900">{emp.leaveUsed.study} days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded border border-slate-200 text-center">
                        <p className="text-xs text-slate-600">Total Applications</p>
                        <p className="text-2xl font-bold text-slate-900">{emp.applications}</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-slate-200 text-center">
                        <p className="text-xs text-slate-600">Total Days Used</p>
                        <p className="text-2xl font-bold text-slate-900">{emp.leaveUsed.annual + emp.leaveUsed.sick + emp.leaveUsed.study}</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-slate-200 text-center">
                        <p className="text-xs text-slate-600">Remaining Balance</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {emp.leaveBalance.annual + emp.leaveBalance.sick + emp.leaveBalance.study - emp.leaveUsed.annual - emp.leaveUsed.sick - emp.leaveUsed.study}
                        </p>
                      </div>
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
