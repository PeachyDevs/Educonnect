import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ChevronDown, Sun, Moon, X, LogOut } from "lucide-react";
import profileImage from "../../images/eeh.jpg";
import { Shield, Bell, Palette, Settings, UserCircle } from "lucide-react";

const previewNotifications = [
  {
    id: 1,
    title: "Upcoming Deadline",
    message: "Your 'React Router Layout' project is due tomorrow at 11:59 PM.",
    time: "2 hours ago",
    color: "#ef4444",
    unread: true,
  },
  {
    id: 2,
    title: "New Team Message",
    message: "David added a comment in your Front-end Study Group.",
    time: "4 hours ago",
    color: "#3b82f6",
    unread: true,
  },
  {
    id: 3,
    title: "Achievement Unlocked!",
    message: "You earned the 'Code Warrior' badge for a 7-day streak.",
    time: "Yesterday",
    color: "#22c55e",
    unread: false,
  },
];

const settingsItems = [
  { label: "Account", icon: <Settings size={15} />, section: "account" },
  { label: "Profile", icon: <UserCircle size={15} />, section: "profile" },
  { label: "Security", icon: <Shield size={15} />, section: "security" },
  {
    label: "Notifications",
    icon: <Bell size={15} />,
    section: "notifications",
  },
  { label: "Themes", icon: <Palette size={15} />, section: "themes" },
];

const pageNames = {
  "/dashboard": "Dashboard",
  "/learning": "My Courses",
  "/project": "My Projects",
  "/groups": "My Groups",
  "/achievements": "Achievements",
  "/profile": "Profile",
  "/settings": "Settings",
  "/notifications": "Notifications",
};

const searchSuggestions = [
  { label: "Dashboard", path: "/dashboard", icon: "📊" },
  { label: "My Courses", path: "/learning", icon: "📚" },
  { label: "My Projects", path: "/project", icon: "📁" },
  { label: "My Groups", path: "/groups", icon: "👥" },
  { label: "Achievements", path: "/achievements", icon: "🏆" },
  { label: "Profile", path: "/profile", icon: "👤" },
  { label: "Settings", path: "/settings", icon: "⚙️" },
  { label: "Notifications", path: "/notifications", icon: "🔔" },
];

