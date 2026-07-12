import Navbar from "../components/Navbarapp.jsx";
import Sidebar from "../../src/components/Sidebar.jsx";
import { useState, useRef } from "react";
import { Search, X } from "lucide-react";

export default function Projects({ currentTheme, onThemeChange }) {
  const ALL_PROJECTS = [
    {
      name: "Sales Data Dashboard",
      desc: "Build an interactive analytics dashboard...",
    },
    { name: "Customer Segmentation Model", desc: "Train clustering models..." },
    {
      name: "Visualisation Prototype",
      desc: "Design the concept and wireframes...",
    },
  ];

  const [activeTab, setActiveTab] = useState("Active");
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const suggestions = ALL_PROJECTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.desc.toLowerCase().includes(query.toLowerCase()),
  );

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <>
      <Navbar currentTheme={currentTheme} toggleTheme={onThemeChange} />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">My Projects</h1>
              <p className="page-sub">
                Welcome back, <strong>Alex Okonkwo</strong>. Track your active
                work, upcoming deadlines, and peer review tasks.
              </p>
            </div>
            <button className="btn-primary project">+ New Project</button>
          </div>

          <div className="filter-tabs">
            {["Active", "Draft", "Reviews"].map((tab) => (
              <button
                key={tab}
                className={`tab project ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Smart Search Bar */}
          <div className="smart-search-wrap" style={{ marginBottom: "20px" }}>
            <div className="smart-search-box">
              <Search size={16} className="smart-search-icon" />
              <input
                ref={inputRef}
                className="smart-search-input"
                type="text"
                value={query}
                placeholder="Search projects by name or description..."
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              />
              {query && (
                <button className="smart-search-clear" onClick={clearSearch}>
                  <X size={14} />
                </button>
              )}
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="smart-search-suggestions">
                {suggestions.map((p, i) => (
                  <div
                    key={i}
                    className="smart-search-suggestion-item"
                    onMouseDown={() => {
                      setQuery(p.name);
                      setShowSuggestions(false);
                    }}
                  >
                    <p className="suggestion-name">{p.name}</p>
                    <p className="suggestion-desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Active Projects</h3>

              <a href="#" className="see-all">
                View all →
              </a>
            </div>

            <div className="milestones-grid">
              <div className="path-card">
                <div className="path-top">
                  <div className="path-badge">In Progress</div>

                  <span className="path-week">Due Fri 11:59 PM</span>
                </div>

                <h4 className="path-name">Sales Data Dashboard</h4>

                <p className="path-desc">
                  Build an interactive analytics dashboard using Python, pandas,
                  and data visualisation tools.
                </p>

                <div className="path-progress-wrap">
                  <div className="path-progress-fill w-62"></div>
                </div>

                <div className="path-meta">
                  <span>62% complete</span>

                  <span>Next: Finalise charts and export filters</span>
                </div>
              </div>

              <div className="path-card">
                <div className="path-top">
                  <div className="path-badge">Review</div>

                  <span className="path-week">Peer review due Sun</span>
                </div>

                <h4 className="path-name">Customer Segmentation Model</h4>

                <p className="path-desc">
                  Train clustering models and summarise customer segments for
                  the cohort review.
                </p>

                <div className="path-progress-wrap">
                  <div className="path-progress-fill w-45"></div>
                </div>

                <div className="path-meta">
                  <span>45% complete</span>

                  <span>Next: Update model summary and charts</span>
                </div>
              </div>

              <div className="path-card">
                <div className="path-top">
                  <div className="path-badge">Planning</div>

                  <span className="path-week">Workshop Sat 2:00 PM</span>
                </div>

                <h4 className="path-name">Visualisation Prototype</h4>

                <p className="path-desc">
                  Design the concept and wireframes for a data storytelling
                  dashboard.
                </p>

                <div className="path-progress-wrap">
                  <div className="path-progress-fill w-18"></div>
                </div>

                <div className="path-meta">
                  <span>18% complete</span>

                  <span>Next: Sketch the homepage layout</span>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Project Milestones</h3>

              <span className="badge-count">2 / 4 done</span>
            </div>

            <div className="milestones-grid">
              <div className="milestone done">
                <div className="ms-check">✓</div>

                <div>
                  <p className="ms-title">Draft project outline</p>

                  <p className="ms-sub">Completed Wednesday</p>
                </div>
              </div>

              <div className="milestone done">
                <div className="ms-check">✓</div>

                <div>
                  <p className="ms-title">Gather dataset</p>

                  <p className="ms-sub">Completed Thursday</p>
                </div>
              </div>

              <div className="milestone">
                <div className="ms-check pending">○</div>

                <div>
                  <p className="ms-title">Submit project draft</p>

                  <p className="ms-sub">Due Friday</p>
                </div>
              </div>

              <div className="milestone">
                <div className="ms-check pending">○</div>

                <div>
                  <p className="ms-title">Peer review (2 projects)</p>

                  <p className="ms-sub">Due Sunday</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Project Team</h3>

              <a href="#" className="see-all">
                Manage team →
              </a>
            </div>

            <div className="group-card">
              <div className="group-info">
                <p className="group-name">🐍 Python Cohort #4</p>

                <p className="group-checkin">
                  Next check-in: <strong>Friday 6 PM</strong>
                </p>
              </div>

              <div className="members-row">
                <div className="member-avatar bg-blue" title="You">
                  A
                </div>

                <div className="member-avatar bg-green" title="Chioma">
                  C
                </div>

                <div className="member-avatar bg-yellow" title="David">
                  D
                </div>

                <div className="member-avatar bg-pink" title="Fatima">
                  F
                </div>

                <div className="member-avatar bg-purple" title="Kwame">
                  K
                </div>

                <div className="member-more">+3</div>
              </div>
            </div>
          </section>
        </main>

        <aside className="card trending">
          <h3>Active Projects</h3>

          <div className="trend-item">
            <div className="trend-info">
              <span className="trend-icon bg-blue">Ap</span>

              <div>
                <p className="trend-name">Web Application</p>

                <p className="trend-sub">Application Build</p>
              </div>
            </div>

            <span className="trend-badge hot">🔥 Hot</span>
          </div>

          <div className="trend-item">
            <div className="trend-info">
              <span className="trend-icon bg-green">Da</span>

              <div>
                <p className="trend-name">Data Analysis</p>

                <p className="trend-sub">Progress Tracking</p>
              </div>
            </div>

            <span className="trend-badge new">New</span>
          </div>
        </aside>
      </div>
    </>
  );
}
