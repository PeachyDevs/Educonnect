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
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden pt-20">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <main className="relative z-10 w-full px-6 sm:px-12 lg:px-16 py-12">
        {/* HERO SECTION */}
        <section className="w-full max-w-6xl mx-auto text-center pt-8 pb-20">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.1]">
            Bridge Theory & Practice <br />
            {/* Locked Container to Prevent Layout Jumps */}
            <span className="inline-flex items-center justify-center mt-4 h-[2.5em] sm:h-[2.2em] overflow-hidden align-top">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="inline-block w-1.5 sm:w-2 h-8 sm:h-14 ml-2 bg-blue-500 animate-pulse align-middle shrink-0" />
            </span>
          </h1>

          {/* Rest of Hero Content - Completely Static */}
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
        </section>
        {/* Expanded Ecosystem Overview Card */}
        <div className="w-full max-w-6xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl my-12">
          <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 text-center sm:text-left">
            How The EduConnect Ecosystem Works
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Mentors Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg">
                01
              </div>
              <h3 className="font-bold text-white text-lg sm:text-xl mb-2">
                Experienced Mentors
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Guide students through real challenges and share industry
                knowledge.
              </p>
            </div>

            {/* Central Card with EduConnect Logo */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-blue-900/40 to-indigo-900/40 border border-blue-500/40 text-center flex flex-col items-center justify-center shadow-lg shadow-blue-500/10">
              <div className="w-14 h-14 mb-4 rounded-2xl bg-blue-600 flex items-center justify-center p-2.5 shadow-xl shadow-blue-500/30 overflow-hidden">
                <img
                  src="/images/E.png"
                  alt="EduConnect Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-extrabold text-white text-lg sm:text-xl mb-2">
                EduConnect Platform
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Connects peers, coordinates projects, and tracks practical
                growth.
              </p>
            </div>

            {/* Students Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-lg">
                02
              </div>
              <h3 className="font-bold text-white text-lg sm:text-xl mb-2">
                Student Collaborators
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Learn together, exchange skills, and build career-ready
                portfolios.
              </p>
            </div>
          </div>
        </div>

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
        className="relative z-10 w-full bg-slate-950 pt-16 border-t border-slate-800/80"
      >
        <div className="w-full max-w-xl mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2 block">
            SAY HELLO
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight">
            Get in touch
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Have a project in mind? Want to collaborate, become a mentor, or
            offer feedback? We’d love to hear from you.
          </p>

          {/* Contact Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-3.5 mb-10"
          >
            <input
              type="text"
              placeholder="Your name"
              className="w-full py-3 px-4 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-500"
            />

            <input
              type="email"
              placeholder="Your email"
              className="w-full py-3 px-4 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-500"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full py-3 px-4 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-500"
            />

            <textarea
              rows="4"
              placeholder="Tell us about your idea, feedback, or suggestion..."
              className="w-full py-3 px-4 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-500 resize-none"
            />

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98] cursor-pointer mt-2"
            >
              Send Message →
            </button>
          </form>

          {/* Clean Social Links Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-slate-300 font-medium mb-12 border-t border-slate-900 pt-8">
            <a
              href="mailto:contact@educonnect.com"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-blue-400 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>Email Us</span>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-slate-400 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Twitter / X</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-slate-400 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-blue-400 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.7a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-pink-400 shrink-0"
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
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Sub-Footer Bar */}
        <div className="w-full bg-slate-900 border-t border-slate-800/80 py-4 px-4 sm:px-12 lg:px-16">
          <div className="w-full flex flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-400">
            {/* Brand Left */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center overflow-hidden p-1 shadow-md">
                <img
                  src="/images/E.png"
                  alt="EduConnect Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-bold text-xs sm:text-base tracking-tight inline">
                EduConnect
              </span>
            </div>

            {/* Policies Center */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>

            {/* Studio Credit Right */}
            <div className="shrink-0 text-right">
              Built by{" "}
              <a
                href="https://peachydevs.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                PeachyDev <span className="hidden sm:inline">Studio</span>{" "}
                <span className="text-[9px] bg-slate-800 px-1 py-0.5 rounded text-slate-300 border border-slate-700">
                  NG
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
