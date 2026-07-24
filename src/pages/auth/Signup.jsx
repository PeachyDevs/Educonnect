import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "student",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Registration failed. Please try again.");
        return;
      }

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user || { role: formData.role }),
      );

      // Direct new users to profile setup
      navigate("/profile-setup");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      role: "student",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    /* 1. Main outer container (Flex column with gap so elements space out nicely) */
    <div className="relative min-h-[calc(100vh-64px)] w-full bg-slate-900 flex flex-col justify-between items-center p-4 sm:p-6 md:p-10 overflow-x-hidden">
      {/* Background Animated Accents & Grid */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-slate-700/30 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* 2. Responsive Card Wrapper (CLOSE THIS DIV BEFORE THE FOOTER) */}
      <div className="relative z-10 w-full max-w-md lg:max-w-4xl bg-white rounded-3xl shadow-2xl shadow-slate-950/50 overflow-hidden border border-slate-800/20 my-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side Feature Panel */}
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight mb-4">
              Join Our Learning <br /> Community Today
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Start building hands-on projects, mastering theory through guided
              courses, and collaborating with expert mentors and peers.
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
          <div className="mb-6 lg:mb-6 text-center lg:text-left">
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Get started on your project-based learning path
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Join as
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, role: "student" }))
                }
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
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
                className={`py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
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
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
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
                  placeholder="•••••••"
                  className="w-full py-2.5 pl-10 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm Password
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
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="•••••••"
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                />
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
                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-all cursor-pointer active:scale-[0.98]"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-2.5 px-5 rounded-xl text-white font-bold text-sm shadow-md shadow-blue-500/15 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98] ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account →"}
              </button>
            </div>
          </form>

          {/* "Already have an account?" section ends here */}
          <p className="text-center lg:text-left mt-5 text-xs text-slate-500 font-medium">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* 3. Footer sits OUTSIDE the card container with top margin (mt-6 or mt-8) */}
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
