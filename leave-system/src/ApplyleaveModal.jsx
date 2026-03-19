import React from 'react'; // This is causing the warning
export default function ApplyLeaveModal({ isOpen, onClose, onSubmit, showSpecialLeave }) {
  // If the modal isn't open, return nothing
  if (!isOpen) return null;

  return (
    // The Backdrop: Semi-transparent dark slate with a heavy blur
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      
      {/* The Modal Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Request Leave</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors text-2xl"
          >
            ✕
          </button>
        </div>
        
        {/* Form */}
        <form className="p-6 space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          onSubmit({
            type: formData.get('leaveType'),
            duration: `${formData.get('start')} to ${formData.get('end')}`,
            reason: formData.get('reason')
          });
        }}>
          
          {/* Leave Type Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
              Leave Type
            </label>
            <select 
              name="leaveType" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option>Sick Leave</option>
              <option>Annual Leave</option>
              <option>Family Responsibility</option>
              <option>Study Leave</option>
              {/* Only visible if showSpecialLeave prop is true (June) */}
              {showSpecialLeave && <option>Special Leave</option>}
            </select>
          </div>

          {/* Date Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
                Start Date
              </label>
              <input 
                type="date" 
                name="start" 
                required 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
                End Date
              </label>
              <input 
                type="date" 
                name="end" 
                required 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          {/* Reason Textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
              Reason
            </label>
            <textarea 
              name="reason" 
              required 
              placeholder="Why are you requesting leave?" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-[#111827] text-white rounded-xl font-bold hover:bg-black shadow-lg transform active:scale-95 transition-all"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}