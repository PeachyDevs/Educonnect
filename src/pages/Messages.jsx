import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbarapp.jsx";

import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  X,
  Paperclip,
  Smile,
  Trash2,
  Reply,
  Forward,
  Star,
  Copy,
  FileText,
  Mail,
  Info,
  ChevronRight,
  Bell,
  Palette,
  Download,
  Clock,
  Lock,
  Shield,
  Archive,
  PhoneCall,
  Users,
  ShieldAlert,
  MessageSquare,
} from "lucide-react";

// 1. Expanded Dummy Data with Profile Details
const MOCK_CONVERSATIONS = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Lead UI/UX Designer. Always exploring new layouts.",
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
        starred: false,
      },
      {
        id: 102,
        text: "Getting there! Rearranging the messaging panel now.",
        sender: "me",
        time: "10:35 AM",
        starred: false,
      },
      {
        id: 103,
        text: "Hey, did you check the updated design?",
        sender: "them",
        time: "10:42 AM",
        starred: false,
        replyTo: {
          sender: "me",
          text: "Getting there! Rearranging the messaging panel now.",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Frontend Dev Team",
    email: "frontend-team@company.local",
    phone: "N/A (Group)",
    bio: "Core developers handling the main web application.",
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
        starred: false,
      },
      {
        id: 202,
        text: "Deployment successful!",
        sender: "them",
        time: "Yesterday",
        starred: false,
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
    name: "Cohort #4",
    avatar: null,
    type: "spam",
    unread: 5,
    time: "02:11 AM",
    lastMessage: "Claim your free 500 tokens now!",
    messages: [
      {
        id: 501,
        name: "Chioma",
        text: "how is the programme coming up",
        sender: "them",
        time: "02:11 AM",
      },
      {
        id: 502,
        name: "David Ezekiel",
        text: "good morning guys",
        sender: "them",
        time: "06:45 AM",
      },
    ],
  },
];

