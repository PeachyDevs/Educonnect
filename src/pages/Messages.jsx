import React, { useState } from "react";
import Navbar from "../components/Navbarapp.jsx";
import Sidebar from "../components/Sidebar.jsx";
import {
  Search,
  Send,
  MessageSquare,
  Users,
  Archive,
  ShieldAlert,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  User,
  X,
} from "lucide-react";

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    name: "Alex Rivera",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    type: "dms",
    unread: 2,
    time: "10:42 AM",
    lastMessage: "Hey, did you check the updated design?",
    messages: [
      {
        id: 101,
        text: "Hey, how is the dashboard layout going?",
        sender: "them",
        time: "10:30 AM",
      },
      {
        id: 102,
        text: "Getting there! Rearranging the messaging panel now.",
        sender: "me",
        time: "10:35 AM",
      },
      {
        id: 103,
        text: "Hey, did you check the updated design?",
        sender: "them",
        time: "10:42 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Frontend Dev Team",
    avatar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80",
    type: "groups",
    unread: 0,
    time: "Yesterday",
    lastMessage: "Deployment successful!",
    messages: [
      {
        id: 201,
        text: "Build step passed without errors.",
        sender: "them",
        time: "Yesterday",
      },
      {
        id: 202,
        text: "Deployment successful!",
        sender: "them",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    name: "Sarah Connor",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    type: "dms",
    unread: 0,
    time: "Jul 24",
    lastMessage: "Let us catch up next week.",
    messages: [
      {
        id: 301,
        text: "Let us catch up next week.",
        sender: "them",
        time: "Jul 24",
      },
    ],
  },
  {
    id: 4,
    name: "Old Client Project",
    avatar: null,
    type: "archive",
    unread: 0,
    time: "Jun 12",
    lastMessage: "Invoice #1042 has been settled.",
    messages: [
      {
        id: 401,
        text: "Invoice #1042 has been settled.",
        sender: "them",
        time: "Jun 12",
      },
    ],
  },
  {
    id: 5,
    name: "Crypto Promo Bot",
    avatar: null,
    type: "spam",
    unread: 5,
    time: "02:11 AM",
    lastMessage: "Claim your free 500 tokens now!",
    messages: [
      {
        id: 501,
        text: "Claim your free 500 tokens now!",
        sender: "them",
        time: "02:11 AM",
      },
    ],
  },
];

export default function Messages() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [inputMessage, setInputMessage] = useState("");

  // WhatsApp-style Profile Preview State
  const [previewProfile, setPreviewProfile] = useState(null);

  // Filter conversations by category tab & search query
  const filteredConversations = conversations.filter((chat) => {
    const matchesTab = activeTab === "all" || chat.type === activeTab;
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const activeChat =
    conversations.find((chat) => chat.id === selectedChatId) ||
    conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChat.id) {
          return {
            ...chat,
            lastMessage: inputMessage,
            time: newMessage.time,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      }),
    );

    setInputMessage("");
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
        <main className="main-content">
          <div className="messages-layout tg-panel">
            {/* LEFT COLUMN: Chat List Sidebar */}
            <div className="messages-sidebar tg-sidebar">
              {/* Search Bar */}
              <div className="tg-sidebar-header">
                <div style={{ position: "relative", width: "100%" }}>
                  <Search
                    size={16}
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#64748b",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="tg-search"
                    style={{ paddingLeft: "36px" }}
                  />
                </div>
              </div>

              {/* Scrollable Conversation List */}
              <div className="tg-conv-list">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((chat) => (
                    <div
                      key={chat.id}
                      className={`tg-conv-item ${chat.id === activeChat?.id ? "active" : ""}`}
                      onClick={() => setSelectedChatId(chat.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {/* Avatar with Profile Preview Modal Trigger */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents opening the chat room on avatar click
                          setPreviewProfile(chat);
                        }}
                        style={{
                          position: "relative",
                          flexShrink: 0,
                          cursor: "pointer",
                        }}
                        title="Click to view profile picture"
                      >
                        {chat.avatar ? (
                          <img
                            src={chat.avatar}
                            alt={chat.name}
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              backgroundColor: "#334155",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#f8fafc",
                              fontWeight: "bold",
                            }}
                          >
                            {chat.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Chat Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                          }}
                        >
                          <span className="tg-user-title">{chat.name}</span>
                          <span className="tg-time">{chat.time}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "4px",
                          }}
                        >
                          <span
                            className="tg-subtext"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "180px",
                            }}
                          >
                            {chat.lastMessage}
                          </span>
                          {chat.unread > 0 && (
                            <span className="tg-unread-badge">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: "2rem",
                      textAlign: "center",
                      color: "#64748b",
                      fontSize: "0.85rem",
                    }}
                  >
                    No conversations found.
                  </div>
                )}
              </div>

              {/* Bottom Folder Tabs Bar */}
              <div className="tg-folder-bar-bottom">
                <button
                  className={`tg-bottom-tab ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`tg-bottom-tab ${activeTab === "dms" ? "active" : ""}`}
                  onClick={() => setActiveTab("dms")}
                >
                  DMs
                </button>
                <button
                  className={`tg-bottom-tab ${activeTab === "groups" ? "active" : ""}`}
                  onClick={() => setActiveTab("groups")}
                >
                  Groups
                </button>
                <button
                  className={`tg-bottom-tab ${activeTab === "archive" ? "active" : ""}`}
                  onClick={() => setActiveTab("archive")}
                >
                  Archive
                </button>
                <button
                  className={`tg-bottom-tab ${activeTab === "spam" ? "active" : ""}`}
                  onClick={() => setActiveTab("spam")}
                >
                  Spam
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Active Chat Screen */}
            {activeChat ? (
              <div className="chat-window tg-chat-window">
                {/* Header Bar with Recipient PFP */}
                <div className="tg-navbar">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      onClick={() => setPreviewProfile(activeChat)}
                      style={{ cursor: "pointer", flexShrink: 0 }}
                      title="View profile"
                    >
                      {activeChat.avatar ? (
                        <img
                          src={activeChat.avatar}
                          alt={activeChat.name}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "#334155",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#f8fafc",
                            fontWeight: "bold",
                            fontSize: "0.85rem",
                          }}
                        >
                          {activeChat.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1rem",
                          color: "#f8fafc",
                        }}
                      >
                        {activeChat.name}
                      </h3>
                      <span style={{ fontSize: "0.75rem", color: "#10b981" }}>
                        Online
                      </span>
                    </div>
                  </div>
                  <div className="chat-header-actions">
                    <button className="tg-icon-btn">
                      <Phone size={18} />
                    </button>
                    <button className="tg-icon-btn">
                      <Video size={18} />
                    </button>
                    <button className="tg-icon-btn">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                {/* Scrollable Messages Area with Incoming PFPs */}
                <div className="tg-chat-bg">
                  {activeChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "8px",
                        justifyContent:
                          msg.sender === "me" ? "flex-end" : "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      {/* Show Avatar next to incoming messages */}
                      {msg.sender !== "me" && (
                        <div style={{ flexShrink: 0 }}>
                          {activeChat.avatar ? (
                            <img
                              src={activeChat.avatar}
                              alt={activeChat.name}
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginBottom: "4px",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                backgroundColor: "#334155",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#f8fafc",
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                marginBottom: "4px",
                              }}
                            >
                              {activeChat.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      )}

                      <div
                        className={`tg-bubble ${
                          msg.sender === "me" ? "outgoing" : "incoming"
                        }`}
                      >
                        <div>{msg.text}</div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "4px",
                            marginTop: "4px",
                            fontSize: "0.65rem",
                            opacity: 0.7,
                          }}
                        >
                          <span>{msg.time}</span>
                          {msg.sender === "me" && <CheckCheck size={12} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input Bar */}
                <form className="tg-input-bar" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Write a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="tg-input"
                  />
                  <button type="submit" className="tg-send-btn">
                    <Send size={18} />
                  </button>
                </form>
              </div>
            ) : (
              <div
                className="chat-window tg-chat-window"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#64748b",
                }}
              >
                Select a chat to start messaging
              </div>
            )}
          </div>

          {/* WhatsApp-Style Profile Preview Modal */}
          {previewProfile && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
              onClick={() => setPreviewProfile(null)}
            >
              <div
                style={{
                  backgroundColor: "#1e293b",
                  borderRadius: "16px",
                  padding: "20px",
                  width: "280px",
                  textAlign: "center",
                  position: "relative",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
                  border: "1px solid #334155",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setPreviewProfile(null)}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                  }}
                >
                  <X size={20} />
                </button>

                {previewProfile.avatar ? (
                  <img
                    src={previewProfile.avatar}
                    alt={previewProfile.name}
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      marginBottom: "16px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "12px",
                      backgroundColor: "#334155",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f8fafc",
                      fontSize: "3.5rem",
                      fontWeight: "bold",
                      margin: "0 auto 16px auto",
                    }}
                  >
                    {previewProfile.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <h3
                  style={{
                    margin: "4px 0",
                    color: "#f8fafc",
                    fontSize: "1.1rem",
                  }}
                >
                  {previewProfile.name}
                </h3>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
