// pages/History.jsx
import Navbar from "../components/Navbar";

function History() {
  const leaves = [
    {
      id: 1,
      type: "Sick Leave",
      startDate: "12 Mar",
      endDate: "14 Mar",
      status: "Pending",
      statusColor: "amber",
    },
    {
      id: 2,
      type: "Annual Leave",
      startDate: "1 Feb",
      endDate: "5 Feb",
      status: "Approved",
      statusColor: "orange",
    },
    {
      id: 3,
      type: "Study Leave",
      startDate: "20 Jan",
      endDate: "22 Jan",
      status: "Approved",
      statusColor: "orange",
    },
  ];

  const getStatusClasses = (statusColor) => {
    const colors = {
      amber: "bg-amber-100 text-amber-800 border-amber-300",
      orange: "bg-orange-100 text-orange-800 border-orange-300",
      red: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[statusColor] || colors.amber;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Leave History</h2>
          <p className="text-gray-600">View all your leave requests</p>
        </div>

        <div className="space-y-4">
          {leaves.map((leave) => (
            <div
              key={leave.id}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start md:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{leave.type}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {leave.startDate} – {leave.endDate}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusClasses(
                    leave.statusColor
                  )}`}
                >
                  {leave.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;