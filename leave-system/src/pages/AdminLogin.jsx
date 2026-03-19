import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simple admin credentials validation
    if (email === 'admin@company.com' && password === 'admin123') {
      // Store admin session
      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.setItem('adminEmail', email);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials. Use admin@company.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 antialiased font-sans">
      <div className="flex w-full max-w-5xl h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="w-full p-16 flex flex-col items-center justify-center bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Admin Login</h2>
            <p className="text-slate-500 mb-8">Access the administrator panel</p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                Sign In <span className="text-xl">→</span>
              </button>
            </form>

            <div className="relative my-8 text-center">
              <span className="bg-white px-4 text-xs text-slate-400 uppercase tracking-widest relative z-10">Demo Credentials</span>
              <hr className="absolute top-1/2 w-full border-slate-100" />
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-600">
              <p><strong>Email:</strong> admin@company.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
