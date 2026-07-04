import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        role: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setErrorMsg("");

        // Prevent submission if no role is selected
        if (!formData.role) {
            setErrorMsg("Please select a role (Student or Mentor).");
            return;
        }

        setLoading(true);

        // Dynamically assign URL based on the environment
        const serverUrl =
            import.meta.env.VITE_NODE_ENV === "Development"
                ? import.meta.env.VITE_SERVER_URL_DEV
                : import.meta.env.VITE_SERVER_URL_PROD;

        try {
            const response = await fetch(`${serverUrl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    role: formData.role, // Passes "student" or "mentor" safely now
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    address: formData.address
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMsg(
                    data.message || "Something went wrong. Please try again."
                );
                return;
            }

            setSignupSuccess(true);
            setTimeout(() => navigate("/auth/login"), 2000);
        } catch {
            setErrorMsg(
                "Network error. Please check your connection and try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setFormData({
            role: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            address: ""
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
            <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10">
                <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
                <p className="text-slate-600 mb-8">
                    Select your role and complete your details to create an
                    account.
                </p>

                <div className="mb-8">
                    <label className="block mb-4 font-medium text-slate-700">
                        I am a:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({ ...formData, role: "student" })
                            }
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
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    role: "mentor" // Fixed: Was "facilitator"
                                })
                            }
                            className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                                formData.role === "mentor" // Fixed: Was "facilitator"
                                    ? "border-green-600 bg-green-50 text-green-600"
                                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                            }`}
                        >
                            👨‍🏫 Mentor
                        </button>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <div>
                        <label className="block mb-1 font-medium text-slate-700">
                            First Name
                        </label>
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-slate-700">
                            Last Name
                        </label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                            placeholder="Doe"
                            required
                        />
                    </div>
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
                        <label className="block mb-1 font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-slate-700">
                            Phone
                        </label>
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                            placeholder="123-456-7890"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-slate-700">
                            Address
                        </label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
                            placeholder="123 Main St"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 mt-3">
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
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>

                {errorMsg && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700 text-center">
                        {errorMsg}
                    </div>
                )}
                {signupSuccess && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 text-center">
                        🎉 Account created! Taking you to login...
                    </div>
                )}

                <div className="text-center mt-6 text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                        to="/auth/login"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
