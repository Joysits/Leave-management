import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminReports() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('summary');

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/');
  };

  const summaryReport = {
    totalEmployees: 45,
    totalApplications: 234,
    approvedApplications: 189,
    rejectedApplications: 23,
    pendingApplications: 22,
    avgLeaveDaysPerEmployee: 8.2,
    mostUsedLeaveType: 'Annual Leave',
  };

  const departmentStats = [
    { department: 'Engineering', employees: 15, approvedLeave: 52, pendingLeave: 5 },
    { department: 'HR', employees: 8, approvedLeave: 18, pendingLeave: 2 },
    { department: 'Finance', employees: 10, approvedLeave: 28, pendingLeave: 3 },
    { department: 'Marketing', employees: 7, approvedLeave: 15, pendingLeave: 1 },
    { department: 'Operations', employees: 5, approvedLeave: 10, pendingLeave: 1 },
  ];

  const monthlyStats = [
    { month: 'January', approved: 15, rejected: 2, pending: 3 },
    { month: 'February', approved: 18, rejected: 1, pending: 2 },
    { month: 'March', approved: 12, rejected: 3, pending: 8 },
  ];

  const leaveTypeStats = [
    { type: 'Annual Leave', used: 134, approved: 142, pending: 8 },
    { type: 'Sick Leave', used: 45, approved: 48, pending: 5 },
    { type: 'Study Leave', used: 23, approved: 25, pending: 2 },
    { type: 'Unpaid Leave', used: 12, approved: 15, pending: 7 },
  ];

  const generatePDF = () => {
    alert('PDF report generated successfully! (Demo)');
  };

  const generateExcel = () => {
    alert('Excel report generated successfully! (Demo)');
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
            <button
              onClick={() => navigate('/admin/employees')}
              className="w-full text-left block px-4 py-2 hover:bg-slate-800 rounded-lg transition"
            >
              Employee Records
            </button>
            <button className="w-full text-left block px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
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
            <h1 className="text-3xl font-black text-slate-900">Reports</h1>
            <p className="text-slate-600 mt-2">Generate and view leave management reports</p>
          </header>

          {/* Report Type Select */}
          <div className="mb-8 flex gap-4">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="summary">Summary Report</option>
              <option value="department">Department Statistics</option>
              <option value="monthly">Monthly Statistics</option>
              <option value="leaveType">Leave Type Statistics</option>
            </select>

            <button
              onClick={generatePDF}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
            >
              📄 Export PDF
            </button>
            <button
              onClick={generateExcel}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
            >
              📊 Export Excel
            </button>
          </div>

          {/* Summary Report */}
          {reportType === 'summary' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                  <p className="text-slate-600 text-sm">Total Applications</p>
                  <p className="text-4xl font-black text-slate-900 mt-2">{summaryReport.totalApplications}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                  <p className="text-slate-600 text-sm">Approved</p>
                  <p className="text-4xl font-black text-green-600 mt-2">{summaryReport.approvedApplications}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                  <p className="text-slate-600 text-sm">Pending</p>
                  <p className="text-4xl font-black text-yellow-600 mt-2">{summaryReport.pendingApplications}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                  <p className="text-slate-600 text-sm mb-4">Approval Rate</p>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${(summaryReport.approvedApplications / summaryReport.totalApplications) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    {((summaryReport.approvedApplications / summaryReport.totalApplications) * 100).toFixed(1)}% approved
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                  <p className="text-slate-600 text-sm mb-2">Quick Stats</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-600">Avg Days/Employee:</span> <span className="font-semibold">{summaryReport.avgLeaveDaysPerEmployee}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Most Used:</span> <span className="font-semibold">{summaryReport.mostUsedLeaveType}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Rejection Rate:</span> <span className="font-semibold">{((summaryReport.rejectedApplications / summaryReport.totalApplications) * 100).toFixed(1)}%</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Department Statistics */}
          {reportType === 'department' && (
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Department</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Employees</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Approved Leave</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Pending Applications</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentStats.map((dept, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{dept.department}</td>
                      <td className="px-6 py-4 text-slate-600">{dept.employees}</td>
                      <td className="px-6 py-4 text-slate-600">{dept.approvedLeave}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
                          {dept.pendingLeave}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Monthly Statistics */}
          {reportType === 'monthly' && (
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Month</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Approved</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Rejected</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyStats.map((month, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{month.month}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {month.approved}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          {month.rejected}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                          {month.pending}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Leave Type Statistics */}
          {reportType === 'leaveType' && (
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Leave Type</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Used</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Approved</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600">Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveTypeStats.map((leave, idx) => (
                    <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{leave.type}</td>
                      <td className="px-6 py-4 text-slate-600">{leave.used}</td>
                      <td className="px-6 py-4 text-slate-600">{leave.approved}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
                          {leave.pending}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
