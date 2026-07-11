import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { Search, X } from "lucide-react";
import logo from "../../images/E.png";
import profileImage from "../../images/eeh.jpg";
import { ReactTyped } from "react-typed";
import {
  User,
  Shield,
  Bell,
  Palette,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";

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

export default function NavbarApp({ currentTheme }) {
  const [isRinging, setIsRinging] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [readIds, setReadIds] = useState(() =>
    JSON.parse(localStorage.getItem("educonnect_read_notifs") || "[]"),
  );

  const dropdownRef = useRef(null);
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
    setSettingsOpen(false);
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
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
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 500);
    setDropdownOpen((prev) => !prev);
    setSettingsOpen(false);
    const allIds = previewNotifications.map((n) => n.id);
    setReadIds(allIds);
    localStorage.setItem("educonnect_read_notifs", JSON.stringify(allIds));
  };

  const unreadCount = previewNotifications.filter(
    (notif) => notif.unread && !readIds.includes(notif.id),
  ).length;

  const searchSuggestions = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "My Courses", path: "/learning", icon: "📚" },
    { label: "My Projects", path: "/project", icon: "📁" },
    { label: "My Groups", path: "/groups", icon: "👥" },
    { label: "Achievements", path: "/achievements", icon: "🏆" },
    { label: "Profile", path: "/profile", icon: "👤" },
    { label: "Settings", path: "/settings", icon: "⚙️" },
    { label: "Notifications", path: "/notifications", icon: "🔔" },
  ].filter((s) => s.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className={`navbar ${currentTheme || ""}`}>
      {/* Left — Logo + Page Title */}
      <div className="navbar-left">
        <NavLink to="/dashboard" className="logo-link">
          <div className="logo-transition-wrap">
            <img src={logo} alt="EduConnect" className="nav-icon logo-img" />
            <span className="logo-text">
              <ReactTyped
                strings={["EduConnect"]}
                typeSpeed={60}
                backSpeed={40}
                backDelay={1500}
                loop
                showCursor={false}
              />
            </span>
          </div>
        </NavLink>
        {currentPage && (
          <>
            <span className="navbar-divider">/</span>
            <span className="navbar-page-name">{currentPage}</span>
          </>
        )}
      </div>

      {/* Center — Search */}
      <div className="navbar-center" ref={searchRef}>
        {searchOpen ? (
          <div className="navbar-search-box">
            <Search size={14} className="navbar-search-icon" />
            <input
              autoFocus
              className="navbar-search-input"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="navbar-search-close"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
            >
              <X size={14} />
            </button>
            {searchQuery && searchSuggestions.length > 0 && (
              <div className="navbar-search-suggestions">
                {searchSuggestions.map((s) => (
                  <div
                    key={s.path}
                    className="navbar-search-suggestion-item"
                    onClick={() => {
                      navigate(s.path);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            className="navbar-search-trigger"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={14} />
            <span>Search...</span>
            <span className="navbar-search-kbd">⌘K</span>
          </button>
        )}
      </div>

      {/* Right — Icons + Avatar */}
      <nav className="nav-links">
        {/* Bell */}
        <div className="notif-bell-wrapper" ref={dropdownRef}>
          <button className="nav-icon-btn" onClick={handleBellClick}>
            <IoNotificationsOutline
              className={`nav-icon notification-bell ${isRinging ? "ring-active" : ""}`}
              size={24}
            />
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </button>

          {dropdownOpen && (
            <div className="notif-dropdown">
              <div className="notif-dropdown-header">
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
                  setDropdownOpen(false);
                  navigate("/notifications");
                }}
              >
                View all notifications →
              </button>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="notif-bell-wrapper" ref={settingsRef}>
          <button
            className="nav-icon-btn"
            onClick={() => {
              setSettingsOpen((prev) => !prev);
              setDropdownOpen(false);
            }}
          >
            <IoSettingsOutline className="nav-icon settings-gear" size={24} />
          </button>

          {settingsOpen && (
            <div className="notif-dropdown settings-dropdown">
              <div className="notif-dropdown-header">
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

        {/* Avatar + greeting */}
        <NavLink to="/profile" className="logo-link navbar-avatar-wrap">
          <span className="navbar-greeting">Hi, {firstName} 👋</span>
          <img
            src={navbarAvatar}
            alt="profile"
            className="nav-icon profile-avatar"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        </NavLink>
      </nav>

      <button className="hamburger" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
