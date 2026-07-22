import { useState } from "react";
import Navbar from "../components/Navbarapp.jsx";

const INITIAL_NOTIFICATIONS = [
  // 1. Added a couple of Friend Requests to the system[cite: 5]
  {
    id: 7,
    category: "friend-request",
    title: "Friend Request",
    message:
      "Tunde (Frontend Dev) sent you a friend request. Accept to start collaborating!",
    time: "30 mins ago",
    unread: true,
    urgency: "normal",
    senderName: "Tunde",
  },
  {
    id: 1,
    category: "inbox",
    title: "Upcoming Deadline",
    message: "Your 'React Router Layout' project is due tomorrow at 11:59 PM.",
    time: "2 hours ago",
    unread: true,
    urgency: "high",
  },
  {
    id: 2,
    category: "inbox",
    title: "New Team Message",
    message: "David added a comment in your Front-end Study Group.",
    time: "4 hours ago",
    unread: true,
    urgency: "normal",
  },
  {
    id: 8,
    category: "friend-request",
    title: "Friend Request",
    message:
      "Blessing wanted to connect with you to study React Router layouts.",
    time: "Yesterday",
    unread: false,
    urgency: "normal",
    senderName: "Blessing",
  },
  {
    id: 3,
    category: "inbox",
    title: "Achievement Unlocked!",
    message:
      "Congratulations! You earned the 'Code Warrior' badge for a 7-day streak.",
    time: "Yesterday",
    unread: false,
    urgency: "low",
  },
  {
    id: 4,
    category: "inbox",
    title: "Platform Update",
    message: "EduConnect server maintenance completed successfully.",
    time: "2 days ago",
    unread: false,
    urgency: "low",
  },
  {
    id: 5,
    category: "spam",
    title: "Get Rich Quick Coding!",
    message: "Earn $10,000/week by doing absolutely nothing. Click here!",
    time: "3 days ago",
    unread: true,
    urgency: "low",
  },
  {
    id: 6,
    category: "spam",
    title: "Congratulations Winner",
    message:
      "You have been selected for a free coding bootcamp prize. Claim now.",
    time: "5 days ago",
    unread: false,
    urgency: "low",
  },
];

export default function Learning({ currentTheme, onThemeChange }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState("all");

  // Toggle read/unread status
  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: !notif.unread } : notif,
      ),
    );
  };

  // Accept / Decline Handlers for Friend Requests
  const handleAcceptFriend = (e, id, name) => {
    e.stopPropagation(); // Prevents triggering the read/unread toggle when clicking buttons
    alert(`You are now friends with ${name}! 🎉`);
    // Remove from notifications view once actioned
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleDeclineFriend = (e, id) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Mark everything as read at once
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, unread: false })),
    );
  };

  // Gmail Filter Logic (Updated to handle Friend Requests)
  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === "spam") {
      return notif.category === "spam";
    }
    if (activeFilter === "friend-requests") {
      return notif.category === "friend-request";
    }

    // Don't show Spam in standard filters (All, Unread, Read)
    if (notif.category === "spam") return false;

    if (activeFilter === "unread") return notif.unread === true;
    if (activeFilter === "read") return notif.unread === false;

    return true; // "all" (Shows standard inbox and friend requests together)
  });

  return (
    <>
      <Navbar currentTheme={currentTheme} onThemeChange={onThemeChange} />

      <div className="notifications-layout-container">
        <main className="notif-feed card">
          {/* Header */}
          <div className="feed-header">
            <h2>Notifications Center</h2>
            {notifications.some((n) => n.unread && n.category !== "spam") && (
              <button className="mark-all-btn" onClick={markAllAsRead}>
                Mark All as Read
              </button>
            )}
          </div>

          {/* Tab Navigation - Gmail Style with Friend Requests */}
          <div className="notif-tab-bar">
            {[
              { id: "all", label: "All Messages" },
              { id: "unread", label: "Unread" },
              { id: "read", label: "Read" },
              { id: "friend-requests", label: "Friend Requests" },
              { id: "spam", label: "Spam" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`notif-tab-btn ${activeFilter === tab.id ? "active" : ""}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <hr className="divider" />

          {/* Feed List */}
          <div className="feed-body">
            {filteredNotifications.length === 0 ? (
              <div className="empty-state">
                <p>
                  {activeFilter === "spam" && "Hooray, no spam here! 🌟"}
                  {activeFilter === "friend-requests" &&
                    "No pending friend requests. Go network! 🤝"}
                  {activeFilter !== "spam" &&
                    activeFilter !== "friend-requests" &&
                    "🎉 Your inbox is completely clean!"}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notif-card ${notif.unread ? "unread" : "read"} urgency-${notif.urgency}`}
                  onClick={() => toggleReadStatus(notif.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="notif-content">
                    <div className="notif-title-row">
                      <h4 style={{ fontWeight: notif.unread ? "700" : "500" }}>
                        {notif.title}
                      </h4>
                      <div className="notif-title-right">
                        <span className="notif-time">{notif.time}</span>
                        <span
                          className={`status-dot ${notif.unread ? "unread-dot" : "read-dot"}`}
                        ></span>
                      </div>
                    </div>
                    <p className="notif-message-text">{notif.message}</p>

                    {/* 2. Interactive action buttons if it's a Friend Request category */}
                    {notif.category === "friend-request" && (
                      <div className="notif-actions-row">
                        <button
                          className="friend-btn-accept"
                          onClick={(e) =>
                            handleAcceptFriend(e, notif.id, notif.senderName)
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="friend-btn-decline"
                          onClick={(e) => handleDeclineFriend(e, notif.id)}
                        >
                          Decline
                        </button>
                      </div>
                    )}
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
