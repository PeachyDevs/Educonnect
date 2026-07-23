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
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: formData.role === "facilitator" ? "mentor" : "student",
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message || "Something went wrong. Please try again.");
        return;
      }
      setSignupSuccess(true);
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
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
      address: "",
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1.5px solid #e5e7eb",
    background: "#f9fafb",
    color: "#111827",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    color: "#374151",
    marginBottom: "8px",
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
          maxWidth: "680px",
          background: "white",
          borderRadius: "24px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #2563eb, #7c3aed)",
          }}
        />

        <div style={{ padding: "40px 36px" }}>
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
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
              Create your account
            </h1>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Select your role and complete your details to get started.
            </p>
          </div>

          {/* Role selector */}
          <div style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              I am a
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {/* Student */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "student" })}
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border:
                    formData.role === "student"
                      ? "2px solid #2563eb"
                      : "2px solid #e5e7eb",
                  background: formData.role === "student" ? "#eff6ff" : "white",
                  color: formData.role === "student" ? "#2563eb" : "#374151",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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

              {/* Facilitator */}
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, role: "facilitator" })
                }
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border:
                    formData.role === "facilitator"
                      ? "2px solid #16a34a"
                      : "2px solid #e5e7eb",
                  background:
                    formData.role === "facilitator" ? "#f0fdf4" : "white",
                  color:
                    formData.role === "facilitator" ? "#16a34a" : "#374151",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M12 14c-5 0-8 2-8 3v1h16v-1c0-1-3-3-8-3z" />
                  <line x1="17" y1="3" x2="17" y2="9" />
                  <line x1="14" y1="6" x2="20" y2="6" />
                </svg>
                Facilitator
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label style={labelStyle}>First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="John"
                  required
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div>
                <label style={labelStyle}>Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Doe"
                  required
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="you@example.com"
                  required
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    style={{ ...inputStyle, paddingRight: "42px" }}
                    placeholder="••••••••"
                    required
                    onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#9ca3af",
                      padding: 0,
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

              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="123-456-7890"
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              <div>
                <label style={labelStyle}>Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="123 Main St"
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            </div>

            {errorMsg && (
              <div
                style={{
                  padding: "12px 14px",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "10px",
                  color: "#dc2626",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
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

            {signupSuccess && (
              <div
                style={{
                  padding: "12px 14px",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "10px",
                  color: "#16a34a",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "16px",
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Account created! Taking you to login...
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={handleClear}
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "1.5px solid #e5e7eb",
                  background: "white",
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "inherit",
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
                  fontFamily: "inherit",
                }}
              >
                {loading ? "Creating account..." : "Create Account →"}
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
            Already have an account?{" "}
            <Link
              to="/auth/login"
              style={{ color: "#2563eb", fontWeight: "700" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
