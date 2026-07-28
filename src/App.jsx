import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard.jsx";
import Learning from "./pages/Learning.jsx";
import Projects from "./pages/Projects.jsx";
import Groups from "./pages/Messages.jsx";
import Achievements from "./pages/Achievements.jsx";
import Notifications from "./pages/Notifications.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Username from "./pages/Username.jsx";
import NotFound from "./pages/NotFound.jsx";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProfileSetup from "./pages/auth/ProfileSetup.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Landing />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<Signup />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="auth/reset-password" element={<ResetPassword />} />
        <Route path="auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/username" element={<Username />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
      </Routes>
    </BrowserRouter>
  );
}
