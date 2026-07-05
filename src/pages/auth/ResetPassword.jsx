import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Get the token from the URL e.g. /auth/reset-password?token=abc123
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    try {
      const response = await fetch(
        "https://server-js-0703.onrender.com/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSuccessMsg("Password updated! Redirecting you to login...");
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-2">Reset Your Password</h1>
        <p className="text-slate-600 mb-8">
          Choose a new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label className="block mb-1 font-medium text-slate-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-slate-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm">
              {successMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
