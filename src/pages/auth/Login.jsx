import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "student",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    if (!formData.role) {
      setErrorMsg(
        "Please select whether you are logging in as a Student or Mentor.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Invalid credentials. Please try again.");
        return;
      }

      const userToSave = {
        ...(data.user || {}),
        role: formData.role || data.user?.role || "student",
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userToSave));

      const setupDone = localStorage.getItem("educonnect_profile_setup");
      navigate(setupDone ? "/dashboard" : "/profile-setup");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({ role: "student", email: "", password: "" });
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full bg-slate-900 flex flex-col justify-between items-center p-4 sm:p-6 md:p-10 overflow-x-hidden">
      {/* Background Animated Accents & Grid Lines */}

      {/* Background Animated Accents */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-slate-700/30 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s] pointer-events-none" />

      {/* Moving Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* 1. Responsive Card Wrapper (Make sure this ends BEFORE the footer) */}
      <div className="relative z-10 w-full max-w-md lg:max-w-4xl bg-white rounded-3xl shadow-2xl shadow-slate-950/50 overflow-hidden border border-slate-800/20 my-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side Feature Panel (hidden on mobile) */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border-r border-slate-800/80">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight mb-4">
              Master Courses & <br /> Build Real Projects
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Learn the core concepts through guided courses, get feedback from
              expert mentors, and apply your knowledge by collaborating on
              real-world projects.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-800/80">
            <p className="text-xs text-slate-500">
              © Educonnect Platform. Empowering education everywhere.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-8 sm:p-10 flex flex-col justify-center bg-white">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 lg:hidden absolute top-0 left-0" />

          {/* Header */}
          <div className="mb-6 lg:mb-8 text-center lg:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 inline-flex lg:hidden items-center justify-center mb-4 shadow-md shadow-blue-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Login as
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, role: "student" }))
                }
                className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                  formData.role === "student"
                    ? "border-blue-600 bg-blue-50/70 text-blue-600 shadow-sm"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100/80"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                Student
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, role: "mentor" }))
                }
                className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                  formData.role === "mentor"
                    ? "border-indigo-600 bg-indigo-50/70 text-indigo-600 shadow-sm"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100/80"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M12 14c-5 0-8 2-8 3v1h16v-1c0-1-3-3-8-3z" />
                </svg>
                Mentor
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full py-3 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-xs text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full py-3 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Alert */}
            {errorMsg && (
              <div className="p-3 bg-red-50/80 border border-red-200/80 rounded-xl text-red-600 text-xs font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errorMsg}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2.5 mt-2">
              <button
                type="button"
                onClick={handleClear}
                className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all cursor-pointer active:scale-[0.98]"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 px-5 rounded-xl text-white font-bold text-sm shadow-md shadow-blue-500/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95"
                }`}
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </div>
          </form>

          {/* Signup Footer Link */}
          <p className="text-center lg:text-left mt-6 text-xs text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>

      {/* <--- CLOSE THE WHITE CARD WRAPPER HERE! */}

      {/* 2. Footer sits OUTSIDE the white card on the dark page background */}
      <footer className="relative z-10 w-full text-center mt-6 mb-2">
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
          <Link
            to="/privacy"
            className="hover:text-slate-200 transition-colors"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <Link to="/terms" className="hover:text-slate-200 transition-colors">
            Terms of Service
          </Link>
          <span>•</span>
          <Link
            to="/contact"
            className="hover:text-slate-200 transition-colors"
          >
            Help & Support
          </Link>
        </div>
      </footer>
    </div>
  );
}
