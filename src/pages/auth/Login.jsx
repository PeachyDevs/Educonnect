import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const setupDone = localStorage.getItem("educonnect_profile_setup");
      if (setupDone) {
        navigate("/dashboard");
      } else {
        navigate("/profile-setup");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({ role: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <p className="text-slate-600 mb-8">
          Select your role and enter your credentials to access your account.
        </p>

        <div className="mb-8">
          <label className="block mb-4 font-medium text-slate-700">
            Login as:
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "student" })}
              className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                formData.role === "student"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              👨‍🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: "mentor" })}
              className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                formData.role === "mentor"
                  ? "border-green-600 bg-green-50 text-green-600"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              👨‍🏫 Facilitator
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block mb-1 font-medium text-slate-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-medium text-slate-700">Password</label>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={handleClear}
              className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
