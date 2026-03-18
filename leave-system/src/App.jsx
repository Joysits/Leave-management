import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyRequests from "./pages/MyRequests.jsx";
import LeaveCalendar from "./pages/LeaveCalendar.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminApplications from "./pages/AdminApplications.jsx";
import AdminEmployeeRecords from "./pages/AdminEmployeeRecords.jsx";
import AdminReports from "./pages/AdminReports.jsx";

export default function App() {

  return (
    

    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-requests" element={<MyRequests />} />
      <Route path="/calendar" element={<LeaveCalendar />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/applications" element={<AdminApplications />} />
      <Route path="/admin/employees" element={<AdminEmployeeRecords />} />
      <Route path="/admin/reports" element={<AdminReports />} />
      {/**<Route path="/leave" element={<ApplyLeave />} />
      <Route path="/history" element={<History />} />
      <Route path="/admin" element={<AdminDashboard />} />
      */}
    </Routes>
  )
  
}
