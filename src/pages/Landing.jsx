import React, { useState, useEffect } from "react";
import { ReactTyped } from "react-typed";
import { useNavigate, useLocation } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle hash navigation on mount and when location changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove '#' from hash
      setTimeout(() => scrollToSection(sectionId), 100); // Small delay to ensure DOM is ready
    }
  }, [location]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row w-full min-h-screen justify-center items-center px-4 sm:px-8 py-8 gap-8 md:gap-12">
        <div className="flex flex-col justify-center items-start w-full md:w-1/2 gap-4 sm:gap-6 text-center md:text-left">
          <h1 className="flex flex-col font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Connect with your{" "}
            <ReactTyped
              className="text-blue-700"
              strings={["Mentors", "Students", "Dreams"]}
              typeSpeed={40}
              backSpeed={45}
              backDelay={2000}
              loop
            />
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-lg mx-auto md:mx-0">
            Unlock your potential and connect with millions of learners
            worldwide. Start your learning journey today.
          </p>

          <div className="flex gap-4 w-full justify-center md:justify-start">
            <button
              onClick={() => navigate("/auth/signup")}
              className="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="border border-slate-200 px-8 py-3 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95"
            >
              Explore
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center min-h-64 sm:min-h-96">
          <img
            src="/puzzle-connect-join-assemble-puzzle-svgrepo-com.svg"
            alt="Connection illustration"
            className="w-full max-w-xs h-auto sm:max-w-sm md:max-w-md lg:max-w-lg drop-shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Powerful Features
            </h2>
            <p className="text-slate-600">
              Discover tools designed to make your educational journey seamless
              and efficient.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
              <p className="text-slate-600">
                Our AI-driven algorithm connects you with the perfect mentors
                based on your skill level and goals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-2">Virtual Classrooms</h3>
              <p className="text-slate-600">
                Collaborate in real-time with shared whiteboards, video calls,
                and instant document sharing.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-slate-600">
                Stay motivated with detailed analytics and milestones that
                visualize your growth over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 sm:px-12 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 bg-blue-50 rounded-3xl h-80 flex items-center justify-center">
            <div className="text-6xl opacity-20">🌍</div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              About EduConnect
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              EduConnect is more than just a platform; it's a global community.
              We are dedicated to breaking down barriers to education by
              fostering meaningful connections between learners and experts.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Whether you're a student looking for guidance or a professional
              wanting to give back, we provide the environment for knowledge to
              thrive.
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-blue-600 font-bold hover:underline"
            >
              Read our full story →
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-slate-900 text-white px-6 sm:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-slate-400">
              Join thousands of others who are already transforming their lives.
              Reach out or sign up today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="space-y-6 mb-8">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <div className="text-3xl mb-4">📧</div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <a
                    href="mailto:support@educonnect.com"
                    className="text-slate-300 hover:text-blue-400"
                  >
                    support@educonnect.com
                  </a>
                </div>
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <div className="text-3xl mb-4">📞</div>
                  <h3 className="text-xl font-bold mb-2">Phone</h3>
                  <a
                    href="tel:+15551234567"
                    className="text-slate-300 hover:text-blue-400"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/company/educonnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-blue-400 text-2xl"
                  >
                    💼
                  </a>
                  <a
                    href="https://twitter.com/educonnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-blue-400 text-2xl"
                  >
                    🐦
                  </a>
                  <a
                    href="https://youtube.com/educonnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-blue-400 text-2xl"
                  >
                    📺
                  </a>
                  <a
                    href="https://instagram.com/educonnect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-blue-400 text-2xl"
                  >
                    📷
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Send Message
                </button>
                {submitStatus === "success" && (
                  <p className="text-green-400 text-center">
                    ✓ Message sent successfully!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
