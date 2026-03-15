import WaitlistForm from "./WaitlistForm";
import ThemeToggle from "@/components/ThemeToggle";
import { FloatingShapes } from "@/components/ui/shape-landing-hero";

const subjects = [
  { icon: "calculate",   name: "Mathematics",     color: "#3B82F6", bg: "#0d0d2b" },
  { icon: "science",     name: "Physics",          color: "#8B5CF6", bg: "#0e0d1e" },
  { icon: "biotech",     name: "Chemistry",        color: "#10B981", bg: "#071a13" },
  { icon: "history_edu", name: "History",          color: "#F59E0B", bg: "#1c1205" },
  { icon: "genetics",    name: "Biology",          color: "#059669", bg: "#071510" },
  { icon: "public",      name: "Geography",        color: "#06B6D4", bg: "#071620" },
  { icon: "menu_book",   name: "English",          color: "#6366F1", bg: "#0e0e24" },
  { icon: "terminal",    name: "Computer Science", color: "#F97316", bg: "#1a0d00" },
];

const stats = [
  { value: "8",    label: "Subjects" },
  { value: "4",    label: "Study modes" },
  { value: "<10s", label: "Generation time" },
  { value: "Free", label: "To get started" },
];

const steps = [
  { n: "1", title: "Pick a subject",             desc: "Choose from 8 subjects and dozens of topics across your curriculum." },
  { n: "2", title: "AI generates your material", desc: "Quiz, flashcards, or lesson — tailored to your topic. Ready in under 10 seconds." },
  { n: "3", title: "Ace your exam",              desc: "Study smarter, retain more, and show up to every exam prepared." },
];

export default function WaitlistPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--bg)", color: "var(--text)", overflowX: "hidden", position: "relative" }}>

      {/* ANIMATED FLOATING SHAPES BACKGROUND */}
      <FloatingShapes />

      {/* NAV */}
      <nav style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--nav-bg)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 20, fontWeight: 900, color: "var(--text)", letterSpacing: -0.5 }}>
          <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", backgroundColor: "#895af6" }} />
          Thinkio
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>Coming soon</span>
          <ThemeToggle />
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 896, margin: "0 auto", padding: "80px 24px 72px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div className="badge-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#895af6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            AI Study Platform
          </div>
        </div>
        <h1 style={{ fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--text)", marginBottom: 24 }}>
          Think{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            smarter
            <svg style={{ position: "absolute", bottom: -6, left: 0, width: "100%" }} viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M2 8c20-4 40-6 60-4s40 6 60 4 40-6 60-4" stroke="#FDE047" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          ,<br />not harder.
        </h1>
        <p style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto 48px" }}>
          Master any subject with AI-powered quizzes, flashcards, and personalized lessons. Join the waitlist and be first to try it.
        </p>
        <div style={{ marginBottom: 20 }}>
          <WaitlistForm />
        </div>
        <p style={{ fontSize: 13, color: "var(--text-subtle)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", backgroundColor: "#10B981" }} />
          No spam — just an early access invite when we launch
        </p>
      </section>

      {/* STATS */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", backgroundColor: "var(--stats-bg)", padding: "28px 24px" }}>
        <div className="stats-row" style={{ display: "flex", justifyContent: "center", maxWidth: 640, margin: "0 auto" }}>
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <span style={{ fontSize: 26, fontWeight: 900, color: "var(--text)", letterSpacing: -1 }}>{s.value}</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SUBJECTS */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#895af6", textTransform: "uppercase", marginBottom: 12 }}>Subjects</p>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, letterSpacing: -1.5, color: "var(--text)", marginBottom: 12 }}>8 subjects. Unlimited questions.</h2>
        <p style={{ fontSize: 16, color: "var(--text-muted)", marginBottom: 48 }}>From algebra to anatomy — Thinkio covers your entire curriculum.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
          {subjects.map((s) => (
            <div key={s.name} className="subject-card" style={{ borderRadius: 20, padding: "22px 18px", display: "flex", flexDirection: "column" as const, alignItems: "flex-start", gap: 14, background: `linear-gradient(135deg, ${s.bg} 0%, ${s.color}44 50%, ${s.bg} 100%)` }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.12)", border: `1px solid ${s.color}55`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 24, color: s.color }}>{s.icon}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#ffffff" }}>{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#895af6", textTransform: "uppercase", marginBottom: 12 }}>How it works</p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, letterSpacing: -1.5, color: "#ffffff", marginBottom: 12 }}>Three steps to exam-ready.</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", marginBottom: 56 }}>No flashcard decks to make. No notes to re-read. Just results.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {steps.map((step) => (
              <div key={step.n} style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 32, textAlign: "left" }}>
                <div className="step-num" style={{ width: 40, height: 40, borderRadius: "50%", fontWeight: 900, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{step.n}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#ffffff", marginBottom: 10 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto", padding: "96px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div className="badge-pill">
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", backgroundColor: "#10B981" }} />
            Early Access
          </div>
        </div>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, letterSpacing: -2, color: "var(--text)", marginBottom: 16 }}>Ready to study smarter?</h2>
        <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 48 }}>Join students who are getting ahead. No spam — just early access when we launch.</p>
        <WaitlistForm />
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border-color)", padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: 12, position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 900, color: "var(--text)" }}>
          <span style={{ display: "inline-block", width: 9, height: 9, borderRadius: "50%", backgroundColor: "#895af6" }} />
          Thinkio
        </div>
        <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>© 2025 Thinkio. All rights reserved.</span>
      </footer>
    </main>
  );
}
