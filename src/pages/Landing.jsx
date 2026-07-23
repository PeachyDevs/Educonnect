import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Typing effect hook for dynamic hero headlines
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
    "Build Real-World Projects",
    "Learn with Mentors & Peers",
    "Gain Practical Experience",
    "Grow Your Portfolio Together",
  ]);

  return (
    <div className="relative min-h-screen w-full bg-slate-900 text-slate-100 flex flex-col justify-between overflow-x-hidden">
      {/* Background Glow & Subtle Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] animate-pulse [animation-delay:2s] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-20 pb-16 text-center my-auto">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight min-h-[120px] sm:min-h-[150px]">
          Bridge Theory & Practice: <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            {typedText}
          </span>
          <span className="inline-block w-1 h-8 sm:h-12 ml-1 bg-indigo-400 animate-pulse align-middle" />
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-medium leading-relaxed mb-10">
          Stop learning in isolation. Connect with experienced mentors and team
          up with fellow students to solve practical challenges and build
          job-ready portfolio projects.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            to="/auth/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base shadow-xl shadow-blue-600/25 hover:opacity-95 transition-all active:scale-[0.98]"
          >
            Start Building Projects →
          </Link>
          <Link
            to="/auth/login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700 bg-slate-800/60 backdrop-blur-md text-slate-200 font-bold text-base hover:bg-slate-800 hover:text-white transition-all active:scale-[0.98]"
          >
            Sign In to Dashboard
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div
          id="features"
          className="w-full text-left pt-12 border-t border-slate-800/80"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">
              How You Learn & Build Together
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Real experience comes from working on real things alongside
              supportive people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Practical Project Work (Amber/Gold Theme) */}
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Practical Project Work
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tackle realistic assignments that mirror actual industry
                challenges so you can build a portfolio that stands out.
              </p>
            </div>

            {/* Card 2: Student Peer Groups (Purple Theme) */}
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Student Peer Groups
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Team up with fellow learners to brainstorm, review code, share
                feedback, and finish projects together.
              </p>
            </div>

            {/* Card 3: Mentor Guidance (Emerald Theme) */}
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Mentor Guidance
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Get continuous 1-on-1 and group feedback from facilitators who
                guide your roadmap and unblock you when stuck.
              </p>
            </div>

            {/* Card 4: Role-Based Auth (Cyan Theme) */}
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Role-Based Auth
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Custom views tailored specifically for students tracking
                milestones or mentors guiding project progress.
              </p>
            </div>

            {/* Card 5: Live Notifications (Indigo Theme) */}
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Live Notifications
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Stay tuned with real-time alerts whenever mentors review your
                project work or peers leave notes.
              </p>
            </div>

            {/* Card 6: Unified Dashboard (Rose Theme) */}
            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 hover:border-rose-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Unified Dashboard
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Keep all your tasks, communication, and submission deadlines
                organized cleanly in one centralized hub.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-slate-950/40 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © Educonnect Platform. Built for hands-on learning.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
