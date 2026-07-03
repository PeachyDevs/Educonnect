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
    <nav className="fixed top-0 left-0 z-50 flex justify-between items-center w-full px-4 sm:px-8 py-4 bg-white shadow-md">
      {/* Logo and Brand */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/vite.svg"
          alt="Educonnect Logo"
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
        <span className="font-bold text-xl sm:text-2xl text-gray-900">
          Educonnect
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <button
          onClick={() => handleNavigation("features")}
          className="text-gray-700 hover:text-blue-600 font-medium transition cursor-pointer bg-none border-none"
        >
          Features
        </button>
        <button
          onClick={() => handleNavigation("about")}
          className="text-gray-700 hover:text-blue-600 font-medium transition cursor-pointer bg-none border-none"
        >
          About
        </button>
        <button
          onClick={() => handleNavigation("contact")}
          className="text-gray-700 hover:text-blue-600 font-medium transition cursor-pointer bg-none border-none"
        >
          Contact
        </button>
      </div>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={() => navigate("/auth/login")}
          className="primary-btn px-6 py-2"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/auth/signup")}
          className="primary-btn px-6 py-2"
        >
          Sign Up
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-all ${
            isMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-all ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-900 transition-all ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden flex flex-col gap-4 p-4">
          <button
            onClick={() => handleNavigation("features")}
            className="text-gray-700 hover:text-blue-600 font-medium text-left cursor-pointer bg-none border-none"
          >
            Features
          </button>
          <button
            onClick={() => handleNavigation("about")}
            className="text-gray-700 hover:text-blue-600 font-medium text-left cursor-pointer bg-none border-none"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("contact")}
            className="text-gray-700 hover:text-blue-600 font-medium text-left cursor-pointer bg-none border-none"
          >
            Contact
          </button>
          <div className="flex flex-col gap-2 pt-2 border-t">
            <button
              onClick={() => {
                navigate("/auth/login");
                setIsMenuOpen(false);
              }}
              className="primary-btn px-6 py-2"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/auth/signup");
                setIsMenuOpen(false);
              }}
              className="w-full primary-btn py-2"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
