import Navbar from '../components/Navbarapp.jsx';
import Sidebar from '../../src/components/Sidebar.jsx';

import { useState } from 'react'; // Add this at the top

export default function Learning() {
  const [activeTab, setActiveTab] = useState('All'); // Track the tab name

  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Learning Path</h1>
              <p className="page-sub">Explore structured paths to build real-world skills...</p>
            </div>
            <div className="filter-tabs">
            
      {['All', 'Enrolled', 'Completed', 'Saved'].map((tab) => (
        <button 
          key={tab}
          className={`tab learning ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
            </div>
          </div>
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input className="search-input" type="text" placeholder="Search learning paths, skills, or topics…" />
          </div>
          <div className="active-path-banner">
            <p className="apb-label">Currently Active</p>
            <h2 className="apb-title">Python for Data Analysis</h2>
            <div className="apb-meta">
              <span>Week 3 of 8</span>
              <span>Next: Data Cleaning with Pandas</span>
              <span>~2 hrs left this week</span>
            </div>
            <div className="apb-progress-wrap"><div className="apb-progress-fill w-37"></div></div>
            <div className="apb-bottom">
              <span className="apb-pct">37% complete · 5 of 13 modules done</span>
              <button className="apb-btn">Continue Learning →</button>
            </div>
          </div>
          <section className="section">
            <div className="section-header">
              <h3 className="section-title">My Enrolled Paths</h3>
              <a href="#" className="see-all">See all →</a>
            </div>
            <div className="paths-grid">
              <div className="path-card">
                <div className="path-card-top">
                  <div className="path-icon bg-blue">🐍</div>
                  <span className="path-enroll-badge badge-enrolled">Enrolled</span>
                </div>
                <p className="path-card-name">Python for Data Analysis</p>
                <p className="path-card-desc">Master pandas, NumPy, and data visualisation through hands-on projects.</p>
                <div className="path-card-progress-wrap"><div className="path-card-progress-fill w-37"></div></div>
                <div className="path-card-footer">
                  <span>37% complete</span>
                  <span className="duration">⏱ 8 weeks</span>
                </div>
              </div>
              <div className="path-card">
                <div className="path-card-top">
                  <div className="path-icon bg-pink">🎨</div>
                  <span className="path-enroll-badge badge-enrolled">Enrolled</span>
                </div>
                <p className="path-card-name">UI/UX Design Fundamentals</p>
                <p className="path-card-desc">Learn Figma, user research, wireframing, and design systems from scratch.</p>
                <div className="path-card-progress-wrap"><div className="path-card-progress-fill w-12"></div></div>
                <div className="path-card-footer">
                  <span>12% complete</span>
                  <span className="duration">⏱ 6 weeks</span>
                </div>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="section-header">
              <h3 className="section-title">Explore More Paths</h3>
              <a href="#" className="see-all">Browse all →</a>
            </div>
            <div className="paths-grid">
              <div className="path-card">
                <div className="path-card-top">
                  <div className="path-icon bg-green">🤖</div>
                  <span className="path-enroll-badge badge-popular">🔥 Popular</span>
                </div>
                <p className="path-card-name">Machine Learning Basics</p>
                <p className="path-card-desc">Sci-kit Learn, model evaluation, regression and classification projects.</p>
                <div className="path-card-footer mt-6">
                  <span>⭐ 4.8 · 1.2k learners</span>
                  <span className="duration">⏱ 10 weeks</span>
                </div>
              </div>
              <div className="path-card">
                <div className="path-card-top">
                  <div className="path-icon bg-yellow">✍️</div>
                  <span className="path-enroll-badge badge-available">New</span>
                </div>
                <p className="path-card-name">Business Writing</p>
                <p className="path-card-desc">Craft compelling proposals, pitch decks, and professional communications.</p>
                <div className="path-card-footer mt-6">
                  <span>⭐ 4.6 · 840 learners</span>
                  <span className="duration">⏱ 4 weeks</span>
                </div>
              </div>
              <div className="path-card">
                <div className="path-card-top">
                  <div className="path-icon bg-purple">🌐</div>
                  <span className="path-enroll-badge badge-available">Available</span>
                </div>
                <p className="path-card-name">Web Development</p>
                <p className="path-card-desc">HTML, CSS, JavaScript, and React — build real products step by step.</p>
                <div className="path-card-footer mt-6">
                  <span>⭐ 4.9 · 3.1k learners</span>
                  <span className="duration">⏱ 12 weeks</span>
                </div>
              </div>
              <div className="path-card">
                <div className="path-card-top">
                  <div className="path-icon bg-pink">📊</div>
                  <span className="path-enroll-badge badge-popular">Rising ↑</span>
                </div>
                <p className="path-card-name">Financial Literacy</p>
                <p className="path-card-desc">Budgeting, investing, and understanding financial statements for professionals.</p>
                <div className="path-card-footer mt-6">
                  <span>⭐ 4.7 · 620 learners</span>
                  <span className="duration">⏱ 5 weeks</span>
                </div>
              </div>
            </div>
          </section>
        </main>
        <aside className="card trending">
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
              <p className="cert-status">In progress · 37%</p>
            </div>
          </div>
          <div className="cert-item">
            <div className="cert-icon purple large">🔒</div>
            <div>
              <p className="cert-name">Machine Learning</p>
              <p className="cert-status">Not started</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
