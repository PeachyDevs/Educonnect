import Navbar from "../components/Navbarapp.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import "../dashboard.css";

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

export default function Projects() {
  const [activeTab, setActiveTab] = useState("Active");
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjectsData({
        projects: ALL_PROJECTS,
      });
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const suggestions = (projectsData?.projects || ALL_PROJECTS).filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.desc.toLowerCase().includes(query.toLowerCase()),
  );

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // ==========================================================================
  // LOADING SKELETON RENDER
  // ==========================================================================
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <Sidebar />
          <main className="main-content">
            {/* Header Skeleton */}
            <div className="page-header">
              <div>
                <div
                  className="skeleton-element skel-title"
                  style={{ width: "220px", height: "36px", marginTop: 0 }}
                ></div>
                <div
                  className="skeleton-element skel-desc"
                  style={{ width: "380px", height: "14px", marginTop: "8px" }}
                ></div>
              </div>
              <div
                className="skeleton-element"
                style={{
                  width: "130px",
                  height: "40px",
                  borderRadius: "0.75rem",
                }}
              ></div>
            </div>

            {/* Filter Tabs Skeleton */}
            <div
              className="filter-tabs"
              style={{ gap: "0.75rem", marginBottom: "1.5rem" }}
            >
              <div
                className="skeleton-element"
                style={{
                  width: "80px",
                  height: "36px",
                  borderRadius: "0.75rem",
                }}
              ></div>
              <div
                className="skeleton-element"
                style={{
                  width: "70px",
                  height: "36px",
                  borderRadius: "0.75rem",
                }}
              ></div>
              <div
                className="skeleton-element"
                style={{
                  width: "85px",
                  height: "36px",
                  borderRadius: "0.75rem",
                }}
              ></div>
            </div>

            {/* Search Bar Skeleton */}
            <div
              className="skeleton-element"
              style={{
                width: "100%",
                height: "52px",
                borderRadius: "1rem",
                marginBottom: "20px",
              }}
            ></div>

            {/* Active Projects Section Skeleton */}
            <section className="section">
              <div className="section-header">
                <div
                  className="skeleton-element skel-title"
                  style={{ width: "150px", height: "20px", marginTop: 0 }}
                ></div>
                <div
                  className="skeleton-element"
                  style={{ width: "70px", height: "16px" }}
                ></div>
              </div>

              <div className="milestones-grid">
                {[1, 2, 3].map((item) => (
                  <div
                    className="path-card"
                    key={`skel-proj-${item}`}
                    style={{ minHeight: "200px" }}
                  >
                    <div className="path-top">
                      <div
                        className="skeleton-element skel-badge"
                        style={{ width: "90px" }}
                      ></div>
                      <div
                        className="skeleton-element"
                        style={{ width: "80px", height: "12px" }}
                      ></div>
                    </div>
                    <div
                      className="skeleton-element skel-title"
                      style={{ height: "20px", marginTop: "0.5rem" }}
                    ></div>
                    <div
                      className="skeleton-element skel-desc"
                      style={{ marginTop: "0.75rem" }}
                    ></div>
                    <div className="skeleton-element skel-desc short"></div>
                    <div
                      className="skeleton-element skel-progress"
                      style={{ marginTop: "1.25rem" }}
                    ></div>
                    <div className="path-meta" style={{ marginTop: "1rem" }}>
                      <div
                        className="skeleton-element"
                        style={{ width: "80px", height: "12px" }}
                      ></div>
                      <div
                        className="skeleton-element"
                        style={{ width: "120px", height: "12px" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Milestones Section Skeleton */}
            <section className="section">
              <div className="section-header">
                <div
                  className="skeleton-element skel-title"
                  style={{ width: "160px", height: "20px", marginTop: 0 }}
                ></div>
                <div
                  className="skeleton-element"
                  style={{
                    width: "60px",
                    height: "20px",
                    borderRadius: "1rem",
                  }}
                ></div>
              </div>

              <div className="milestones-grid">
                {[1, 2, 3, 4].map((item) => (
                  <div className="milestone" key={`skel-ms-${item}`}>
                    <div
                      className="skeleton-element"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <div style={{ flex: 1 }}>
                      <div
                        className="skeleton-element skel-title"
                        style={{ width: "70%", height: "16px", marginTop: 0 }}
                      ></div>
                      <div
                        className="skeleton-element skel-desc"
                        style={{
                          width: "40%",
                          height: "12px",
                          marginTop: "4px",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Team Section Skeleton */}
            <section className="section">
              <div className="section-header">
                <div
                  className="skeleton-element skel-title"
                  style={{ width: "130px", height: "20px", marginTop: 0 }}
                ></div>
                <div
                  className="skeleton-element"
                  style={{ width: "90px", height: "16px" }}
                ></div>
              </div>

              <div className="group-card">
                <div>
                  <div
                    className="skeleton-element skel-title"
                    style={{ width: "160px", height: "18px", marginTop: 0 }}
                  ></div>
                  <div
                    className="skeleton-element skel-desc"
                    style={{ width: "120px", height: "14px", marginTop: "6px" }}
                  ></div>
                </div>
                <div className="members-row" style={{ gap: "4px" }}>
                  {[1, 2, 3, 4, 5].map((avatar) => (
                    <div
                      key={avatar}
                      className="skeleton-element"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </>
    );
  }

  // ==========================================================================
  // REAL-TIME CONTENT RENDER
  // ==========================================================================
  return (
    <>
      <Navbar />
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
      </div>
    </>
  );
}
