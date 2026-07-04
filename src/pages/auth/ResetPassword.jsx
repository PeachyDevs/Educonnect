import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Extracted directly from the URL string (?token=...)
    const token = searchParams.get("token");

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setMessage("");
        setIsError(false);

        if (formData.newPassword !== formData.confirmPassword) {
            setIsError(true);
            setMessage("Passwords do not match.");
            return;
        }

        if (!token) {
            setIsError(true);
            setMessage("Invalid or missing password reset token.");
            return;
        }

        setLoading(true);

        const serverUrl =
            import.meta.env.VITE_NODE_ENV === "Development"
                ? import.meta.env.VITE_SERVER_URL_DEV
                : import.meta.env.VITE_SERVER_URL_PROD;

        try {
            const response = await fetch(`${serverUrl}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: token,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setIsError(true);
                setMessage(data.message || "Failed to update password.");
                return;
            }

            setMessage("Password successfully updated! Redirecting to login...");
            setTimeout(() => {
                navigate("/auth/login");
            }, 3000);
        } catch {
            setIsError(true);
            setMessage("Network error. Could not connect to backend server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
            <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-2">Create New Password</h1>
                <p className="text-slate-600 mb-8">
                    Enter your new secure password below to regain access to your account.
                </p>

                {!token ? (
                    <div className="p-4 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm mb-6">
                        No reset token detected. Please check the link from your email or request a new one.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block mb-1 font-medium text-slate-700">
                                New Password
                            </label>
                            <input
                                name="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                                placeholder="Minimum 8 characters"
                                minLength={8}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-slate-700">
                                Confirm New Password
                            </label>
                            <input
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                                placeholder="Re-enter new password"
                                required
                            />
                        </div>

                        {message && (
                            <div className={`p-3 border rounded-lg text-sm ${
                                isError 
                                    ? "bg-red-50 border-red-300 text-red-700" 
                                    : "bg-green-50 border-green-300 text-green-700"
                            }`}>
                                {message}
                            </div>
                        )}

                        <div className="flex justify-end gap-3 mt-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? "Updating..." : "Reset Password"}
                            </button>
                        </div>
                    </form>
                )}

                <div className="text-center mt-6 text-sm text-slate-600">
                    Remember your password?{" "}
                    <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
