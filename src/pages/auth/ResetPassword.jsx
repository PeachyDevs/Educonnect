import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        role: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(data.message || "Invalid credentials");
                return;
            }

            // 🔐 STORE AUTH
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/dashboard");
        } catch (error) {
            setErrorMsg("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setFormData({ role: "", email: "", password: "" });
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
            <div className="w-full max-w-2xl bg-white border rounded-2xl shadow-lg p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-2">Login</h1>

                <p className="text-slate-600 mb-8">
                    Enter your credentials to access your account.
                </p>

                {/* ROLE UI ONLY */}
                <div className="mb-8">
                    <label className="block mb-4 font-medium text-slate-700">
                        Log in as:
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({ ...formData, role: "student" })
                            }
                            className={`p-4 rounded-xl border-2 font-semibold ${
                                formData.role === "student"
                                    ? "border-blue-600 bg-blue-50 text-blue-600"
                                    : "border-slate-300"
                            }`}
                        >
                            👨‍🎓 Student
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setFormData({ ...formData, role: "mentor" })
                            }
                            className={`p-4 rounded-xl border-2 font-semibold ${
                                formData.role === "mentor"
                                    ? "border-green-600 bg-green-50 text-green-600"
                                    : "border-slate-300"
                            }`}
                        >
                            👨‍🏫 Mentor
                        </button>
                    </div>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-6"
                >
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="p-3 border rounded-lg"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="p-3 border rounded-lg"
                        required
                    />

                    {errorMsg && (
                        <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                            {errorMsg}
                        </div>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-5 py-2 border rounded-lg"
                        >
                            Clear
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6 text-sm">
                    <Link
                        to="/auth/signup"
                        className="text-blue-600 font-semibold"
                    >
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
}
