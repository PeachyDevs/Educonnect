import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  BookOpen,
  Target,
  MapPin,
  Briefcase,
  Clock,
  Sparkles,
  CheckCircle,
  Rocket,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// Custom Teacher / Facilitator SVG Icon
const FacilitatorIcon = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M18 8l3-3" />
    <path d="M21 5v3" />
  </svg>
);

// Static Options
const STUDENT_INTERESTS = [
  "Python",
  "Data Science",
  "UI/UX",
  "Web Dev",
  "Machine Learning",
  "Business",
  "Design",
  "Mobile Dev",
];

const MENTOR_EXPERTISE = [
  "Python",
  "Data Science",
  "UI/UX",
  "Web Dev",
  "Machine Learning",
  "Business Writing",
  "React",
  "Node.js",
];

const LEARNING_STYLES = [
  "Visual",
  "Reading/Writing",
  "Hands-on",
  "Group Learning",
];

const TEACHING_STYLES = [
  "Structured lessons",
  "Project-based",
  "Q&A sessions",
  "Mentorship calls",
];

const AVAILABILITY_OPTIONS = [
  "Weekdays",
  "Weekends",
  "Evenings only",
  "Flexible",
];

const WEEKLY_GOALS = ["2 hrs/week", "4 hrs/week", "6 hrs/week", "8+ hrs/week"];
const GRADE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function ProfileSetup() {
  const navigate = useNavigate();

  // Safe localStorage parsing
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const role = user.role || "student";
  const totalSteps = 4;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName:
      user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.first_name || "",
    dob: "",
    location: "",
    avatar: null,
    avatarPreview: null,
    // Student fields
    school: "",
    gradeLevel: "",
    interests: [],
    weeklyGoal: "",
    learningStyle: "",
    // Mentor fields
    expertise: [],
    yearsOfExperience: "",
    bio: "",
    availability: "",
    teachingStyle: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result,
          avatarPreview: reader.result,
        }));
        localStorage.setItem("educonnect_avatar", reader.result);
        window.dispatchEvent(new Event("avatarChanged"));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleArrayItem = (field, item) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleFinish = () => {
    const profileText = {
      name: formData.fullName,
      handle: formData.location,
      bio:
        role === "mentor"
          ? formData.bio
          : `Interested in: ${formData.interests.join(", ")}`,
    };
    localStorage.setItem(
      "educonnect_profile_text",
      JSON.stringify(profileText),
    );
    localStorage.setItem("educonnect_profile_setup", "complete");
    navigate("/dashboard");
  };

  const firstName = formData.fullName.trim().split(" ")[0] || "there";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f1f5f9 0%, #dbeafe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          background: "white",
          borderRadius: "24px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        {/* Progress Bar */}
        <div style={{ background: "#f8fafc", padding: "24px 32px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span
              style={{ fontSize: "13px", fontWeight: "600", color: "#64748b" }}
            >
              Step {step} of {totalSteps}
            </span>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>
              {step === 1 && "Basic Info"}
              {step === 2 &&
                (role === "mentor" ? "Mentor Profile" : "Student Profile")}
              {step === 3 && "Preferences"}
              {step === 4 && "All done!"}
            </span>
          </div>
          <div
            style={{
              height: "6px",
              background: "#e2e8f0",
              borderRadius: "99px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(step / totalSteps) * 100}%`,
                background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                borderRadius: "99px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        <div style={{ padding: "32px" }}>
          {/* STEP 1 — Basic Info */}
          {step === 1 && (
            <div>
              <h2 style={headStyle}>
                Let's set up your profile{" "}
                <Sparkles
                  size={22}
                  color="#2563eb"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
              </h2>
              <p style={subStyle}>
                Tell us a bit about yourself to get started.
              </p>

              {/* Avatar Upload */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    background: formData.avatarPreview
                      ? "none"
                      : "linear-gradient(135deg, #2563eb, #60a5fa)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    marginBottom: "12px",
                    border: "3px solid #e2e8f0",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    document.getElementById("avatar-upload")?.click()
                  }
                >
                  {formData.avatarPreview ? (
                    <img
                      src={formData.avatarPreview}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <User size={40} color="white" />
                  )}
                </div>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("avatar-upload")?.click()
                  }
                  style={{
                    fontSize: "13px",
                    color: "#2563eb",
                    fontWeight: "600",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Upload photo
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    style={inputStyle}
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="e.g. Arene Eric"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Date of Birth</label>
                  <input
                    style={inputStyle}
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Location</label>
                  <input
                    style={inputStyle}
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g. Lagos, Nigeria"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — Student Profile */}
          {step === 2 && role === "student" && (
            <div>
              <h2 style={headStyle}>
                Your student profile{" "}
                <GraduationCap
                  size={22}
                  color="#2563eb"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
              </h2>
              <p style={subStyle}>
                Help us personalize your learning experience.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <label style={labelStyle}>School / Institution</label>
                  <input
                    style={inputStyle}
                    value={formData.school}
                    onChange={(e) => handleChange("school", e.target.value)}
                    placeholder="e.g. University of Lagos"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Experience Level</label>
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {GRADE_LEVELS.map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => handleChange("gradeLevel", g)}
                        style={chipStyle(formData.gradeLevel === g)}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>
                    Interests (pick all that apply)
                  </label>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {STUDENT_INTERESTS.map((i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => toggleArrayItem("interests", i)}
                        style={chipStyle(formData.interests.includes(i))}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — Mentor Profile */}
          {step === 2 && role === "mentor" && (
            <div>
              <h2 style={headStyle}>
                Your mentor profile{" "}
                <FacilitatorIcon size={22} color="#2563eb" />
              </h2>
              <p style={subStyle}>Tell students what you bring to the table.</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div>
                  <label style={labelStyle}>
                    Areas of Expertise (pick all that apply)
                  </label>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {MENTOR_EXPERTISE.map((e) => (
                      <button
                        type="button"
                        key={e}
                        onClick={() => toggleArrayItem("expertise", e)}
                        style={chipStyle(formData.expertise.includes(e))}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Years of Experience</label>
                  <input
                    style={inputStyle}
                    value={formData.yearsOfExperience}
                    onChange={(e) =>
                      handleChange("yearsOfExperience", e.target.value)
                    }
                    placeholder="e.g. 3"
                    type="number"
                    min="0"
                  />
                </div>
                <div>
                  <label style={labelStyle}>Bio</label>
                  <textarea
                    style={{
                      ...inputStyle,
                      minHeight: "100px",
                      resize: "vertical",
                    }}
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    placeholder="Tell students about yourself and your experience..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Student Preferences */}
          {step === 3 && role === "student" && (
            <div>
              <h2 style={headStyle}>
                Your learning preferences{" "}
                <BookOpen
                  size={22}
                  color="#2563eb"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
              </h2>
              <p style={subStyle}>
                We'll use this to personalize your dashboard.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>
                  <label style={labelStyle}>Preferred Learning Style</label>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {LEARNING_STYLES.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => handleChange("learningStyle", s)}
                        style={chipStyle(formData.learningStyle === s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Weekly Learning Goal</label>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {WEEKLY_GOALS.map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => handleChange("weeklyGoal", g)}
                        style={chipStyle(formData.weeklyGoal === g)}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Mentor Preferences */}
          {step === 3 && role === "mentor" && (
            <div>
              <h2 style={headStyle}>
                Your mentoring preferences{" "}
                <Target
                  size={22}
                  color="#2563eb"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                />
              </h2>
              <p style={subStyle}>
                Help students know what to expect from you.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>
                  <label style={labelStyle}>Teaching Style</label>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {TEACHING_STYLES.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => handleChange("teachingStyle", s)}
                        style={chipStyle(formData.teachingStyle === s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Availability</label>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {AVAILABILITY_OPTIONS.map((a) => (
                      <button
                        type="button"
                        key={a}
                        onClick={() => handleChange("availability", a)}
                        style={chipStyle(formData.availability === a)}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 — Done */}
          {step === 4 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <CheckCircle size={64} color="#16a34a" />
              </div>
              <h2 style={{ ...headStyle, textAlign: "center" }}>
                You're all set, {firstName}!
              </h2>
              <p
                style={{
                  ...subStyle,
                  textAlign: "center",
                  margin: "0 auto 28px",
                }}
              >
                Your {role === "mentor" ? "mentor" : "student"} profile is
                ready. Time to explore EduConnect!
              </p>
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                  textAlign: "left",
                  marginBottom: "28px",
                }}
              >
                <p style={summaryTextItem}>
                  <MapPin size={16} style={summaryIconStyle} />{" "}
                  {formData.location || "Location not set"}
                </p>
                {role === "student" && (
                  <>
                    <p style={summaryTextItem}>
                      <GraduationCap size={16} style={summaryIconStyle} />{" "}
                      {formData.school || "School not set"}
                    </p>
                    <p style={summaryTextItem}>
                      <BookOpen size={16} style={summaryIconStyle} />{" "}
                      {formData.interests.join(", ") || "No interests selected"}
                    </p>
                  </>
                )}
                {role === "mentor" && (
                  <>
                    <p style={summaryTextItem}>
                      <Briefcase size={16} style={summaryIconStyle} />{" "}
                      {formData.expertise.join(", ") || "No expertise selected"}
                    </p>
                    <p style={summaryTextItem}>
                      <Clock size={16} style={summaryIconStyle} />{" "}
                      {formData.availability || "Availability not set"}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "32px",
              gap: "12px",
            }}
          >
            {step > 1 ? (
              <button type="button" onClick={handleBack} style={backBtnStyle}>
                <ArrowLeft
                  size={16}
                  style={{ marginRight: "6px", verticalAlign: "middle" }}
                />{" "}
                Back
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button type="button" onClick={handleNext} style={nextBtnStyle}>
                Continue{" "}
                <ArrowRight
                  size={16}
                  style={{ marginLeft: "6px", verticalAlign: "middle" }}
                />
              </button>
            ) : (
              <button type="button" onClick={handleFinish} style={nextBtnStyle}>
                Go to Dashboard{" "}
                <Rocket
                  size={16}
                  style={{ marginLeft: "6px", verticalAlign: "middle" }}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared CSS Objects
const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "700",
  color: "#374151",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1.5px solid #e5e7eb",
  fontSize: "14px",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  color: "#111827",
  outline: "none",
  background: "#f9fafb",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const chipStyle = (active) => ({
  padding: "8px 16px",
  borderRadius: "99px",
  fontSize: "13px",
  fontWeight: "600",
  border: active ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
  background: active ? "#dbeafe" : "#f9fafb",
  color: active ? "#1d4ed8" : "#374151",
  cursor: "pointer",
  transition: "all 0.2s",
});

const nextBtnStyle = {
  background: "#2563eb",
  color: "white",
  padding: "12px 28px",
  borderRadius: "99px",
  fontSize: "14px",
  fontWeight: "600",
  border: "none",
  cursor: "pointer",
  transition: "background 0.2s",
  display: "inline-flex",
  alignItems: "center",
};

const backBtnStyle = {
  background: "none",
  color: "#6b7280",
  padding: "12px 20px",
  borderRadius: "99px",
  fontSize: "14px",
  fontWeight: "600",
  border: "1.5px solid #e5e7eb",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
};

const headStyle = {
  fontFamily: "'Sora', sans-serif",
  fontSize: "1.4rem",
  fontWeight: "800",
  color: "#111827",
  marginBottom: "6px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const subStyle = {
  color: "#6b7280",
  fontSize: "14px",
  marginBottom: "24px",
};

const summaryTextItem = {
  fontSize: "13px",
  color: "#64748b",
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const summaryIconStyle = {
  color: "#2563eb",
  flexShrink: 0,
};
