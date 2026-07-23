import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (sectionId) => {
    // If already on landing page, scroll to section
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to landing page with hash
      navigate(`/#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto px-6 sm:px-12 py-4">
        {/* Logo and Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            {/* Zap SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            Educonnect
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavigation("features")}
            className="text-slate-400 hover:text-white font-medium text-sm transition-colors cursor-pointer bg-transparent border-none"
          >
            Features
          </button>
          <button
            onClick={() => handleNavigation("about")}
            className="text-slate-400 hover:text-white font-medium text-sm transition-colors cursor-pointer bg-transparent border-none"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("contact")}
            className="text-slate-400 hover:text-white font-medium text-sm transition-colors cursor-pointer bg-transparent border-none"
          >
            Contact
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/auth/login")}
            className="text-slate-300 hover:text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-slate-800/60 transition-all cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth/signup")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            /* Close SVG */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* Menu SVG */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-6 py-5 flex flex-col gap-4">
          <button
            onClick={() => handleNavigation("features")}
            className="text-slate-300 hover:text-white font-medium text-left text-base py-1 transition-colors bg-transparent border-none"
          >
            Features
          </button>
          <button
            onClick={() => handleNavigation("about")}
            className="text-slate-300 hover:text-white font-medium text-left text-base py-1 transition-colors bg-transparent border-none"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("contact")}
            className="text-slate-300 hover:text-white font-medium text-left text-base py-1 transition-colors bg-transparent border-none"
          >
            Contact
          </button>
          <div className="flex flex-col gap-2 pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                navigate("/auth/login");
                setIsMenuOpen(false);
              }}
              className="w-full text-slate-200 border border-slate-700 hover:bg-slate-800 font-semibold py-2.5 rounded-xl transition-all text-sm cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/auth/signup");
                setIsMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-2.5 rounded-xl hover:opacity-90 transition-all text-sm shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
