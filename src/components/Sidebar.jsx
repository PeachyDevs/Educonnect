import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  Users,
  Trophy,
  Target,
  ChevronRight,
} from "lucide-react";

const weeklyProgress = 68;

const menuItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Courses",
    to: "/learning",
    icon: BookOpen,
  },
  {
    label: "My Projects",
    to: "/project",
    icon: FolderKanban,
  },
  {
    label: "My Groups",
    to: "/groups",
    icon: Users,
  },
  {
    label: "Achievements",
    to: "/achievements",
    icon: Trophy,
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Workspace</h2>

        <p>Your learning hub</p>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <div className="menu-left">
                <Icon size={19} />

                <span>{item.label}</span>
              </div>

              <ChevronRight size={16} className="arrow" />
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-divider"></div>

      <div className="goal-card">
        <div className="goal-title">
          <Target size={18} />

          <span>Weekly Goal</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${weeklyProgress}%` }}
          ></div>
        </div>

        <div className="goal-footer">
          <span>{weeklyProgress}% Complete</span>

          <strong>17 / 25 hrs</strong>
        </div>
      </div>
    </aside>
  );
}
