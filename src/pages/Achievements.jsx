import Navbar from "../components/Navbarapp.jsx";
import Sidebar from "../../src/components/Sidebar.jsx";

export default function Achievements({ currentTheme, onThemeChange }) {
  return (
    <>
      <Navbar currentTheme={currentTheme} onThemeChange={onThemeChange} />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Achievements</h1>
              <p className="page-sub">
                Celebrate your wins, track badges earned, and see your next
                milestones.
              </p>
            </div>
            <button className="btn-primary achievements">Share progress</button>
          </div>

          <div className="achievement-summary-banner">
            <p className="apb-label">Achievement Summary</p>
            <h2 className="apb-title">Your progress so far</h2>
            <div className="apb-meta">
              <span>8 badges earned</span>
              <span>3 certificates completed</span>
            </div>
          </div>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Achievement Summary</h3>
              <a href="#" className="see-all">
                View certificate list →
              </a>
            </div>
            <div className="milestones-grid">
              <div className="path-card">
                <div className="path-top">
                  <div className="path-badge">Badges</div>
                  <span className="path-week">8 earned</span>
                </div>
                <h4 className="path-name">Badge collection</h4>
                <p className="path-desc">
                  You’ve unlocked skill and streak badges across Python,
                  teamwork, and review work.
                </p>
                <div className="path-progress-wrap">
                  <div className="path-progress-fill w-80"></div>
                </div>
                <div className="path-meta">
                  <span>80% of milestones</span>
                  <span>Next: earn the Top Learner badge</span>
                </div>
              </div>
              <div className="path-card">
                <div className="path-top">
                  <div className="path-badge">Streak</div>
                  <span className="path-week">5 days</span>
                </div>
                <h4 className="path-name">Learning streak</h4>
                <p className="path-desc">
                  Keep your momentum going by completing lessons and staying
                  active in your cohort.
                </p>
                <div className="path-progress-wrap">
                  <div className="path-progress-fill w-100"></div>
                </div>
                <div className="path-meta">
                  <span>Daily activity</span>
                  <span>Next goal: 7-day streak</span>
                </div>
              </div>
              <div className="path-card">
                <div className="path-top">
                  <div className="path-badge">Certificates</div>
                  <span className="path-week">3 completed</span>
                </div>
                <h4 className="path-name">Course certificates</h4>
                <p className="path-desc">
                  Your completed certificates show progress in core learning
                  paths and applied project work.
                </p>
                <div className="path-progress-wrap">
                  <div className="path-progress-fill w-60"></div>
                </div>
                <div className="path-meta">
                  <span>3 of 5</span>
                  <span>Next: complete UI/UX module</span>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Badges Earned</h3>
              <a href="#" className="see-all">
                Explore more badges →
              </a>
            </div>
            <div className="badges-grid">
              <div className="badge-item">
                <div className="badge-emoji">🔥</div>
                <p className="badge-name">Streak Starter</p>
                <p className="badge-sub">5-day activity streak</p>
              </div>
              <div className="badge-item">
                <div className="badge-emoji">🐍</div>
                <p className="badge-name">Python Basics</p>
                <p className="badge-sub">Completed the Python path</p>
              </div>
              <div className="badge-item">
                <div className="badge-emoji">🤝</div>
                <p className="badge-name">Team Player</p>
                <p className="badge-sub">Joined a cohort group</p>
              </div>
              <div className="badge-item">
                <div className="badge-emoji">📦</div>
                <p className="badge-name">First Project</p>
                <p className="badge-sub">Submitted your first draft</p>
              </div>
              <div className="badge-item locked">
                <div className="badge-emoji">🏆</div>
                <p className="badge-name">Top Learner</p>
                <p className="badge-sub">Locked</p>
              </div>
              <div className="badge-item locked">
                <div className="badge-emoji">✍️</div>
                <p className="badge-name">Peer Reviewer</p>
                <p className="badge-sub">Locked</p>
              </div>
              <div className="badge-item locked">
                <div className="badge-emoji">🎓</div>
                <p className="badge-name">Graduated</p>
                <p className="badge-sub">Locked</p>
              </div>
              <div className="badge-item locked">
                <div className="badge-emoji">💡</div>
                <p className="badge-name">Innovator</p>
                <p className="badge-sub">Locked</p>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Next Milestones</h3>
              <span className="badge-count">3 / 5 complete</span>
            </div>
            <div className="milestones-grid">
              <div className="milestone done">
                <div className="ms-check">✓</div>
                <div>
                  <p className="ms-title">Earn the Peer Reviewer badge</p>
                  <p className="ms-sub">Complete two reviews by Sunday</p>
                </div>
              </div>
              <div className="milestone done">
                <div className="ms-check">✓</div>
                <div>
                  <p className="ms-title">Submit final project</p>
                  <p className="ms-sub">Due Friday 11:59 PM</p>
                </div>
              </div>
              <div className="milestone">
                <div className="ms-check pending">○</div>
                <div>
                  <p className="ms-title">Gain the Top Learner badge</p>
                  <p className="ms-sub">Finish two more courses</p>
                </div>
              </div>
              <div className="milestone">
                <div className="ms-check pending">○</div>
                <div>
                  <p className="ms-title">Complete UI/UX Fundamentals</p>
                  <p className="ms-sub">Unlock the next certificate</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* UPDATED RIGHT SIDEBAR CONTAINER */}
        <aside className="card trending right-panel">
          <h3>Additional Insights</h3>

          {/* 1. Streak Summary */}
          <div className="trend-item" style={{ marginBottom: "15px" }}>
            <div className="trend-info">
              <span className="trend-icon bg-blue">St</span>
              <div>
                <p className="trend-name" style={{ margin: 0 }}>
                  Streak Summary
                </p>
                <p className="trend-sub" style={{ margin: 0 }}>
                  Keep momentum going
                </p>
              </div>
            </div>
            <span className="trend-badge new">New</span>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e2e8f0",
              margin: "15px 0",
            }}
          />

          {/* 2. Cohort Rank / Leaderboard */}
          <div className="trend-item" style={{ marginBottom: "15px" }}>
            <div className="trend-info">
              <span
                className="trend-icon"
                style={{
                  backgroundColor: "#f3e8ff",
                  color: "#a855f7",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                🏆
              </span>
              <div>
                <p className="trend-name" style={{ margin: 0 }}>
                  Cohort Rank
                </p>
                <p className="trend-sub" style={{ margin: 0 }}>
                  Top 10% this week
                </p>
              </div>
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #e2e8f0",
              margin: "15px 0",
            }}
          />

          {/* 3. Upcoming Badge Milestone */}
          <div className="trend-item">
            <div className="trend-info">
              <span
                className="trend-icon"
                style={{
                  backgroundColor: "#fef3c7",
                  color: "#d97706",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                ⚡
              </span>
              <div>
                <p className="trend-name" style={{ margin: 0 }}>
                  Next Badge
                </p>
                <p className="trend-sub" style={{ margin: 0 }}>
                  Top Learner (2 tasks left)
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
