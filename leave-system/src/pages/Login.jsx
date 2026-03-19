import { useState } from 'react'; // Adjusted path
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { login } from '../services/apiclient'; '../services/apiclient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // validate if fields are empty first
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    console.log("Logging in...", { email, password });
    login(email, password)
      .then(() => {
        console.log("Login successful");
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 antialiased font-sans">
      <div className="flex w-full max-w-5xl h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">

        <div className="w-full p-16 flex flex-col items-center justify-center bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome!</h2>
            <p className="text-slate-500 mb-8"> Please enter your credentials to proceed.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                />
              </div>
              {/**sign in button to lead to the dashboard**/}

              <button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                Sign In <span className="text-xl">→</span>
              </button>
            </form>

            <div className=" flex justify-content items-center mt-6">
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-sm text-slate-600 hover:text-slate-900 font-semibold transition-colors"
              >
                Forgot password?
              </button>
            </div>
                                  
    
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen} 
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
}