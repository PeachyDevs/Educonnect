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
        "Please select whether you are logging in as a Student or Facilitator.",
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
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #ede9fe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "white",
          borderRadius: "24px",
          boxShadow: "0 20px 50px rgba(37, 99, 235, 0.08)",
          overflow: "hidden",
        }}
      >
        {/* Top Accent Bar */}
        <div
          style={{
            height: "5px",
            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
          }}
        />

        <div style={{ padding: "40px 36px" }}>
          {/* Header */}
          <div style={{ marginBottom: "28px", textAlign: "center" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                borderRadius: "16px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                boxShadow: "0 8px 16px rgba(37, 99, 235, 0.2)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: "800",
                color: "#111827",
                marginBottom: "6px",
                fontFamily: "'Sora', sans-serif",
              }}
            >
              Welcome back
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Role Selector */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "700",
                color: "#4b5563",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Login as
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "student" })}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border:
                    formData.role === "student"
                      ? "2px solid #2563eb"
                      : "1.5px solid #e5e7eb",
                  background:
                    formData.role === "student" ? "#eff6ff" : "#f9fafb",
                  color: formData.role === "student" ? "#2563eb" : "#4b5563",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
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
                onClick={() => setFormData({ ...formData, role: "mentor" })}
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border:
                    formData.role === "mentor"
                      ? "2px solid #7c3aed"
                      : "1.5px solid #e5e7eb",
                  background:
                    formData.role === "mentor" ? "#f5f3ff" : "#f9fafb",
                  color: formData.role === "mentor" ? "#7c3aed" : "#4b5563",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M12 14c-5 0-8 2-8 3v1h16v-1c0-1-3-3-8-3z" />
                </svg>
                Facilitator
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {/* Email Field */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
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
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    borderRadius: "10px",
                    border: "1.5px solid #e5e7eb",
                    background: "#f9fafb",
                    color: "#111827",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#374151",
                  }}
                >
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  style={{
                    fontSize: "12px",
                    color: "#2563eb",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "flex",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9ca3af"
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
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 42px",
                    borderRadius: "10px",
                    border: "1.5px solid #e5e7eb",
                    background: "#f9fafb",
                    color: "#111827",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                {/* SVG Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9ca3af",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
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
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
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

            {errorMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  color: "#dc2626",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
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

            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button
                type="button"
                onClick={handleClear}
                style={{
                  padding: "12px 18px",
                  borderRadius: "10px",
                  border: "1.5px solid #e5e7eb",
                  background: "white",
                  color: "#6b7280",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: loading
                    ? "#93c5fd"
                    : "linear-gradient(135deg, #2563eb, #7c3aed)",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
                }}
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </div>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "24px",
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              style={{
                color: "#2563eb",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
