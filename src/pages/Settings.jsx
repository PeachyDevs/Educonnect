import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate for profile redirection
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
  const navigate = useNavigate(); // Initialize navigation function

  // Initialize active tab from navigation state
  const [activeTab, setActiveTab] = useState(
    location.state?.activeSection || "account" // Defaulting to account if no state is passed
  );

  // Hook up state to handle form profile text changes smoothly
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
    setProfileFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Triggered when clicking "Save Profile"
  const handleProfileSave = (e) => {
    e.preventDefault();
    // Commit to localStorage
    localStorage.setItem(
      "educonnect_profile_text",
      JSON.stringify(profileFormData)
    );
    // Bounce back to profile to view the fresh layout updates instantly
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
      <Navbar />
      <div
        className={`settings-container ${activeTab ? "split-view" : "centered-view"}`}
      >
        {/* SIDEBAR stays visible */}
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

        {/* Right content box */}
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
                        <span className="value">@tech_creator_24</span>
                      </div>
                      <div className="input-group">
                        <label>New Username</label>
                        <input
                          type="text"
                          placeholder="enter new username"
                          className="settings-input"
                        />
                      </div>
                      <button className="btn-primary">Update Username</button>
                    </div>
                  </section>
                  <div className="account-settings-flow">
                    <div className="settings-section">
                      <h3>Email Address</h3>
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="example@email.com"
                        className="settings-input"
                      />
                    </div>
                  </div>
                  <button className="btn-primary">Confirm</button>
                </div>
              )}

              {/* 2. Profile (FIXED & FULLY MAPPED) */}
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
                      <label>Handle & Location</label>
                      <input
                        type="text"
                        value={profileFormData.handle}
                        onChange={(e) =>
                          handleProfileInputChange("handle", e.target.value)
                        }
                        placeholder="@alex.okonkwo · Lagos, Nigeria"
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
                <div className="security-status-container">
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

                  <section className="settings sector">
                    <h3 className="dodo">Login Credentials</h3>
                    <div className="password info">
                      <p className="hint">Last Changed: 3 months ago</p>
                      <button className="btn-secondary">Update Password</button>
                    </div>
                  </section>

                  {/* Two-Factor Authentication Section */}
                  <section className="settings-section 2fa-config">
                    <div className="section-header">
                      <ShieldCheck size={20} color="#22c55e" />
                      <h3>Two-Factor Authentication (2FA)</h3>
                    </div>
                    <p className="sub-label">
                      Add an extra layer of security to your account
                    </p>
                    <div className="setting-row">
                      <div className="label-stack">
                        <span>Authenticator App</span>
                        <p className="sub-label">
                          Use app like Google Authenticator to generate codes
                        </p>
                      </div>
                      <button className="btn-secondary">Configure</button>
                    </div>

                    {/*Recovery Codes Area */}
                    <div className="recovery-codes-box">
                      <div className="label-stack">
                        <span>Backup Recovery Codes</span>
                        <p className="sub-label">
                          If you lose your phone, these codes will get you back
                          in.
                        </p>
                      </div>
                      <div className="codes-grid">
                        <span>8824-XT90</span>
                        <span>4412-PQ22</span>
                        <span>9001-BZ77</span>
                        <span>3345-LL10</span>
                      </div>
                      <button className="btn-text">Regenerate Codes</button>
                    </div>
                  </section>

                  {/* 4. Active Sessions */}
                  <section className="settings-section">
                    <h3>Where you're logged in</h3>
                    <div className="session-item">
                      <div className="session-icon">💻</div>
                      <div className="session-details">
                        <strong>Windows · Chrome</strong>
                        <span>
                          Lagos, Nigeria ·{" "}
                          <span className="active-now">Active Now</span>
                        </span>
                      </div>
                    </div>
                    <button className="text-btn-danger">
                      Sign out of all other devices
                    </button>
                  </section>
                </div>
              )}

              {/* 4. Notifications */}
              {activeTab === "notifications" && (
                <div className="notifications-flow fade-in">
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
                          Always notify me on New/incoming contents from groups
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

                  <div className="privacy">
                    <p> Privacy Settings</p>
                  </div>

                  <div className="setting-row">
                    <div className="setting-left">
                      <Tags size={20} color="#a855f7" />
                      <div className="label-stack">
                        <span>Tags</span>
                        <p className="sub-label">
                          Only notify when someone @mention you in group chats
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
                </div>
              )}

              {/* 5. THEMES */}
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
