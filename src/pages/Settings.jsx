import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbarapp.jsx";

import {
  Circle,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  ShieldCheck,
  MessageSquare,
  Users,
  EyeOff,
  BellRing,
  Tags,
  UsersIcon,
} from "lucide-react";

const securityLevels = [
  { label: "At Risk", color: "#dc2626", icon: <AlertCircle size={18} /> },
  { label: "Vulnerable", color: "#f97316", icon: <Circle size={18} /> },
  { label: "Warning", color: "#fbbf24", icon: <Circle size={18} /> },
  { label: "Neutral", color: "#94a3b8", icon: <Circle size={18} /> },
  { label: "Elevated", color: "#3b82f6", icon: <Circle size={18} /> },
  { label: "Secure", color: "#22c55e", icon: <CheckCircle2 size={18} /> },
];

export default function Settings({ currentTheme, onThemeChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.state?.activeSection || "account",
  );

  // Username state
  const [currentUsername, setCurrentUsername] = useState(() => {
    return localStorage.getItem("educonnect_username") || "@tech_creator_24";
  });
  const [newUsername, setNewUsername] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState(false);

  // Email state
  const [newEmail, setNewEmail] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);

  const handleUpdateUsername = () => {
    if (!newUsername.trim()) return;
    const formatted = newUsername.startsWith("@")
      ? newUsername
      : `@${newUsername}`;
    setCurrentUsername(formatted);
    localStorage.setItem("educonnect_username", formatted);

    // Also update the profile handle in localStorage
    const saved = localStorage.getItem("educonnect_profile_text");
    if (saved) {
      const profile = JSON.parse(saved);
      profile.handle = formatted;
      localStorage.setItem("educonnect_profile_text", JSON.stringify(profile));
    }

    setNewUsername("");
    setUsernameSuccess(true);
    setTimeout(() => setUsernameSuccess(false), 2000);
  };

  const handleUpdateEmail = () => {
    if (!newEmail.trim()) return;
    localStorage.setItem("educonnect_email", newEmail);
    setNewEmail("");
    setEmailSuccess(true);
    setTimeout(() => setEmailSuccess(false), 2000);
  };

  const [profileFormData, setProfileFormData] = useState(() => {
    const saved = localStorage.getItem("educonnect_profile_text");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Alex Okonkwo",
          handle: "@alex.okonkwo · Lagos, Nigeria",
          bio: "Aspiring data scientist passionate about using Python and machine learning to solve real-world problems.",
        };
  });

  const handleProfileInputChange = (field, value) => {
    setProfileFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "educonnect_profile_text",
      JSON.stringify(profileFormData),
    );
    navigate("/profile");
  };

  const menuItems = [
    "Account",
    "Profile",
    "Security",
    "Notifications",
    "Themes",
  ];

  return (
    <>
      <Navbar currentTheme={currentTheme} onThemeChange={onThemeChange} />
      <div
        className={`settings-container ${activeTab ? "split-view" : "centered-view"}`}
      >
        <aside className="card menu">
          <h3>Menu</h3>
          {menuItems.map((item) => (
            <div
              key={item}
              className={`menu-item ${activeTab === item.toLowerCase() ? "active" : ""}`}
              onClick={() => setActiveTab(item.toLowerCase())}
            >
              <span>{item}</span>
            </div>
          ))}
        </aside>

        {activeTab && (
          <main className="content-box card">
            <div className="content-header">
              <h2 style={{ textTransform: "capitalize" }}>
                {activeTab} Settings
              </h2>
              <hr />
            </div>
            <div className="content-body">
              {/* 1. Account */}
              {activeTab === "account" && (
                <div className="account-settings-flow">
                  <section className="settings-section">
                    <h3>Display Identity</h3>
                    <div className="username-card">
                      <div className="current-user-info">
                        <span className="label">Current Username</span>
                        <span className="value">{currentUsername}</span>
                      </div>
                      <div className="input-group">
                        <label>New Username</label>
                        <input
                          type="text"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          placeholder="enter new username"
                          className="settings-input"
                        />
                      </div>
                      {usernameSuccess && (
                        <p
                          style={{
                            color: "#22c55e",
                            fontSize: "13px",
                            marginBottom: "8px",
                          }}
                        >
                          ✅ Username updated successfully!
                        </p>
                      )}
                      <button
                        className="btn-primary"
                        onClick={handleUpdateUsername}
                      >
                        Update Username
                      </button>
                    </div>
                  </section>

                  <section className="settings-section">
                    <h3>Email Address</h3>
                    <div className="input-group">
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="settings-input"
                      />
                    </div>
                    {emailSuccess && (
                      <p
                        style={{
                          color: "#22c55e",
                          fontSize: "13px",
                          marginBottom: "8px",
                        }}
                      >
                        ✅ Email updated successfully!
                      </p>
                    )}
                    <button className="btn-primary" onClick={handleUpdateEmail}>
                      Confirm
                    </button>
                  </section>
                </div>
              )}

              {/* 2. Profile */}
              {activeTab === "profile" && (
                <form
                  onSubmit={handleProfileSave}
                  className="profile-settings-editor"
                >
                  <section className="settings-section">
                    <h3>Public Profile</h3>
                    <div className="input-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profileFormData.name}
                        onChange={(e) =>
                          handleProfileInputChange("name", e.target.value)
                        }
                        placeholder="Alex Okonkwo"
                        className="settings-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Location</label>
                      <input
                        type="text"
                        value={profileFormData.handle}
                        onChange={(e) =>
                          handleProfileInputChange("handle", e.target.value)
                        }
                        placeholder="Lagos, Nigeria"
                        className="settings-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Bio</label>
                      <textarea
                        value={profileFormData.bio}
                        onChange={(e) =>
                          handleProfileInputChange("bio", e.target.value)
                        }
                        placeholder="Bio..."
                        className="settings-input bio-area"
                        rows="4"
                      />
                    </div>
                  </section>
                  <button type="submit" className="save-btn">
                    Save Profile
                  </button>
                </form>
              )}

              {/* 3. Security */}
              {activeTab === "security" && (
                <div className="security-flow">
                  {/* Security Level */}
                  <section className="settings-section">
                    <h3>Account Security Level</h3>
                    <div className="status-steps">
                      {securityLevels.map((level) => (
                        <div
                          key={level.label}
                          className={`status-step ${level.label === "Secure" ? "active" : ""}`}
                          style={{ "--brand-color": level.color }}
                        >
                          {level.label === "Secure" ? (
                            level.icon
                          ) : (
                            <Circle size={18} color="#cbd5e1" />
                          )}
                          <span className="status-label">{level.label}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Login Credentials */}
                  <section className="settings-section">
                    <h3>Login Credentials</h3>
                    <p
                      className="hint"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "13px",
                        marginBottom: "12px",
                      }}
                    >
                      Last Changed: 3 months ago
                    </p>
                    <button
                      className="btn-primary"
                      onClick={() => alert("Backend integration coming soon!")}
                    >
                      Update Password
                    </button>
                  </section>

                  {/* 2FA */}
                  <section className="settings-section">
                    <div
                      className="section-header"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                      }}
                    >
                      <ShieldCheck size={20} color="#22c55e" />
                      <h3 style={{ margin: 0 }}>
                        Two-Factor Authentication (2FA)
                      </h3>
                    </div>
                    <p className="sub-label" style={{ marginBottom: "16px" }}>
                      Add an extra layer of security to your account
                    </p>

                    <div className="setting-row">
                      <div className="setting-left">
                        <div className="label-stack">
                          <span>Authenticator App</span>
                          <p className="sub-label">
                            Use an app like Google Authenticator to generate
                            codes
                          </p>
                        </div>
                      </div>
                      <button
                        className="btn-primary"
                        onClick={() =>
                          alert("Backend integration coming soon!")
                        }
                      >
                        Configure
                      </button>
                    </div>

                    {/* Recovery Codes */}
                    <div className="recovery-codes-box">
                      <div
                        className="label-stack"
                        style={{ marginBottom: "12px" }}
                      >
                        <span>Backup Recovery Codes</span>
                        <p className="sub-label">
                          If you lose your phone, these codes will get you back
                          in.
                        </p>
                      </div>
                      <div className="codes-grid">
                        <code>8824-XT90</code>
                        <code>4412-PQ22</code>
                        <code>9001-BZ77</code>
                        <code>3345-LL10</code>
                      </div>
                      <button
                        className="btn-primary"
                        style={{ marginTop: "12px" }}
                        onClick={() =>
                          alert("Backend integration coming soon!")
                        }
                      >
                        Regenerate Codes
                      </button>
                    </div>
                  </section>

                  {/* Active Sessions */}
                  <section className="settings-section">
                    <h3>Where you're logged in</h3>
                    <div className="session-item">
                      <div className="session-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="2"
                            y="3"
                            width="20"
                            height="14"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                      </div>
                      <div className="session-details">
                        <strong>Windows · Chrome</strong>
                        <span>
                          Lagos, Nigeria ·{" "}
                          <span className="active-now">Active Now</span>
                        </span>
                      </div>
                    </div>
                    <button
                      className="text-btn-danger"
                      onClick={() => alert("Backend integration coming soon!")}
                    >
                      Sign out of all other devices
                    </button>
                  </section>
                </div>
              )}

              {/* 4. Notifications */}
              {activeTab === "notifications" && (
                <div className="notifications-flow fade-in">
                  {/* COMMUNICATION */}
                  <div className="notif-section-header">💬 Communication</div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <MessageSquare size={20} color="#2563eb" />
                      <div className="label-stack">
                        <span>Direct Messages</span>
                        <p className="sub-label">
                          Allow private messages from students and mentors.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <UsersIcon size={20} color="#b7a453" />
                      <div className="label-stack">
                        <span>Friend Requests</span>
                        <p className="sub-label">
                          Always notify on incoming friend requests.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <Users size={20} color="#a855f7" />
                      <div className="label-stack">
                        <span>Group Chats</span>
                        <p className="sub-label">
                          Always notify on all incoming messages.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <MessageSquare size={20} color="#b2378f" />
                      <div className="label-stack">
                        <span>Projects</span>
                        <p className="sub-label">
                          Always notify me on new/incoming contents from groups
                          or mentors.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <BellRing size={20} color="#0ea5e9" />
                      <div className="label-stack">
                        <span>Mentor Sessions</span>
                        <p className="sub-label">
                          Notify me when a mentor schedules or updates a
                          session.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <BellRing size={20} color="#f97316" />
                      <div className="label-stack">
                        <span>Announcements</span>
                        <p className="sub-label">
                          Receive platform-wide announcements and updates.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  {/* PRIVACY */}
                  <div className="notif-section-header">🔒 Privacy</div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <Tags size={20} color="#a855f7" />
                      <div className="label-stack">
                        <span>Tags</span>
                        <p className="sub-label">
                          Only notify when someone @mentions you in group chats
                          or discussions.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <EyeOff size={20} color="#eab308" />
                      <div className="label-stack">
                        <span>Show Message Preview</span>
                        <p className="sub-label">
                          Hide message content in lockscreen alerts.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <BellRing size={20} color="#b40f56" />
                      <div className="label-stack">
                        <span>Media Content</span>
                        <p className="sub-label">
                          Allow to always send or receive media content.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <EyeOff size={20} color="#64748b" />
                      <div className="label-stack">
                        <span>Who can see my profile</span>
                        <p className="sub-label">
                          Control who can view your profile information.
                        </p>
                      </div>
                    </div>
                    <select className="notif-select">
                      <option>Everyone</option>
                      <option>Connections only</option>
                      <option>Nobody</option>
                    </select>
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <MessageSquare size={20} color="#64748b" />
                      <div className="label-stack">
                        <span>Who can send me messages</span>
                        <p className="sub-label">
                          Control who can message you directly.
                        </p>
                      </div>
                    </div>
                    <select className="notif-select">
                      <option>Everyone</option>
                      <option>Connections only</option>
                      <option>Nobody</option>
                    </select>
                  </div>

                  {/* ACTIVITY */}
                  <div className="notif-section-header">📊 Activity</div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <CheckCircle2 size={20} color="#22c55e" />
                      <div className="label-stack">
                        <span>Course Completions</span>
                        <p className="sub-label">
                          Notify me when I complete a course or module.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <BellRing size={20} color="#f59e0b" />
                      <div className="label-stack">
                        <span>Achievement Unlocks</span>
                        <p className="sub-label">
                          Notify me when I earn a new badge or achievement.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <BellRing size={20} color="#ef4444" />
                      <div className="label-stack">
                        <span>Streak Reminders</span>
                        <p className="sub-label">
                          Remind me daily to maintain my learning streak.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <BellRing size={20} color="#8b5cf6" />
                      <div className="label-stack">
                        <span>Weekly Progress Report</span>
                        <p className="sub-label">
                          Receive a weekly summary of your learning progress.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle-switch"
                      defaultChecked
                    />
                  </div>
                </div>
              )}

              {/* 5. Themes */}
              {activeTab === "themes" && (
                <div className="themes-content-area fade-in">
                  <p className="settings-subtitle">
                    Choose how the dashboard looks for you.
                  </p>
                  <div className="theme-options-grid">
                    <div
                      className={`theme-card ${currentTheme === "light" ? "active" : ""}`}
                      onClick={() => onThemeChange("light")}
                    >
                      <div className="theme-preview light">
                        <div className="preview-nav"></div>
                        <div className="p-line"></div>
                        <div className="p-line mid"></div>
                      </div>
                      <div className="theme-info">
                        <Sun size={18} />
                        <span>Light Mode</span>
                      </div>
                    </div>
                    <div
                      className={`theme-card ${currentTheme === "dark" ? "active" : ""}`}
                      onClick={() => onThemeChange("dark")}
                    >
                      <div className="theme-preview dark">
                        <div className="preview-nav"></div>
                        <div className="p-line"></div>
                        <div className="p-line mid"></div>
                      </div>
                      <div className="theme-info">
                        <Moon size={18} />
                        <span>Dark Mode</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        )}
      </div>
    </>
  );
}
