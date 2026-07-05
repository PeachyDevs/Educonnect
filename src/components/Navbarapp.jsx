import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../../images/E.png";
import profileImage from "../../images/eeh.jpg";

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

export default function NavbarApp({ currentTheme }) {
  const [isRinging, setIsRinging] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [readIds, setReadIds] = useState(() => {
    return JSON.parse(localStorage.getItem("educonnect_read_notifs") || "[]");
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const unreadCount = previewNotifications.filter(
    (n) => n.unread && !readIds.includes(n.id),
  ).length;

  const [navbarAvatar, setNavbarAppAvatar] = useState(() => {
    return localStorage.getItem("educonnect_avatar") || profileImage;
  });

  useEffect(() => {
    const handleAvatarUpdate = () => {
      const updatedAvatar = localStorage.getItem("educonnect_avatar");
      if (updatedAvatar) {
        setNavbarAppAvatar(updatedAvatar);
      }
    };
    window.addEventListener("avatarChanged", handleAvatarUpdate);
    return () =>
      window.removeEventListener("avatarChanged", handleAvatarUpdate);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBellClick = () => {
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 500);
    setDropdownOpen((prev) => !prev);

    // Mark all as read
    const allIds = previewNotifications.map((n) => n.id);
    setReadIds(allIds);
    localStorage.setItem("educonnect_read_notifs", JSON.stringify(allIds));
  };

  return (
    <header className={`navbar ${currentTheme || ""}`}>
      <NavLink to="/dashboard" className="logo-link">
        <div className="logo-transition-wrap">
          <img src={logo} alt="EduConnect" className="nav-icon logo-img" />
          <span className="logo-text">EduConnect</span>
        </div>
      </NavLink>

      <nav className="nav-links">
        {/* Bell with badge and dropdown */}
        <div className="notif-bell-wrapper" ref={dropdownRef}>
          <button className="logo-link" onClick={handleBellClick}>
            <IoNotificationsOutline
              className={`nav-icon notification-bell ${isRinging ? "ring-active" : ""}`}
              size={32}
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
                    <span className="notif-time">{notif.time}</span>
                  </div>
                  <div className="notif-dropdown-msg">{notif.message}</div>
                  <div className="notif-dropdown-time">{notif.time}</div>
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

        <NavLink to="/settings" className="logo-link">
          <IoSettingsOutline className="nav-icon settings-gear" size={32} />
        </NavLink>

        <NavLink to="/profile" className="logo-link">
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
