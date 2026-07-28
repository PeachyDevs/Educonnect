import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (sectionId) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      {/* w-full + screen-edge padding */}
      <nav className="flex justify-between items-center w-full px-4 sm:px-8 lg:px-12 py-4">
        {/* Left Edge: Logo and Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center p-2 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform overflow-hidden">
            <img
              src="/images/E.png"
              alt="EduConnect Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            Educonnect
          </span>
        </div>

        {/* Center Links */}
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

        {/* Right Edge: Auth Buttons */}
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

        {/* Animated Mobile Toggle Button */}
        <button
          className="md:hidden p-2.5 text-slate-300 hover:text-white focus:outline-none cursor-pointer rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm active:scale-95 transition-transform"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 transform origin-left ${
                isMenuOpen ? "rotate-45 translate-x-0.5 -translate-y-0.5" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 transform origin-left ${
                isMenuOpen ? "-rotate-45 translate-x-0.5 translate-y-0.5" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Backdrop Overlay (Closes menu on tap outside) */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 top-[73px] bg-slate-950/60 backdrop-blur-sm md:hidden z-40"
        />
      )}

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed top-[73px] left-0 right-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 px-6 py-6 flex flex-col gap-4 shadow-2xl transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => handleNavigation("features")}
          className="text-slate-300 hover:text-white text-left font-medium text-base py-2 transition-colors cursor-pointer"
        >
          Features
        </button>
        <button
          onClick={() => handleNavigation("about")}
          className="text-slate-300 hover:text-white text-left font-medium text-base py-2 transition-colors cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => handleNavigation("contact")}
          className="text-slate-300 hover:text-white text-left font-medium text-base py-2 transition-colors cursor-pointer"
        >
          Contact
        </button>

        <div className="flex flex-col gap-3 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => {
              navigate("/auth/login");
              setIsMenuOpen(false);
            }}
            className="w-full text-slate-200 border border-slate-800 bg-slate-900/80 hover:bg-slate-800 font-semibold py-3 rounded-xl text-sm transition-all cursor-pointer active:scale-[0.98]"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/auth/signup");
              setIsMenuOpen(false);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer active:scale-[0.98]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