export default function NavbarApp({ currentTheme, onThemeChange }) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [readIds, setReadIds] = useState(() =>
    JSON.parse(localStorage.getItem("educonnect_read_notifs") || "[]"),
  );

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const settingsRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.first_name || "there";
  const currentPage = pageNames[location.pathname] || "";

  const [navbarAvatar, setNavbarAppAvatar] = useState(
    () => localStorage.getItem("educonnect_avatar") || profileImage,
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("educonnect_read_notifs");
    navigate("/auth/login");
  };

  useEffect(() => {
    const handleAvatarUpdate = () => {
      const updatedAvatar = localStorage.getItem("educonnect_avatar");
      if (updatedAvatar) setNavbarAppAvatar(updatedAvatar);
    };
    window.addEventListener("avatarChanged", handleAvatarUpdate);
    return () =>
      window.removeEventListener("avatarChanged", handleAvatarUpdate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotificationOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target))
        setSettingsOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBellClick = () => {
    setNotificationOpen((prev) => !prev);
    setProfileOpen(false);
    setSettingsOpen(false);
    const allIds = previewNotifications.map((n) => n.id);
    setReadIds(allIds);
    localStorage.setItem("educonnect_read_notifs", JSON.stringify(allIds));
  };

  const unreadCount = previewNotifications.filter(
    (notif) => notif.unread && !readIds.includes(notif.id),
  ).length;

  const filteredSuggestions = searchSuggestions.filter((s) =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleTheme = () => {
    if (typeof onThemeChange === "function") {
      onThemeChange(currentTheme === "dark" ? "light" : "dark");
    }
  };

  return (
    <>
      <header className="navbar">
        {/* Left */}
        <div className="navbar-left">
          <Link to="/dashboard" className="logo-link">
            <div className="logo-circle">E</div>
            <div className="logo-text">
              <h2>EduConnect</h2>
              <span>Learn • Build • Grow</span>
            </div>
          </Link>
          <div className="page-divider"></div>
          <div className="page-info">
            <h3>{currentPage}</h3>
          </div>
        </div>

        {/* Center */}
        <div className="navbar-center">
          <button
            className="navbar-search-trigger"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={18} />
            <span className="search-placeholder">
              Search courses, projects...
            </span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>

        {/* Right */}
        <div className="navbar-right">
          {/* Notifications */}
          <div className="navbar-action" ref={notifRef}>
            <button className="icon-btn" onClick={handleBellClick}>
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {notificationOpen && (
              <div className="nav-dropdown notif-dropdown">
                <div className="nav-dropdown-header">
                  <span>Notifications</span>
                  <span className="notif-dropdown-count">
                    {unreadCount} unread
                  </span>
                </div>
                {previewNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notif-dropdown-item ${!readIds.includes(notif.id) && notif.unread ? "unread" : ""}`}
                    style={{ borderLeftColor: notif.color }}
                  >
                    <div className="notif-title-row">
                      <h4>{notif.title}</h4>
                      <div className="notif-title-right">
                        <span className="notif-time">{notif.time}</span>
                        {notif.unread && !readIds.includes(notif.id) && (
                          <span className="notif-indicator"></span>
                        )}
                      </div>
                    </div>
                    <div className="notif-dropdown-msg">{notif.message}</div>
                  </div>
                ))}
                <button
                  className="notif-dropdown-viewall"
                  onClick={() => {
                    setNotificationOpen(false);
                    navigate("/notifications");
                  }}
                >
                  View all notifications →
                </button>
              </div>
            )}
          </div>

          {/* Theme */}
          <button className="icon-btn" onClick={toggleTheme}>
            {currentTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Settings */}
          <div className="navbar-action" ref={settingsRef}>
            <button
              className="icon-btn"
              onClick={() => {
                setSettingsOpen((prev) => !prev);
                setProfileOpen(false);
                setNotificationOpen(false);
              }}
            >
              <Settings size={20} />
            </button>

            {settingsOpen && (
              <div className="nav-dropdown settings-dropdown">
                <div className="nav-dropdown-header">
                  <span>Settings</span>
                </div>
                {settingsItems.map((item) => (
                  <div
                    key={item.section}
                    className="settings-dropdown-item"
                    onClick={() => {
                      setSettingsOpen(false);
                      navigate("/settings", {
                        state: { activeSection: item.section },
                      });
                    }}
                  >
                    <span className="settings-dropdown-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
                <div className="settings-dropdown-divider" />
                <div
                  className="settings-dropdown-item logout"
                  onClick={handleLogout}
                >
                  <span className="settings-dropdown-icon">
                    <LogOut size={15} />
                  </span>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="navbar-action" ref={profileRef}>
            <div
              className="profile-card"
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setSettingsOpen(false);
                setNotificationOpen(false);
              }}
            >
              <img
                src={navbarAvatar}
                alt="Profile"
                className="profile-avatar"
              />
              <div className="profile-info">
                <strong>{firstName}</strong>
                <span>
                  {user.role === "mentor" ? "Mentor" : "Software Student"}
                </span>
              </div>
              <ChevronDown size={18} />
            </div>

            {profileOpen && (
              <div className="nav-dropdown profile-dropdown">
                <div className="nav-dropdown-header">
                  <span>My Account</span>
                </div>
                <div
                  className="settings-dropdown-item"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                >
                  <span className="settings-dropdown-icon">
                    <UserCircle size={15} />
                  </span>
                  <span>View Profile</span>
                </div>
                <div
                  className="settings-dropdown-item"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/settings", {
                      state: { activeSection: "profile" },
                    });
                  }}
                >
                  <span className="settings-dropdown-icon">
                    <Settings size={15} />
                  </span>
                  <span>Edit Profile</span>
                </div>
                <div className="settings-dropdown-divider" />
                <div
                  className="settings-dropdown-item logout"
                  onClick={handleLogout}
                >
                  <span className="settings-dropdown-icon">
                    <LogOut size={15} />
                  </span>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="search-modal-overlay"
          onClick={() => {
            setSearchOpen(false);
            setSearchQuery("");
          }}
        >
          <div
            className="search-modal"
            ref={searchRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-modal-input-wrap">
              <Search size={18} className="search-modal-icon" />
              <input
                autoFocus
                className="search-modal-input"
                placeholder="Search courses, projects, pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
              />
              <button
                className="search-modal-close"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div className="search-modal-results">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((s) => (
                  <div
                    key={s.path}
                    className="search-modal-item"
                    onClick={() => {
                      navigate(s.path);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </div>
                ))
              ) : (
                <div className="search-modal-empty">
                  No results for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
