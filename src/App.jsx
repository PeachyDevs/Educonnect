import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { useState, useEffect } from "react";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard.jsx";
import Learning from "./pages/Learning.jsx";
import Projects from "./pages/Projects.jsx";
import Groups from "./pages/Groups.jsx";
import Achievements from "./pages/Achievements.jsx";
import Notifications from "./pages/Notifications.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Username from "./pages/Username.jsx";
import NotFound from "./pages/NotFound.jsx";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProfileSetup from "./pages/auth/ProfileSetup.jsx";

// Add this route

export default function App() {
  // Theme state persisted in localStorage
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Landing />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<Signup />} />
        </Route>
        <Route
          path="/dashboard"
          element={<Dashboard currentTheme={theme} onThemeChange={setTheme} />}
        />
        <Route
          path="/learning"
          element={<Learning currentTheme={theme} onThemeChange={setTheme} />}
        />
        <Route
          path="/project"
          element={<Projects currentTheme={theme} onThemeChange={setTheme} />}
        />
        <Route
          path="/groups"
          element={<Groups currentTheme={theme} onThemeChange={setTheme} />}
        />
        <Route
          path="/achievements"
          element={
            <Achievements currentTheme={theme} onThemeChange={setTheme} />
          }
        />

        <Route
          path="/profile"
          element={<Profile currentTheme={theme} onThemeChange={setTheme} />}
        />
        <Route
          path="/notifications"
          element={
            <Notifications currentTheme={theme} onThemeChange={setTheme} />
          }
        />
        <Route path="auth/reset-password" element={<ResetPassword />} />
        <Route path="auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/username" element={<Username />} />
        <Route
          path="/settings"
          element={<Settings currentTheme={theme} onThemeChange={setTheme} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
      </Routes>
    </BrowserRouter>
  );
}
