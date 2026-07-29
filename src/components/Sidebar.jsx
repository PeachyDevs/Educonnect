import { NavLink } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  FolderKanban,
  Users,
  Trophy,
  Mail,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Courses", path: "/learning", icon: BookOpen },
    { name: "My Projects", path: "/project", icon: FolderKanban },
    { name: "Messages", path: "/messages", icon: Mail },
    { name: "Achievements", path: "/achievements", icon: Trophy },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Workspace</h2>
        <p>Your learning hub</p>
      </div>
      <nav className="nav-list">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <div className="menu-left">
                <Icon size={20} />
                <span>{item.name}</span>
              </div>
              <ChevronRight size={16} className="chevron" />
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
