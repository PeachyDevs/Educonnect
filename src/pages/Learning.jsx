import Navbar from "../components/Navbarapp.jsx";
import Sidebar from "../../src/components/Sidebar.jsx";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import "../dashboard.css";

const ALL_PATHS = [
  {
    name: "Python for Data Analysis",
    desc: "Master pandas, NumPy, and data visualisation through hands-on projects.",
    tag: "Enrolled",
    icon: "🐍",
    color: "bg-blue",
  },
  {
    name: "UI/UX Design Fundamentals",
    desc: "Learn Figma, user research, wireframing, and design systems from scratch.",
    tag: "Enrolled",
    icon: "🎨",
    color: "bg-pink",
  },
  {
    name: "Machine Learning Basics",
    desc: "Sci-kit Learn, model evaluation, regression and classification projects.",
    tag: "Popular",
    icon: "🤖",
    color: "bg-green",
  },
  {
    name: "Business Writing",
    desc: "Craft compelling proposals, pitch decks, and professional communications.",
    tag: "New",
    icon: "✍️",
    color: "bg-yellow",
  },
  {
    name: "Web Development",
    desc: "HTML, CSS, JavaScript, and React — build real products step by step.",
    tag: "Available",
    icon: "🌐",
    color: "bg-purple",
  },
  {
    name: "Financial Literacy",
    desc: "Budgeting, investing, and understanding financial statements for professionals.",
    tag: "Rising",
    icon: "📊",
    color: "bg-pink",
  },
];

