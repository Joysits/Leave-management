import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LeaveCalendar() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const leaveEvents = [
    { date: '2026-03-05', type: 'Annual Leave', title: 'Family vacation' },
    { date: '2026-03-10', type: 'Sick Leave', title: 'Flu symptoms' },
    { date: '2026-03-11', type: 'Sick Leave', title: 'Flu symptoms' },
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = [];
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const hasLeaveOnDate = (day) => {
    const dateStr = `2026-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return leaveEvents.some(e => e.date === dateStr);
  };

  const getLeaveOnDate = (day) => {
    const dateStr = `2026-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return leaveEvents.find(e => e.date === dateStr);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

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
        <h1 className="text-3xl font-black text-slate-900">Leave Calendar</h1>
        <p className="text-slate-600 mt-2">View your approved and pending leave dates</p>
      </header>

      {/* Content */}
      <main className="p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow border border-slate-200 p-8">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="px-3 py-2 hover:bg-slate-100 rounded transition"
            >
              ←
            </button>
            <h2 className="text-2xl font-bold text-slate-900">{monthName}</h2>
            <button
              onClick={nextMonth}
              className="px-3 py-2 hover:bg-slate-100 rounded transition"
            >
              →
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold text-slate-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const hasLeave = day && hasLeaveOnDate(day);
              const leaveData = day && getLeaveOnDate(day);
              
              return (
                <div
                  key={index}
                  className={`min-h-20 p-2 rounded border text-sm ${
                    !day
                      ? 'bg-slate-50 border-transparent'
                      : hasLeave
                      ? 'bg-blue-100 border-blue-400'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  {day && (
                    <>
                      <div className="font-bold text-slate-900">{day}</div>
                      {hasLeave && (
                        <div className="mt-1 text-xs bg-blue-500 text-white px-1 py-0.5 rounded truncate">
                          {leaveData.type}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">Leave Events</h3>
            <div className="space-y-2">
              {leaveEvents.map((event, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-slate-600">{event.date} - {event.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
