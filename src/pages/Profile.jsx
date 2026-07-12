import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbarapp.jsx";
import Sidebar from "../../src/components/Sidebar.jsx";
import profileImage from "../../images/eeh.jpg";

export default function Profile({ currentTheme, onThemeChange }) {
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem("educonnect_profile_text");
      return saved
        ? JSON.parse(saved)
        : {
            name: "Alex Okonkwo",
            handle: "@alex.okonkwo · Lagos, Nigeria",
            bio: "Aspiring data scientist passionate about using Python and machine learning to solve real-world problems.",
          };
    } catch {
      return {
        name: "Alex Okonkwo",
        handle: "@alex.okonkwo · Lagos, Nigeria",
        bio: "Aspiring data scientist passionate about using Python and machine learning to solve real-world problems.",
      };
    }
  });

  const [currentAvatar, setCurrentAvatar] = useState(() => {
    return localStorage.getItem("educonnect_avatar") || profileImage;
  });

  const [currentCover, setCurrentCover] = useState(() => {
    return localStorage.getItem("educonnect_cover") || "";
  });

  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("educonnect_profile_text");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => setProfileData(parsed), 0);
      } catch (e) {
        console.error("Failed to parse profile data", e);
      }
    }
  }, []);

  const convertToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file, (base64String) => {
        try {
          setCurrentAvatar(base64String);
          localStorage.setItem("educonnect_avatar", base64String);
          window.dispatchEvent(new Event("avatarChanged"));
        } catch (error) {
          console.error("Storage limit reached!", error);
        }
      });
    }
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      convertToBase64(file, (base64String) => {
        try {
          setCurrentCover(base64String);
          localStorage.setItem("educonnect_cover", base64String);
        } catch (error) {
          console.error("Storage limit reached!", error);
        }
      });
    }
  };

  const handleShareClick = () => {
    const profileUrl = window.location.href;
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const [connections, setConnections] = useState(() => {
    return JSON.parse(localStorage.getItem("educonnect_connections") || "[]");
  });

  const handleConnect = (name) => {
    if (connections.includes(name)) return;
    const updated = [...connections, name];
    setConnections(updated);
    localStorage.setItem("educonnect_connections", JSON.stringify(updated));
  };

  return (
    <>
      <Navbar currentTheme={currentTheme} toggleTheme={onThemeChange} />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <div className="profile-hero">
            <div
              className="profile-cover"
              style={{
                backgroundImage: currentCover ? `url(${currentCover})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#6c757d",
              }}
            >
              <button
                className="profile-cover-edit"
                onClick={() => coverInputRef.current.click()}
              >
                Edit Cover
              </button>
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>

            <div className="profile-body">
              <div className="profile-avatar-row">
                <div className="avatar-wrapper">
                  <img
                    src={currentAvatar}
                    alt="Profile Avatar"
                    className="profile-avatar"
                    style={{ objectFit: "cover" }}
                  />
                  <button
                    className="avatar-edit-btn"
                    onClick={() => fileInputRef.current.click()}
                    type="button"
                  >
                    <img
                      src="https://api.iconify.design/lucide:pencil.svg"
                      alt="Edit"
                      className="pencil-icon-img"
                    />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
                <div className="profile-actions">
                  <button
                    className="btn-primary"
                    onClick={handleShareClick}
                    style={{
                      width: "130px",
                      height: "40px",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {copied ? "📋 Copied!" : "Share Profile"}
                  </button>
                  <Link
                    to="/settings"
                    state={{ activeSection: "profile" }}
                    className="btn-primary"
                    style={{
                      width: "130px",
                      height: "40px",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
              <h1 className="profile-name" style={{ marginTop: "15px" }}>
                {profileData.name}
              </h1>
              <p className="profile-handle">{profileData.handle}</p>
              <p className="profile-bio">{profileData.bio}</p>

              <div className="profile-tags">
                <span className="profile-tag">Python</span>
                <span className="profile-tag">Data Science</span>
                <span className="profile-tag">UI/UX</span>
                <span className="profile-tag">Open to Collaborate</span>
              </div>

              <div className="profile-meta-row">
                <span className="profile-meta-item">
                  📅 Joined January 2025
                </span>
                <span className="profile-meta-item">🔥 5-day streak</span>
                <span className="profile-meta-item">🏅 3 Certificates</span>
                <span className="profile-meta-item">👥 Python Cohort #4</span>
              </div>
            </div>
          </div>

          <div className="stats-strip">
            <div className="stat-card">
              <div className="stat-card-num">12</div>
              <div className="stat-card-lbl">Lessons Done</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num">3</div>
              <div className="stat-card-lbl">Projects Active</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num">8</div>
              <div className="stat-card-lbl">Group Members</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-num">1</div>
              <div className="stat-card-lbl">Certificates</div>
            </div>
          </div>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Achievements</h3>
              <Link to="/achievements" className="see-all">
                View all →
              </Link>
            </div>
            <div className="badges-grid">
              <div className="badge-item">
                <div className="badge-emoji">🔥</div>
                <p className="badge-name">Streak Starter</p>
                <p className="badge-sub">5-day streak</p>
              </div>
              <div className="badge-item">
                <div className="badge-emoji">🐍</div>
                <p className="badge-name">Python Basics</p>
                <p className="badge-sub">Course complete</p>
              </div>
              <div className="badge-item">
                <div className="badge-emoji">🤝</div>
                <p className="badge-name">Team Player</p>
                <p className="badge-sub">Joined a group</p>
              </div>
              <div className="badge-item">
                <div className="badge-emoji">📦</div>
                <p className="badge-name">First Project</p>
                <p className="badge-sub">Submitted draft</p>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Recent Activity</h3>
            </div>
            <div className="activity-panel">
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#dbeafe" }}>
                  📖
                </div>
                <div>
                  <p className="activity-text">
                    Completed module <strong>Intro to Pandas</strong> in Python
                    for Data Analysis
                  </p>
                  <p className="activity-time">Today · 2 hours ago</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#dcfce7" }}>
                  💬
                </div>
                <div>
                  <p className="activity-text">
                    Posted in <strong>Python Cohort #4</strong> group discussion
                  </p>
                  <p className="activity-time">Yesterday · Tuesday</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#fce7f3" }}>
                  🎨
                </div>
                <div>
                  <p className="activity-text">
                    Enrolled in <strong>UI/UX Design Fundamentals</strong>
                  </p>
                  <p className="activity-time">Monday</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot" style={{ background: "#fef3c7" }}>
                  🏅
                </div>
                <div>
                  <p className="activity-text">
                    Earned the <strong>Python Basics</strong> certificate
                  </p>
                  <p className="activity-time">March 28, 2025</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <aside className="card right-panel">
          <h3>Your Streak</h3>
          <div className="streak-banner">
            <div className="streak-num">🔥 5</div>
            <div className="streak-lbl">Day streak — keep it up!</div>
          </div>
          <div className="menu-divider menu-divider-sm"></div>
          <h3 className="mb-14">People You May Know</h3>
          <div className="connect-item">
            <div className="connect-avatar bg-green">C</div>
            <div className="connect-text">
              <p className="connect-name">Chioma Eze</p>
              <p className="connect-sub">Python Cohort #4</p>
            </div>
            <span
              className={`connect-btn ${connections.includes("Chioma Eze") ? "sent" : ""}`}
              onClick={() => handleConnect("Chioma Eze")}
            >
              {connections.includes("Chioma Eze") ? "✓ Sent" : "+ Connect"}
            </span>
          </div>

          <div className="connect-item">
            <div className="connect-avatar bg-yellow">D</div>
            <div className="connect-text">
              <p className="connect-name">David Mensah</p>
              <p className="connect-sub">Data Science path</p>
            </div>
            <span
              className={`connect-btn ${connections.includes("David Mensah") ? "sent" : ""}`}
              onClick={() => handleConnect("David Mensah")}
            >
              {connections.includes("David Mensah") ? "✓ Sent" : "+ Connect"}
            </span>
          </div>
        </aside>
      </div>
    </>
  );
}