export default function Learning({ currentTheme, onThemeChange }) {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [learningData, setLearningData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLearningData({
        paths: ALL_PATHS,
      });
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const suggestions =
    query.trim().length > 0
      ? (learningData?.paths || ALL_PATHS).filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.desc.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // ==========================================================================
  // LOADING SKELETON RENDER (Stacked 2-Column Layout)
  // ==========================================================================
  if (isLoading) {
    return (
      <>
        <Navbar currentTheme={currentTheme} onThemeChange={onThemeChange} />
        <div className="container">
          <Sidebar />

          <main className="main-content">
            {/* Header Skeleton */}
            <div className="page-header">
              <div>
                <div
                  className="skeleton-element skel-title"
                  style={{ width: "200px", height: "36px", marginTop: 0 }}
                ></div>
                <div
                  className="skeleton-element skel-desc"
                  style={{ width: "300px", height: "14px" }}
                ></div>
              </div>
            </div>

            {/* Search Bar Skeleton */}
            <div
              className="skeleton-element"
              style={{
                width: "100%",
                height: "56px",
                borderRadius: "1rem",
                marginTop: "1.5rem",
              }}
            ></div>

            {/* Active Path Banner Skeleton */}
            <div className="active-path-banner" style={{ marginTop: "2rem" }}>
              <div
                className="skeleton-element skel-banner-meta"
                style={{ width: "100px" }}
              ></div>
              <div className="skeleton-element skel-banner-title"></div>
              <div className="apb-meta">
                <div className="skeleton-element skel-banner-meta"></div>
                <div className="skeleton-element skel-banner-meta"></div>
              </div>
              <div
                className="skeleton-element skel-progress"
                style={{ marginTop: "1.25rem" }}
              ></div>
              <div className="apb-bottom" style={{ marginTop: "1rem" }}>
                <div
                  className="skeleton-element skel-banner-meta"
                  style={{ width: "150px" }}
                ></div>
                <div
                  className="skeleton-element"
                  style={{
                    width: "140px",
                    height: "36px",
                    borderRadius: "0.75rem",
                  }}
                ></div>
              </div>
            </div>

            {/* Sections & Cards Skeleton Grid */}
            <section className="section" style={{ padding: "1.25rem 0" }}>
              <div className="section-header">
                <div
                  className="skeleton-element skel-title"
                  style={{ width: "150px", marginTop: 0, height: "20px" }}
                ></div>
              </div>

              <div className="paths-grid">
                <div className="path-card" style={{ minHeight: "220px" }}>
                  <div className="path-card-top">
                    <div className="skeleton-element skel-icon"></div>
                    <div className="skeleton-element skel-badge"></div>
                  </div>
                  <div
                    className="skeleton-element skel-title"
                    style={{ height: "20px" }}
                  ></div>
                  <div className="skeleton-element skel-desc"></div>
                  <div className="skeleton-element skel-desc short"></div>
                  <div className="skeleton-element skel-progress"></div>
                  <div
                    className="path-card-footer"
                    style={{ borderTop: "none", paddingTop: 0 }}
                  >
                    <div className="skeleton-element skel-footer-item"></div>
                    <div className="skeleton-element skel-footer-item"></div>
                  </div>
                </div>

                <div className="path-card" style={{ minHeight: "220px" }}>
                  <div className="path-card-top">
                    <div className="skeleton-element skel-icon"></div>
                    <div className="skeleton-element skel-badge"></div>
                  </div>
                  <div
                    className="skeleton-element skel-title"
                    style={{ height: "20px" }}
                  ></div>
                  <div className="skeleton-element skel-desc"></div>
                  <div className="skeleton-element skel-desc short"></div>
                  <div className="skeleton-element skel-progress"></div>
                  <div
                    className="path-card-footer"
                    style={{ borderTop: "none", paddingTop: 0 }}
                  >
                    <div className="skeleton-element skel-footer-item"></div>
                    <div className="skeleton-element skel-footer-item"></div>
                  </div>
                </div>

                <div className="path-card" style={{ minHeight: "220px" }}>
                  <div className="path-card-top">
                    <div className="skeleton-element skel-icon"></div>
                    <div className="skeleton-element skel-badge"></div>
                  </div>
                  <div
                    className="skeleton-element skel-title"
                    style={{ height: "20px" }}
                  ></div>
                  <div className="skeleton-element skel-desc"></div>
                  <div className="skeleton-element skel-desc short"></div>
                  <div className="skeleton-element skel-progress"></div>
                  <div
                    className="path-card-footer"
                    style={{ borderTop: "none", paddingTop: 0 }}
                  >
                    <div className="skeleton-element skel-footer-item"></div>
                    <div className="skeleton-element skel-footer-item"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Progress & Certificates Card Stacked at Bottom */}
            <div
              className="card trending"
              style={{
                marginTop: "2rem",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                className="skeleton-element skel-title"
                style={{ width: "120px", height: "18px", marginTop: 0 }}
              ></div>
              <div className="stat-row" style={{ marginTop: "1rem" }}>
                <div
                  className="skeleton-element"
                  style={{ height: "70px", borderRadius: "0.875rem" }}
                ></div>
                <div
                  className="skeleton-element"
                  style={{ height: "70px", borderRadius: "0.875rem" }}
                ></div>
                <div
                  className="skeleton-element"
                  style={{ height: "70px", borderRadius: "0.875rem" }}
                ></div>
              </div>
              <div
                className="menu-divider menu-divider-md"
                style={{ margin: "1.5rem 0" }}
              ></div>
              <div
                className="skeleton-element skel-title"
                style={{ width: "100px", marginBottom: "1rem" }}
              ></div>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="cert-item"
                  style={{
                    border: "none",
                    padding: "0.5rem 0",
                    background: "transparent",
                  }}
                >
                  <div
                    className="skeleton-element skel-icon"
                    style={{ width: "38px", height: "38px" }}
                  ></div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="skeleton-element skel-title"
                      style={{ width: "60%", marginTop: 0 }}
                    ></div>
                    <div
                      className="skeleton-element skel-desc"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </>
    );
  }

  // ==========================================================================
  // REAL-TIME CONTENT RENDER (Stacked 2-Column Layout)
  // ==========================================================================
  return (
    <>
      <Navbar currentTheme={currentTheme} onThemeChange={onThemeChange} />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Learning Path</h1>
              <p className="page-sub">
                Explore structured paths to build real-world skills...
              </p>
            </div>
            <div className="filter-tabs">
              {["All", "Enrolled", "Completed", "Saved"].map((tab) => (
                <button
                  key={tab}
                  className={`tab learning ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="smart-search-wrap">
            <div className="smart-search-box">
              <Search size={16} className="smart-search-icon" />
              <input
                ref={inputRef}
                className="smart-search-input"
                type="text"
                value={query}
                placeholder="Search learning paths, skills, or topics…"
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
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="smart-search-suggestion-item"
                    onMouseDown={() => handleSuggestionClick(s.name)}
                  >
                    <span className="suggestion-icon">{s.icon}</span>
                    <div>
                      <p className="suggestion-name">{s.name}</p>
                      <p className="suggestion-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showSuggestions &&
              query.trim().length > 0 &&
              suggestions.length === 0 && (
                <div className="smart-search-suggestions">
                  <div className="smart-search-empty">
                    No results found for "{query}"
                  </div>
                </div>
              )}
          </div>

          <div className="active-path-banner">
            <p className="apb-label">Currently Active</p>
            <h2 className="apb-title">Python for Data Analysis</h2>
            <div className="apb-meta">
              <span>Week 3 of 8</span>
              <span>Next: Data Cleaning with Pandas</span>
              <span>~2 hrs left this week</span>
            </div>
            <div className="apb-progress-wrap">
              <div className="apb-progress-fill w-37"></div>
            </div>
            <div className="apb-bottom">
              <span className="apb-pct">
                37% complete · 5 of 13 modules done
              </span>
              <button className="apb-btn">Continue Learning →</button>
            </div>
          </div>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">My Enrolled Paths</h3>
              <a href="#" className="see-all">
                See all →
              </a>
            </div>
            <div className="paths-grid">
              {learningData.paths
                .filter((p) => p.tag === "Enrolled")
                .map((p, i) => (
                  <div className="path-card" key={`enrolled-${i}`}>
                    <div className="path-card-top">
                      <div className={`path-icon ${p.color}`}>{p.icon}</div>
                      <span className="path-enroll-badge badge-enrolled">
                        {p.tag}
                      </span>
                    </div>
                    <p className="path-card-name">{p.name}</p>
                    <p className="path-card-desc">{p.desc}</p>
                    <div
                      className="path-card-progress-wrap"
                      style={{ marginTop: "auto" }}
                    >
                      <div
                        className={`path-card-progress-fill ${i === 0 ? "w-37" : "w-12"}`}
                      ></div>
                    </div>
                    <div className="path-card-footer">
                      <span>{i === 0 ? "37%" : "12%"} complete</span>
                      <span className="duration">
                        ⏱ {i === 0 ? "8 weeks" : "6 weeks"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Explore More Paths</h3>
              <a href="#" className="see-all">
                Browse all →
              </a>
            </div>
            <div className="paths-grid">
              {learningData.paths
                .filter((p) => p.tag !== "Enrolled")
                .filter((p) =>
                  query
                    ? p.name.toLowerCase().includes(query.toLowerCase())
                    : true,
                )
                .map((p, i) => (
                  <div className="path-card" key={`explore-${i}`}>
                    <div className="path-card-top">
                      <div className={`path-icon ${p.color}`}>{p.icon}</div>
                      <span className="path-enroll-badge badge-available">
                        {p.tag}
                      </span>
                    </div>
                    <p className="path-card-name">{p.name}</p>
                    <p className="path-card-desc">{p.desc}</p>
                    <div className="path-card-footer mt-6">
                      <span>⭐ 4.8</span>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Progress & Certificates Section Stacked at Bottom */}
          <div
            className="card trending"
            style={{
              marginTop: "2.5rem",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h3>Your Progress</h3>
            <div className="stat-row">
              <div className="stat-box">
                <div className="stat-box-num">2</div>
                <div className="stat-box-lbl">Active Paths</div>
              </div>
              <div className="stat-box">
                <div className="stat-box-num">12</div>
                <div className="stat-box-lbl">Modules Done</div>
              </div>
              <div className="stat-box">
                <div className="stat-box-num">1</div>
                <div className="stat-box-lbl">Completed Paths</div>
              </div>
            </div>
            <div className="menu-divider menu-divider-md"></div>
            <h3 className="mb-14">Certificates</h3>
            <div className="cert-item">
              <div className="cert-icon blue large">🏅</div>
              <div>
                <p className="cert-name">Intro to Python</p>
                <p className="cert-status green">✓ Earned · March 2025</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon yellow large">🎯</div>
              <div>
                <p className="cert-name">Data Analysis</p>
                <p className="cert-status yellow">In progress · 37%</p>
              </div>
            </div>
            <div className="cert-item">
              <div className="cert-icon purple large">🔒</div>
              <div>
                <p className="cert-name">Machine Learning</p>
                <p className="cert-status">Not started</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
