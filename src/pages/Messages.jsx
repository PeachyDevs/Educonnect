import Navbarapp from "../components/Navbarapp.jsx";
import Sidebar from "../../src/components/Sidebar.jsx";
import { useState } from "react";
import {
  Users,
  MessageSquare,
  Plus,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import "../dashboard.css";

const GROUPS = [
  {
    id: 1,
    name: "Frontend Pioneers",
    description: "Focusing on React, CSS Grid, and responsive web systems.",
    membersCount: 8,
    facilitator: "Sydney",
    joined: true,
    category: "Web Dev",
  },
  {
    id: 2,
    name: "Data Wranglers",
    description: "Collaborative Python and Pandas project group.",
    membersCount: 12,
    facilitator: "Alex",
    joined: false,
    category: "Data Science",
  },
];

export default function Groups() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredGroups =
    activeTab === "All"
      ? GROUPS
      : activeTab === "My Groups"
        ? GROUPS.filter((g) => g.joined)
        : GROUPS.filter((g) => !g.joined);

  return (
    <>
      <Navbarapp />
      <div className="app-container">
        <Sidebar />

        <div className="main-wrapper">
          <main className="page-content">
            {/* Header */}
            <div className="page-header flex-between">
              <div>
                <h1 className="page-title">
                  Growth <span className="gradient-text">Groups</span>
                </h1>
                <p className="page-sub">
                  Connect with mentors and peers to tackle real projects
                  together.
                </p>
              </div>

              <button className="apb-btn flex-center gap-2">
                <Plus size={16} /> Create Group
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs" style={{ width: "fit-content" }}>
              {["All", "My Groups", "Explore"].map((tab) => (
                <button
                  key={tab}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Groups Grid */}
            <div className="paths-grid">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="glass-card path-card flex-col flex-between"
                >
                  <div>
                    <div className="path-top flex-between">
                      <div className="path-icon flex-center">
                        <Users size={18} />
                      </div>
                      <span className="path-badge">{group.category}</span>
                    </div>

                    <h3 className="path-name mt-3">{group.name}</h3>
                    <p className="path-desc">{group.description}</p>
                  </div>

                  <div>
                    <div className="flex-between my-3 text-xs text-sub">
                      <span className="flex-center gap-1">
                        <ShieldCheck size={13} /> Mentor: {group.facilitator}
                      </span>
                      <span>👥 {group.membersCount} Members</span>
                    </div>

                    <div className="path-card-footer flex-between border-t border-card">
                      {group.joined ? (
                        <>
                          <span
                            className="chip flex-center gap-1"
                            style={{ color: "#4ade80" }}
                          >
                            <UserCheck size={12} /> Joined
                          </span>
                          <button className="see-all flex-center gap-1">
                            Chat <MessageSquare size={12} />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-sub text-xs">
                            Open for enrollment
                          </span>
                          <button
                            className="apb-btn"
                            style={{
                              padding: "0.4rem 0.85rem",
                              fontSize: "0.8rem",
                            }}
                          >
                            Join Group
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
