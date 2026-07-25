import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function useTypingEffect(
  phrases,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 2200,
) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed,
    );
    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return text;
}

export default function LandingPage() {
  const typedText = useTypingEffect([
    "Build Real-World Experience",
    "Connect with Quality Mentors",
    "Collaborate with Peer Students",
    "Unlock Future Job Opportunities",
  ]);

  return (
    <><div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden pt-20">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <main className="relative z-10 w-full px-6 sm:px-12 lg:px-16 py-12">
        {/* HERO SECTION */}
        <section className="w-full max-w-6xl mx-auto text-center pt-8 pb-20">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1]">
            Bridge Theory & Practice <br />
            <span className="block mt-4 min-h-[1.2em]">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="inline-block w-2 h-10 sm:h-16 ml-2 bg-blue-500 animate-pulse align-middle" />
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed mb-12">
            Turn screen time into career growth. EduConnect brings students and
            experienced mentors into a collaborative ecosystem to build
            practical projects together and prepare for tomorrow’s
            opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
            <Link
              to="/auth/signup"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-lg shadow-2xl shadow-blue-600/30 hover:brightness-110 transition-all active:scale-[0.98]"
            >
              Start Building Projects →
            </Link>
            <Link
              to="/auth/login"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-md text-slate-200 font-extrabold text-lg hover:bg-slate-800 hover:text-white transition-all active:scale-[0.98]"
            >
              Sign In to Dashboard
            </Link>
          </div>

          {/* Clean Ecosystem Overview Card */}
          <div className="w-full max-w-4xl mx-auto p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              How The EduConnect Ecosystem Works
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="font-bold text-white text-base">
                  Experienced Mentors
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Guide students through real challenges and share industry
                  knowledge.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-900/30 to-indigo-900/30 border border-blue-500/30 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">
                  ⚡
                </div>
                <h3 className="font-extrabold text-white text-base">
                  EduConnect Platform
                </h3>
                <p className="text-slate-300 text-xs mt-1">
                  Connects peers, coordinates projects, and tracks practical
                  growth.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="font-bold text-white text-base">
                  Student Collaborators
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Learn together, exchange skills, and build career-ready
                  portfolios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section
          id="features"
          className="w-full max-w-7xl mx-auto pt-20 border-t border-slate-800/80 mb-28"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
              An Ecosystem Built For Real Growth
            </h2>
            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Ditch passive scrolling. Focus on practical projects that build
              your skills and future career prospects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">
                Mentor-Led Projects
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Learn from qualified mentors who guide you step-by-step through
                practical assignments.
              </p>
            </div>

            <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">
                Peer Learning Groups
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect with fellow students to teach each other prerequisites
                and solve challenges together.
              </p>
            </div>

            <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">
                Real Portfolio Building
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Build your own projects or team up on group initiatives to
                showcase your true abilities.
              </p>
            </div>

            <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">
                Job & Career Pathways
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Turn your practical experience and mentor recommendations into
                real job opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="w-full max-w-6xl mx-auto pt-20 border-t border-slate-800/80 mb-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
                Empowering students to build a better tomorrow.
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                EduConnect was created to transform how students spend their
                time. Rather than wasting hours on social media feeds,
                EduConnect offers an inspiring space where students link up with
                passionate mentors and driven peers.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                Whether you're learning foundational concepts or launching a
                project of your own, our ecosystem ensures you never build
                alone.
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <div className="text-2xl font-bold text-white">
                    Quality Mentorship
                  </div>
                  <div className="text-slate-400 text-sm mt-1">
                    Guidance from mentors dedicated to helping the next
                    generation succeed.
                  </div>
                </div>
                <div className="border-b border-slate-800 pb-4">
                  <div className="text-2xl font-bold text-white">
                    Peer Empowerment
                  </div>
                  <div className="text-slate-400 text-sm mt-1">
                    Students helping students master prerequisites and share
                    skills.
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    Career Readiness
                  </div>
                  <div className="text-slate-400 text-sm mt-1">
                    Gain hands-on proof of your work to stand out to future
                    employers.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* FOOTER & CONTACT INTEGRATION */}
      <footer
        id="contact"
        className="relative z-10 w-full border-t border-slate-800 bg-slate-950 pt-16 pb-12"
      >
        {/* Full width container with side padding */}
        <div className="w-full px-6 sm:px-12 lg:px-16">
          {/* Contact & Partnership Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
            <div className="lg:col-span-5">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Have questions or want to partner?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Reach out to us to bring EduConnect to your university, sign up
                as a mentor, or learn more about our student community.
              </p>

              {/* Contact Info & Studio Link */}
              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-2">
                  <span className="text-blue-400 font-bold">Email:</span>
                  <span>contact@educonnect.com</span>
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-bold">Built by:</span>
                  <img
                    src="/images/preview.png"
                    alt="PeachyDev Studio"
                    className="logo-icon w-8 h-8 rounded" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">PeachyDev Studio</h4>
                    <a
                      href="https://peachydevs.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-400 text-xs"
                    >
                      PeachyDevs Studio ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="lg:col-span-7 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" />
          <input
            type="email"
            placeholder="Email Address"
            className="py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <textarea
          rows="3"
          placeholder="Your Message"
          className="w-full py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all cursor-pointer"
        >
          Send Message
        </button>
      </form></>
          </div>

          {/* Bottom Copyright & Social SVG Icons */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-400">
              <p>
                © {new Date().getFullYear()} EduConnect Platform. All rights
                reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* Social Media SVG Icons Bar */}
            <div className="flex items-center gap-5 text-slate-400">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-blue-400 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.7a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>{" "}
    </div>
  );
}
