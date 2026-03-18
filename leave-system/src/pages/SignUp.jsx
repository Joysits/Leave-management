import { useState } from 'react'; // Adjusted path
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signing up...", formData);
    // Add validation and API call here
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 antialiased font-sans">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Left Side - Form */}
        <div className="w-1/2 p-16 flex flex-col items-center justify-center bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 mb-8">Join us today and get started!</p>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                Create Account <span className="text-xl">→</span>
              </button>
            </form>

            <div className="relative my-8 text-center">
              <span className="bg-white px-4 text-xs text-slate-400 uppercase tracking-widest relative z-10">or</span>
              <hr className="absolute top-1/2 w-full border-slate-100" />
            </div>

            <p className="text-center text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-slate-900 font-bold hover:text-black transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <div className="w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-16 flex flex-col justify-center items-center text-white relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-4xl font-black mb-4">Welcome!</h3>
            <p className="text-lg text-slate-300 mb-8">
              Join our leave management system and streamline your workflow.
            </p>
            <ul className="text-left space-y-3 text-slate-300">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">✓</span>
                Easy to use interface
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">✓</span>
                Manage your leave efficiently
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">✓</span>
                Real-time notifications
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
