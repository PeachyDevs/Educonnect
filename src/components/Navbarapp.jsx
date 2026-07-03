import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../../images/E.png";
import profileImage from "../../images/eeh.jpg";

export default function NavbarApp({ currentTheme }) {
  const [isRinging, setIsRinging] = useState(false);

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

  const handleBellClick = () => {
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 500);
  };

  return (
    <header className={`navbar ${currentTheme || ""}`}>
      <NavLink to="/dashboard" className="logo-link">
        <img src={logo} alt="EduConnect" className="nav-icon" />
      </NavLink>

      <nav className="nav-links">
        <NavLink
          to="/notifications"
          className="logo-link"
          onClick={handleBellClick}
        >
          <IoNotificationsOutline
            className={`nav-icon notification-bell ${isRinging ? "ring-active" : ""}`}
            size={32}
          />
        </NavLink>

        <NavLink to="/settings" className="logo-link">
          <IoSettingsOutline className="nav-icon settings-gear" size={32} />
        </NavLink>

        <NavLink to="/profile" className="logo-link">
          <img
            src={navbarAvatar}
            alt="profile"
            className="nav-icon profile-avatar"
            style={{ objectFit: "cover", borderRadius: "50%" }}
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
