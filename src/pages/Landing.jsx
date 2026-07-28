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
    /* isolating wrapper with explicit reset classes to protect against global CSS bleeding */
    <div className="isolate font-sans antialiased text-left box-border relative min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <main className="relative z-10 w-full px-6 sm:px-12 lg:px-16 pt-8 pb-16">
        {/* HERO SECTION */}
        <section className="w-full max-w-5xl mx-auto text-center pt-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
              Bridge Theory & Practice
            </h1>
            {/* Typing Text Wrapper */}
            <div className="h-14 sm:h-16 flex items-center justify-center mb-6">
              <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                {typedText}
                <span className="inline-block w-1.5 h-5 sm:h-8 ml-1 bg-blue-500 animate-pulse align-middle" />
              </span>
            </div>
          </div>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-300 font-normal leading-relaxed mb-8">
            Turn screen time into career growth. EduConnect brings students and
            experienced mentors into a collaborative ecosystem to build
            practical projects together and prepare for tomorrow’s
            opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/auth/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:brightness-110 transition-all active:scale-[0.98]"
            >
              Start Building Projects →
            </Link>
            <Link
              to="/auth/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur-md text-slate-200 font-bold text-sm sm:text-base hover:bg-slate-800 hover:text-white transition-all active:scale-[0.98]"
            >
              Sign In to Dashboard
            </Link>
          </div>
        </section>

        {/* Ecosystem Overview Card */}
        <div className="w-full max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md shadow-2xl mb-16">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center sm:text-left">
            How The EduConnect Ecosystem Works
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Experienced Mentors
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Guide students through real challenges and share industry
                knowledge.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-900/40 to-indigo-900/40 border border-blue-500/40 text-center flex flex-col items-center justify-center shadow-lg shadow-blue-500/10">
              <div className="w-12 h-12 mb-3 rounded-2xl bg-blue-600 flex items-center justify-center p-2 shadow-xl shadow-blue-500/30 overflow-hidden">
                <img
                  src="/images/E.png"
                  alt="EduConnect Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-extrabold text-white text-base mb-2">
                EduConnect Platform
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Connects peers, coordinates projects, and tracks practical
                growth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Student Collaborators
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Learn together, exchange skills, and build career-ready
                portfolios.
              </p>
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <section
          id="features"
          className="w-full max-w-6xl mx-auto pt-12 border-t border-slate-800/80 mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              An Ecosystem Built For Real Growth
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Ditch passive scrolling. Focus on practical projects that build
              your skills and future career prospects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
              <h3 className="text-base font-bold text-white mb-2">
                Mentor-Led Projects
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Learn from qualified mentors who guide you step-by-step through
                practical assignments.
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
              <h3 className="text-base font-bold text-white mb-2">
                Peer Learning Groups
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Connect with fellow students to teach each other prerequisites
                and solve challenges together.
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
              <h3 className="text-base font-bold text-white mb-2">
                Real Portfolio Building
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Build your own projects or team up on group initiatives to
                showcase your true abilities.
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
              <h3 className="text-base font-bold text-white mb-2">
                Job & Career Pathways
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Turn your practical experience and mentor recommendations into
                real job opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="w-full max-w-5xl mx-auto pt-12 border-t border-slate-800/80 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
                Empowering students to build a better tomorrow.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                EduConnect was created to transform how students spend their
                time. Rather than wasting hours on social media feeds,
                EduConnect offers an inspiring space where students link up with
                passionate mentors and driven peers.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Whether you're learning foundational concepts or launching a
                project of your own, our ecosystem ensures you never build
                alone.
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <div className="text-base font-bold text-white">
                    Quality Mentorship
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    Guidance from mentors dedicated to helping the next
                    generation succeed.
                  </div>
                </div>
                <div className="border-b border-slate-800 pb-3">
                  <div className="text-base font-bold text-white">
                    Peer Empowerment
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    Students helping students master prerequisites and share
                    skills.
                  </div>
                </div>
                <div>
                  <div className="text-base font-bold text-white">
                    Career Readiness
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
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
        className="relative z-10 w-full bg-slate-950 pt-12 border-t border-slate-800/80"
      >
        <div className="w-full max-w-lg mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2 block">
            SAY HELLO
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Get in touch
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
            Have a project in mind? Want to collaborate, become a mentor, or
            offer feedback? We’d love to hear from you.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-3 mb-8">
            <input
              type="text"
              placeholder="Your name"
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-500"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-500"
            />
            <textarea
              rows="3"
              placeholder="Tell us about your idea, feedback, or suggestion..."
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-slate-500 resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98] cursor-pointer mt-1"
            >
              Send Message →
            </button>
          </form>

          {/* Clean Social Links Bar with Restored SVG Icons */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-slate-300 font-medium mb-10 border-t border-slate-900 pt-6">
            <a
              href="mailto:peachydevstudio@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Email Us</span>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-blue-400"
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
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.762-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Sub-Footer Bar */}
        <div className="w-full bg-slate-900 border-t border-slate-800/80 py-3 px-4 sm:px-12">
          <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-400">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-5 h-5 rounded-lg bg-blue-600 flex items-center justify-center overflow-hidden p-0.5 shadow-md">
                <img
                  src="/images/E.png"
                  alt="EduConnect Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-bold text-xs sm:text-sm tracking-tight inline">
                EduConnect
              </span>
            </div>

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

            <div className="shrink-0 text-center sm:text-right">
              Built by{" "}
              <a
                href="http://127.0.0.1:5500/index.html"
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
