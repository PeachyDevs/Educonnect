import { useState } from "react";
import Navbar from "../components/Navbarapp.jsx";
// Mock Notification Data for an Educational Dashboard
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    category: "assignments",
    title: "Upcoming Deadline",
    message: "Your 'React Router Layout' project is due tomorrow at 11:59 PM.",
    time: "2 hours ago",
    unread: true,
    urgency: "high",
  },
  {
    id: 2,
    category: "groups",
    title: "New Team Message",
    message: "David added a comment in your Front-end Study Group.",
    time: "4 hours ago",
    unread: true,
    urgency: "normal",
  },
  {
    id: 3,
    category: "achievements",
    title: "Achievement Unlocked!",
    message:
      "Congratulations! You earned the 'Code Warrior' badge for a 7-day streak.",
    time: "Yesterday",
    unread: false,
    urgency: "low",
  },
  {
    id: 4,
    category: "system",
    title: "Platform Update",
    message: "EduConnect server maintenance completed successfully.",
    time: "2 days ago",
    unread: false,
    urgency: "low",
  },
];

export default function Learning({ currentTheme, onThemeChange }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState("all");

  // Mark an individual item as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif,
      ),
    );
  };

  // Mark everything as read at once
  const markAllAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, unread: false })),
    );
  };

  // Filter logic
  const filteredNotifications = notifications.filter((notif) =>
    activeFilter === "all" ? true : notif.category === activeFilter,
  );

  return (
    <>
      <Navbar currentTheme={currentTheme} toggleTheme={onThemeChange} />

      <div className="notifications-layout-container">
        {/* Left Sidebar Filters */}
        <aside className="notif-sidebar card">
          <h3>Filters</h3>
          <ul className="filter-list">
            <li
              className={activeFilter === "all" ? "active" : ""}
              onClick={() => setActiveFilter("all")}
            >
              All Alerts
            </li>
            <li
              className={activeFilter === "assignments" ? "active" : ""}
              onClick={() => setActiveFilter("assignments")}
            >
              Assignments
            </li>
            <li
              className={activeFilter === "groups" ? "active" : ""}
              onClick={() => setActiveFilter("groups")}
            >
              Study Groups
            </li>
            <li
              className={activeFilter === "achievements" ? "active" : ""}
              onClick={() => setActiveFilter("achievements")}
            >
              Achievements
            </li>
          </ul>
        </aside>

        {/* Main Feed */}
        <main className="notif-feed card">
          <div className="feed-header">
            <h2>Notifications Center</h2>
            {notifications.some((n) => n.unread) && (
              <button className="mark-all-btn" onClick={markAllAllAsRead}>
                Clear Unread
              </button>
            )}
          </div>
          <hr className="divider" />

          <div className="feed-body">
            {filteredNotifications.length === 0 ? (
              <div className="empty-state">
                <p>🎉 All caught up! No notifications here.</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notif-card ${notif.unread ? "unread" : ""} urgency-${notif.urgency}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="notif-content">
                    <div className="notif-title-row">
                      <h4>{notif.title}</h4>
                      <div className="notif-title-right">
                        <span className="notif-time">{notif.time}</span>
                        {notif.unread && (
                          <span className="notif-indicator"></span>
                        )}
                      </div>
                    </div>
                    <p>{notif.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}
