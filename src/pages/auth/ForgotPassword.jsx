import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/request-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
        <p className="text-slate-600 mb-8">
          Enter the email associated with your account and we'll send you a link
          to reset your password.
        </p>

        {!sent && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label className="block mb-1 font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        {sent && (
          <div className="p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 text-center">
            📧 Check your email! We've sent a password reset link to{" "}
            <strong>{email}</strong>.
          </div>
        )}

        <div className="text-center mt-6 text-sm text-slate-600">
          Remembered your password?{" "}
          <Link
            to="/auth/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
