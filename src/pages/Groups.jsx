import Navbar from "../components/Navbarapp.jsx";
import Sidebar from "../../src/components/Sidebar.jsx";
import { useState } from "react"; // Added useState

export default function Groups() {
  // 1. Initialize state to track which tab is clicked
  const [activeTab, setActiveTab] = useState("My Groups");

  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Groups</h1>
              <p className="page-sub">
                Stay accountable and grow with your peers
              </p>
            </div>
            <button className="btn-primary groups">+ Create Group</button>
          </div>

          <div className="filter-tabs">
            {["My groups", "Discovered", "Invite"].map((tab) => (
              <button
                key={tab}
                className={`tab groups ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">My Accountability Group</h3>
            </div>
            <div className="my-group-card">
              <div className="mgc-header">
                <h2 className="mgc-title">🐍 Python Cohort #4</h2>
                <span className="mgc-badge">Active</span>
              </div>
              <p className="mgc-desc">
                A focused group of 8 learners working through the Python for
                Data Analysis path together. Weekly check-ins every Friday.
              </p>
              <div className="mgc-members">
                <div className="mgc-avatar bg-blue">A</div>
                <div className="mgc-avatar bg-green">C</div>
                <div className="mgc-avatar bg-yellow">D</div>
                <div className="mgc-avatar bg-pink">F</div>
                <div className="mgc-avatar bg-purple">K</div>
                <div className="mgc-more">+3</div>
              </div>
              <div className="mgc-footer">
                <span className="mgc-next">
                  📅 Next check-in: <strong>Friday 6 PM</strong>
                </span>
                <button className="mgc-btn">Open Group →</button>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Group Discussion</h3>
              <a href="#" className="see-all">
                View all →
              </a>
            </div>
            <div className="feed-wrap">
              <div className="feed-post">
                <div className="feed-post-header">
                  <div
                    className="feed-avatar"
                    style={{ background: "#bbf7d0", color: "#15803d" }}
                  >
                    C
                  </div>
                  <div>
                    <p className="feed-name">Chioma Eze</p>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      Python Cohort #4
                    </p>
                  </div>
                  <span className="feed-time">2h ago</span>
                </div>
                <p className="feed-body">
                  Just finished the <strong>Intro to Pandas</strong> module! The
                  groupby section was tricky but finally got it. Anyone else
                  find merge vs join confusing? 😅
                </p>
                <div className="feed-actions">
                  <span className="feed-action">👍 4 Likes</span>
                  <span className="feed-action">💬 3 Replies</span>
                  <span className="feed-action">🔁 Share</span>
                </div>
              </div>

              <div className="feed-post">
                <div className="feed-post-header">
                  <div
                    className="feed-avatar"
                    style={{ background: "#fde68a", color: "#92400e" }}
                  >
                    D
                  </div>
                  <div>
                    <p className="feed-name">David Mensah</p>
                    <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      Python Cohort #4
                    </p>
                  </div>
                  <span className="feed-time">Yesterday</span>
                </div>
                <p className="feed-body">
                  Reminder that our project drafts are due{" "}
                  <strong>Friday 11:59 PM</strong>! 🚨 I'm about 60% done with
                  mine. How's everyone else doing? Drop your status below 👇
                </p>
                <div className="feed-actions">
                  <span className="feed-action">👍 7 Likes</span>
                  <span className="feed-action">💬 5 Replies</span>
                  <span className="feed-action">🔁 Share</span>
                </div>
              </div>

              <div className="feed-compose">
                <div
                  className="feed-avatar"
                  style={{
                    background: "#bfdbfe",
                    color: "#1d4ed8",
                    width: "32px",
                    height: "32px",
                    fontSize: "12px",
                  }}
                >
                  A
                </div>
                <input
                  className="compose-input"
                  type="text"
                  placeholder="Share an update with your group…"
                />
                <button className="compose-btn">Post</button>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Discover Groups</h3>
              <a href="#" className="see-all">
                Browse all →
              </a>
            </div>
            <div className="discover-grid">
              <div className="disc-card">
                <div className="disc-card-top">
                  <span className="disc-emoji">🤖</span>
                  <span className="disc-size">12 members</span>
                </div>
                <p className="disc-name">ML Study Circle</p>
                <p className="disc-desc">
                  Weekly deep-dives into machine learning papers and Kaggle
                  competitions. All levels welcome.
                </p>
                <button className="disc-footer">Join group</button>
              </div>
            </div>
            <div className="discover-grid">
              <div className="disc-card">
                <div className="disc-card-top">
                  <span className="disc-emoji">֎🇦🇮</span>
                  <span className="disc-size">20 members</span>
                </div>
                <p className="disc-name">Deep Learning Enthusiasts</p>
                <p className="disc-desc">
                  study group for deep learning, neural networks, and AI
                  research. We share papers, tutorials, and projects.
                </p>
                <button className="disc-footer">Join group</button>
              </div>
            </div>
          </section>
        </main>

        <aside className="card trending">
          <h3>Group Spotlight</h3>
          <div className="trend-item">
            <div className="trend-info">
              <span className="trend-icon bg-blue">Py</span>
              <div>
                <p className="trend-name">Python Cohort #4</p>
                <p className="trend-sub">Weekly check-ins</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