export default function Messages() {
  const [activeTab, setActiveTab] = useState("chats"); // Menu view state: chats, archive, calls, groups, spam
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [inputMessage, setInputMessage] = useState("");

  // Navigation & Panel States
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  // Interaction States
  const [replyingTo, setReplyingTo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // ADD THIS NEW USEEFFECT:
  useEffect(() => {
    // 1. Lock the main document scroll
    document.body.style.overflow = "hidden";

    // 2. Restore it when unmounting (leaving the page)
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, isTyping, selectedChatId, replyingTo, selectedFile]);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredConversations = conversations.filter((chat) => {
    const matchesMenu =
      activeTab === "chats" ||
      (activeTab === "groups" && chat.type === "groups") ||
      (activeTab === "archive" && chat.archived) ||
      (activeTab === "calls" && chat.hasCalls);

    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMenu && matchesSearch;
  });

  const activeChat =
    conversations.find((chat) => chat.id === selectedChatId) ||
    conversations[0];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      setSelectedFile({
        name: file.name,
        type: file.type,
        url: isImage ? URL.createObjectURL(file) : null,
      });
    }
    e.target.value = null;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !selectedFile && !activeChat) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      starred: false,
      replyTo: replyingTo
        ? { sender: replyingTo.sender, text: replyingTo.text }
        : null,
      attachment: selectedFile,
    };

    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChat.id) {
          return {
            ...chat,
            lastMessage:
              selectedFile && !inputMessage
                ? "Sent an attachment"
                : inputMessage,
            time: newMessage.time,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      }),
    );

    setInputMessage("");
    setReplyingTo(null);
    setSelectedFile(null);
    setIsTyping(true);

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        text: "I received your message! Let me check on that.",
        sender: "them",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        starred: false,
      };

      setConversations((prev) =>
        prev.map((chat) => {
          if (chat.id === activeChat.id) {
            return {
              ...chat,
              lastMessage: botReply.text,
              time: botReply.time,
              unread:
                chat.id !== selectedChatId ? chat.unread + 1 : chat.unread,
              messages: [...chat.messages, botReply],
            };
          }
          return chat;
        }),
      );
      setIsTyping(false);
    }, 2500);
  };

  const handleClearChat = () => {
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeChat.id
          ? { ...chat, messages: [], lastMessage: "" }
          : chat,
      ),
    );
    setMenuOpen(false);
  };

  const handleRightClick = (e, msg) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, message: msg });
  };

  const handleMenuAction = (action) => {
    if (!contextMenu) return;
    const { message } = contextMenu;

    switch (action) {
      case "delete":
        setConversations((prev) =>
          prev.map((chat) => {
            if (chat.id === activeChat.id) {
              const updated = chat.messages.filter((m) => m.id !== message.id);
              return {
                ...chat,
                messages: updated,
                lastMessage: updated.length
                  ? updated[updated.length - 1].text
                  : "",
              };
            }
            return chat;
          }),
        );
        break;
      case "reply":
        // Correctly capture reply target whether it's from "me" or "them"
        setReplyingTo(message);
        break;
      case "copy":
        navigator.clipboard.writeText(message.text);
        break;
      case "star":
        setConversations((prev) =>
          prev.map((chat) => {
            if (chat.id === activeChat.id) {
              const updated = chat.messages.map((m) =>
                m.id === message.id ? { ...m, starred: !m.starred } : m,
              );
              return { ...chat, messages: updated };
            }
            return chat;
          }),
        );
        break;
      default:
        break;
    }
    setContextMenu(null);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <main className="main-content">
          <div className="messages-layout tg-panel">
            {/* COLUMN 1: Chat Menu Panel (Archive, Calls, Groups, Spam, Chats) */}
            <div className="tg-chat-menu-panel">
              <div className="tg-menu-header">Menu</div>
              <div className="tg-menu-items">
                <button
                  className={`tg-menu-btn ${activeTab === "chats" ? "active" : ""}`}
                  onClick={() => setActiveTab("chats")}
                >
                  <MessageSquare size={18} />
                  <span>Chats</span>
                </button>
                <button
                  className={`tg-menu-btn ${activeTab === "archive" ? "active" : ""}`}
                  onClick={() => setActiveTab("archive")}
                >
                  <Archive size={18} />
                  <span>Archive</span>
                </button>
                <button
                  className={`tg-menu-btn ${activeTab === "calls" ? "active" : ""}`}
                  onClick={() => setActiveTab("calls")}
                >
                  <PhoneCall size={18} />
                  <span>Calls</span>
                </button>
                <button
                  className={`tg-menu-btn ${activeTab === "groups" ? "active" : ""}`}
                  onClick={() => setActiveTab("groups")}
                >
                  <Users size={18} />
                  <span>Groups</span>
                </button>
                <button
                  className={`tg-menu-btn ${activeTab === "spam" ? "active" : ""}`}
                  onClick={() => setActiveTab("spam")}
                >
                  <ShieldAlert size={18} />
                  <span>Spam</span>
                </button>
              </div>
            </div>

            {/* COLUMN 2: Contact / Conversation List */}
            <div className="messages-sidebar tg-sidebar">
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

              <div className="tg-conv-list">
                {filteredConversations.length === 0 ? (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#64748b",
                      fontSize: "0.85rem",
                    }}
                  >
                    No conversations found
                  </div>
                ) : (
                  filteredConversations.map((chat) => (
                    <div
                      key={chat.id}
                      className={`tg-conv-item ${chat.id === activeChat?.id ? "active" : ""}`}
                      onClick={() => {
                        setSelectedChatId(chat.id);
                        setConversations((prev) =>
                          prev.map((c) =>
                            c.id === chat.id ? { ...c, unread: 0 } : c,
                          ),
                        );
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        {chat.avatar ? (
                          <img
                            src={chat.avatar}
                            alt=""
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
                              maxWidth: "160px",
                              color: chat.unread > 0 ? "#f8fafc" : "#94a3b8",
                              fontWeight: chat.unread > 0 ? "bold" : "normal",
                            }}
                          >
                            {isTyping && activeChat?.id === chat.id
                              ? "Typing..."
                              : chat.lastMessage}
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
                )}
              </div>
            </div>

            {/* COLUMN 3: Active Chat Window */}
            {activeChat && (
              <div
                className="chat-window tg-chat-window"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                }}
              >
                <div className="tg-navbar">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      flex: 1,
                      minWidth: 0,
                    }}
                    onClick={() => setShowContactInfo(!showContactInfo)}
                  >
                    {activeChat.avatar ? (
                      <img
                        src={activeChat.avatar}
                        alt=""
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
                        }}
                      >
                        {activeChat.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "1rem",
                            color: "#f8fafc",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {activeChat.name}
                        </h3>
                        <ChevronRight
                          size={16}
                          color="#94a3b8"
                          style={{
                            transform: showContactInfo
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.2s",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: isTyping ? "#3b82f6" : "#10b981",
                        }}
                      >
                        {isTyping ? "Typing..." : "Online"}
                      </span>
                    </div>
                  </div>
                  <div
                    className="chat-header-actions"
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <button className="tg-icon-btn">
                      <Phone size={18} />
                    </button>
                    <button className="tg-icon-btn">
                      <Video size={18} />
                    </button>
                    <button
                      className="tg-icon-btn"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {menuOpen && (
                      <div className="chat-menu-dropdown">
                        <button
                          onClick={handleClearChat}
                          className="chat-menu-item"
                        >
                          Clear Chat
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="tg-chat-bg">
                  {activeChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="chat-message-container"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "8px",
                        justifyContent:
                          msg.sender === "me" ? "flex-end" : "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      {msg.sender !== "me" && (
                        <div style={{ flexShrink: 0 }}>
                          {activeChat.avatar ? (
                            <img
                              src={activeChat.avatar}
                              alt=""
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
                        className={`tg-bubble ${msg.sender === "me" ? "outgoing" : "incoming"}`}
                        onContextMenu={(e) => handleRightClick(e, msg)}
                        style={{ cursor: "context-menu", position: "relative" }}
                      >
                        {msg.replyTo && (
                          <div
                            className={`bubble-reply-quote ${msg.sender === "me" ? "quote-outgoing" : "quote-incoming"}`}
                          >
                            <div className="quote-sender-name">
                              {/* Correctly identifies if quoting yourself or the other person */}
                              {msg.replyTo.sender === "me"
                                ? "You"
                                : activeChat.name}
                            </div>
                            <div className="quote-text">{msg.replyTo.text}</div>
                          </div>
                        )}

                        {msg.attachment && (
                          <div className="chat-attachment-preview">
                            {msg.attachment.url ? (
                              <img
                                src={msg.attachment.url}
                                alt="attachment"
                                className="chat-attachment-img"
                              />
                            ) : (
                              <div className="chat-attachment-file">
                                <FileText
                                  size={24}
                                  color={
                                    msg.sender === "me" ? "#fff" : "#3b82f6"
                                  }
                                />
                                <span>{msg.attachment.name}</span>
                              </div>
                            )}
                          </div>
                        )}

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
                          {msg.starred && (
                            <Star size={10} fill="currentColor" />
                          )}
                          <span>{msg.time}</span>
                          {msg.sender === "me" && <CheckCheck size={12} />}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "8px",
                        justifyContent: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        className="tg-bubble incoming"
                        style={{ fontStyle: "italic", opacity: 0.8 }}
                      >
                        Typing...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="tg-input-area-container">
                  {/* Reply Preview Bar (Supports previewing when replying to self or others) */}
                  {replyingTo && (
                    <div className="reply-preview-box">
                      <div className="reply-preview-content">
                        <span className="reply-preview-sender">
                          {replyingTo.sender === "me" ? "You" : activeChat.name}
                        </span>
                        <span className="reply-preview-text">
                          {replyingTo.text}
                        </span>
                      </div>
                      <button
                        className="action-cancel-btn"
                        onClick={() => setReplyingTo(null)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  {selectedFile && (
                    <div className="attachment-preview-box">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {selectedFile.url ? (
                          <img
                            src={selectedFile.url}
                            alt="preview"
                            style={{
                              width: "32px",
                              height: "32px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          <FileText size={20} color="#3b82f6" />
                        )}
                        <span style={{ fontSize: "0.85rem", color: "#f8fafc" }}>
                          {selectedFile.name}
                        </span>
                      </div>
                      <button
                        className="action-cancel-btn"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}

                  <form
                    className="tg-input-bar"
                    onSubmit={handleSendMessage}
                    style={{
                      borderTop: replyingTo || selectedFile ? "none" : "",
                    }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className="tg-icon-btn"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Paperclip size={20} />
                    </button>
                    <input
                      type="text"
                      placeholder="Write a message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="tg-input"
                    />
                    <button
                      type="button"
                      className="tg-icon-btn"
                      style={{ marginRight: "4px" }}
                    >
                      <Smile size={20} />
                    </button>
                    <button type="submit" className="tg-send-btn">
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* COLUMN 4: WhatsApp-style Contact Info Drawer */}
            {activeChat && showContactInfo && (
              <div className="whatsapp-info-sidebar">
                <div className="whatsapp-info-header">
                  <button
                    className="tg-icon-btn"
                    onClick={() => setShowContactInfo(false)}
                  >
                    <X size={20} />
                  </button>
                  <span>Contact info</span>
                </div>

                <div className="whatsapp-info-body">
                  <div className="whatsapp-profile-section">
                    {activeChat.avatar ? (
                      <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="whatsapp-big-avatar"
                      />
                    ) : (
                      <div className="whatsapp-big-avatar-fallback">
                        {activeChat.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <h2 className="whatsapp-profile-name">{activeChat.name}</h2>
                    <span className="whatsapp-profile-sub">
                      {activeChat.email || "+1 (555) 019-2834"}
                    </span>
                  </div>

                  <div className="whatsapp-action-buttons">
                    <button className="wa-action-btn">
                      <Phone size={18} />
                      <span>Audio</span>
                    </button>
                    <button className="wa-action-btn">
                      <Video size={18} />
                      <span>Video</span>
                    </button>
                    <button className="wa-action-btn">
                      <Search size={18} />
                      <span>Search</span>
                    </button>
                  </div>

                  <div className="whatsapp-info-card">
                    <div className="wa-card-label">About</div>
                    <div className="wa-card-value">{activeChat.bio}</div>
                  </div>

                  <div className="whatsapp-settings-list">
                    <div className="wa-setting-item">
                      <div className="wa-setting-left">
                        <FileText size={18} />
                        <span>Media, links and docs</span>
                      </div>
                      <span className="wa-setting-right">None</span>
                    </div>
                    <div className="wa-setting-item">
                      <div className="wa-setting-left">
                        <Star size={18} />
                        <span>Starred messages</span>
                      </div>
                      <span className="wa-setting-right">None</span>
                    </div>

                    <div className="wa-setting-divider"></div>

                    <div className="wa-setting-item">
                      <div className="wa-setting-left">
                        <Bell size={18} />
                        <span>Mute notifications</span>
                      </div>
                    </div>
                    <div className="wa-setting-item">
                      <div className="wa-setting-left">
                        <Palette size={18} />
                        <span>Chat theme</span>
                      </div>
                    </div>
                    <div className="wa-setting-item">
                      <div className="wa-setting-left">
                        <Download size={18} />
                        <span>Save to Photos</span>
                      </div>
                      <span className="wa-setting-right">Default</span>
                    </div>

                    <div className="wa-setting-divider"></div>

                    <div className="wa-setting-item">
                      <div className="wa-setting-left">
                        <Clock size={18} />
                        <span>Disappearing messages</span>
                      </div>
                      <span className="wa-setting-right">Off</span>
                    </div>
                    <div className="wa-setting-item">
                      <div className="wa-setting-left">
                        <Lock size={18} />
                        <span>Lock chat</span>
                      </div>
                      <span
                        className="wa-setting-right"
                        style={{ fontSize: "0.75rem", color: "#64748b" }}
                      >
                        Off
                      </span>
                    </div>
                    <div className="wa-setting-item">
                      <div className="wa-setting-left">
                        <Shield size={18} />
                        <span>Advanced chat privacy</span>
                      </div>
                    </div>

                    <div className="wa-setting-divider"></div>

                    <div className="whatsapp-danger-zone">
                      <div className="wa-danger-item" onClick={handleClearChat}>
                        <Trash2 size={16} /> Clear chat
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {contextMenu && (
        <div
          className="msg-context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => handleMenuAction("reply")}>
            <Reply size={16} /> Reply
          </button>
          <button onClick={() => handleMenuAction("copy")}>
            <Copy size={16} /> Copy Text
          </button>
          <button onClick={() => handleMenuAction("forward")}>
            <Forward size={16} /> Forward
          </button>
          <button onClick={() => handleMenuAction("star")}>
            <Star
              size={16}
              fill={contextMenu.message.starred ? "currentColor" : "none"}
            />{" "}
            {contextMenu.message.starred ? "Unstar" : "Star"}
          </button>
          <div className="msg-context-divider"></div>
          <button
            className="msg-context-delete"
            onClick={() => handleMenuAction("delete")}
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
    </>
  );
}
