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
        `${import.meta.env.VITE_SERVER_URL}/auth/request-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Unable to send reset link");
        return;
      }

      setSent(true);

    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-lg p-6 md:p-10">

        <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>

        <p className="text-slate-600 mb-8">
          Enter your email and we’ll send a reset link.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="grid gap-6">

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border rounded-lg"
              placeholder="you@example.com"
              required
            />

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-lg"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

          </form>
        ) : (
          <div className="p-4 bg-green-50 border border-green-300 text-green-700 rounded-lg text-center">
            📧 Reset link sent to <strong>{email}</strong>
          </div>
        )}

        <div className="text-center mt-6 text-sm">
          <Link to="/auth/login" className="text-blue-600 font-semibold">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}