import Navbar from "../components/Navbarapp.jsx";
import Sidebar from "../../src/components/Sidebar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ currentTheme, onThemeChange }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token) {
      navigate("/auth/login");
      return;
    }

    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(JSON.parse(user));
    }

    setLoadingProfile(false);
  }, [navigate]);

  // Real time-based greeting instead of hardcoded "Good Morning"
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      <Navbar currentTheme={currentTheme} toggleTheme={onThemeChange} />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <div className="welcome-banner">
            <div className="welcome-text">
              <p className="welcome-sub">{getGreeting()} 👋</p>
              <h2 className="welcome-name">
                Welcome{profile?.role === "facilitator" ? "" : " Back"},{" "}
                {loadingProfile
                  ? "..."
                  : profile
                    ? profile.first_name
                    : "there"}
              </h2>
              <p className="welcome-desc">
                {profile?.role === "facilitator"
                  ? "Here's what's happening with your groups."
                  : "Let's pick up where you left off."}
              </p>
            </div>
            <div className="welcome-stats">
              <div className="stat-chip">
                <span className="stat-num">—</span>
                <span className="stat-lbl">Lessons Done</span>
              </div>
              <div className="stat-chip">
                <span className="stat-num">—</span>
                <span className="stat-lbl">Projects Active</span>
              </div>
              <div className="stat-chip">
                <span className="stat-num">—</span>
                <span className="stat-lbl">Group Members</span>
              </div>
            </div>
          </div>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Current Learning Path</h3>
              <a href="#" className="see-all">
                See all →
              </a>
            </div>
            <div className="path-card">
              <div className="path-top">
                <div className="path-badge">Coming Soon</div>
              </div>
              <h4 className="path-name">No active learning path yet</h4>
              <p className="path-desc">
                Once you select a track and join a Growth Group, your learning
                path will show up here.
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">This Week's Milestones</h3>
              <span className="badge-count">Coming Soon</span>
            </div>
            <div className="milestones-grid">
              <div className="milestone">
                <div className="ms-check pending">○</div>
                <div>
                  <p className="ms-title">
                    Milestones launch with Growth Groups
                  </p>
                  <p className="ms-sub">Available in a future update</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Accountability Group</h3>
              <span className="badge-count">Coming Soon</span>
            </div>
            <div className="group-card">
              <div className="group-info">
                <p className="group-name">You haven't joined a group yet</p>
                <p className="group-checkin">
                  Growth Groups are launching soon — check back here.
                </p>
              </div>
            </div>
          </section>
        </main>

        <aside className="card trending">
          <h3>Trending Skills</h3>
          <div className="trend-item">
            <div className="trend-info">
              <span className="trend-icon bg-blue">Py</span>
              <div>
                <p className="trend-name">Python</p>
                <p className="trend-sub">Data & Automation</p>
              </div>
            </div>
            <span className="trend-badge hot">🔥 Hot</span>
          </div>
          <div className="trend-item">
            <div className="trend-info">
              <span className="trend-icon bg-green">UI</span>
              <div>
                <p className="trend-name">UI/UX Design</p>
                <p className="trend-sub">Figma + Research</p>
              </div>
            </div>
            <span className="trend-badge new">New</span>
          </div>
          <div className="trend-item">
            <div className="trend-info">
              <span className="trend-icon bg-yellow">ML</span>
              <div>
                <p className="trend-name">Machine Learning</p>
                <p className="trend-sub">Sci-kit, TensorFlow</p>
              </div>
            </div>
            <span className="trend-badge rising">↑ Rising</span>
          </div>
          <div className="trend-item">
            <div className="trend-info">
              <span className="trend-icon bg-pink">Biz</span>
              <div>
                <p className="trend-name">Business Writing</p>
                <p className="trend-sub">Proposals & Pitches</p>
              </div>
            </div>
            <span className="trend-badge">Popular</span>
          </div>
          <div className="menu-divider menu-divider-lg"></div>
          <h3 className="mb-14">Upcoming Events</h3>
          <div className="event-item">
            <div className="event-date">
              <span className="ev-day">—</span>
              <span className="ev-num">—</span>
            </div>
            <div className="event-info">
              <p className="event-name">No events scheduled yet</p>
              <p className="event-sub">Check back once Growth Groups launch</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
