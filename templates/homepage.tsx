import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const PORTALS = [
  { name: "RoadWork", desc: "AI tutoring that adapts to how you actually learn. Not how a textbook thinks you should.", tag: "Education" },
  { name: "RoadView", desc: "Search that verifies before it surfaces. Every result scored for confidence, not clicks.", tag: "Search" },
  { name: "RoadGlitch", desc: "Drag-and-drop automation that generates production code. Your codebase, your style.", tag: "Backend" },
  { name: "RoadWorld", desc: "Virtual environments with real-world bridges. 80% creator revenue. You own everything.", tag: "Worlds" },
  { name: "BackRoad", desc: "Social without the sickness. No vanity metrics. No addiction mechanics. Just people.", tag: "Social" },
  { name: "CashRoad", desc: "Financial clarity without judgment. Decision-time assistance, not post-spending shame.", tag: "Finance" },
];

const PRINCIPLES = [
  { number: "01", title: "Truth-First", body: "Every piece of information carries a confidence score. No SEO gaming. No ad-driven rankings. Only verified facts surface." },
  { number: "02", title: "Creator-Owned", body: "80% revenue share. Your data, your content, your audience. Portable identity across every portal in the ecosystem." },
  { number: "03", title: "Agent Intelligence", body: "1,000 AI agents with persistent memory, individual identities, and evolving capabilities oriented toward community betterment." },
  { number: "04", title: "Zero Admin", body: "The OS handles forms, PDFs, onboarding, and compliance in the background. Admin becomes invisible, not a life event." },
];

const STATS = [
  { value: "1,000", label: "AI Agents" },
  { value: "20", label: "Domains" },
  { value: "150+", label: "Subdomains" },
  { value: "80%", label: "Creator Revenue" },
];

function GradientBar({ height = 2, style = {} }: { height?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ height, background: GRADIENT, ...style }} />
  );
}

export default function HomePage() {
  const [activePortal, setActivePortal] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 3px; }
      `}</style>

      <div style={{ background: "#0e0e0e", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#f5f5f5" }}>
        <GradientBar height={2} />

        {/* Nav */}
        <header style={{
          padding: "0 24px",
          height: 52,
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "#0e0e0e",
          zIndex: 50,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {COLORS.map((c) => (
                <div key={c} style={{ width: 4, height: 14, borderRadius: 2, background: c }} />
              ))}
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700 }}>
              BlackRoad OS
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {["Portals", "Agents", "Pricing", "Docs"].map((link) => (
              <a key={link} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#525252", textDecoration: "none" }}>
                {link}
              </a>
            ))}
            <a href="#" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#f5f5f5",
              textDecoration: "none",
              background: "#1a1a1a",
              border: "1px solid #262626",
              padding: "6px 14px",
              borderRadius: 7,
            }}>
              Sign in
            </a>
          </div>
        </header>

        {/* Hero */}
        <section
          style={{ maxWidth: 960, margin: "0 auto", padding: "96px 24px 80px", textAlign: "center" }}
        >
          <div style={{
            display: "inline-block",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#525252",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            border: "1px solid #1a1a1a",
            padding: "4px 12px",
            borderRadius: 4,
            marginBottom: 24,
          }}>
            BlackRoad OS — Beta
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 24,
            background: GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            The OS that puts you<br />back in control
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: "#525252",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}>
            20 portals. 1,000 AI agents. One operating system built on truth,
            ownership, and community — not extraction.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#0e0e0e",
              background: GRADIENT,
              padding: "12px 28px",
              borderRadius: 8,
              textDecoration: "none",
              display: "inline-block",
            }}>
              Get Started — Free
            </a>
            <a href="#" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#737373",
              background: "transparent",
              border: "1px solid #1a1a1a",
              padding: "12px 28px",
              borderRadius: 8,
              textDecoration: "none",
              display: "inline-block",
            }}>
              Read the Docs
            </a>
          </div>
        </section>

        {/* Stats */}
        <section style={{ borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
          <div style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "32px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 0,
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                textAlign: "center",
                padding: "20px 16px",
                borderRight: i < STATS.length - 1 ? "1px solid #1a1a1a" : "none",
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#f5f5f5",
                  marginBottom: 4,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#333",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portals */}
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#525252",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 8,
          }}>
            The Ecosystem
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700,
            color: "#f5f5f5",
            letterSpacing: "-0.02em",
            marginBottom: 40,
          }}>
            Six portals. One OS.
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 12,
          }}>
            {PORTALS.map((p, i) => (
              <div
                key={p.name}
                onMouseEnter={() => setActivePortal(i)}
                onMouseLeave={() => setActivePortal(null)}
                style={{
                  background: activePortal === i ? "#111" : "#0e0e0e",
                  border: "1px solid",
                  borderColor: activePortal === i ? "#262626" : "#1a1a1a",
                  borderRadius: 10,
                  padding: "20px 22px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#f5f5f5",
                  }}>
                    {p.name}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "#333",
                    background: "#141414",
                    border: "1px solid #1a1a1a",
                    padding: "2px 7px",
                    borderRadius: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}>
                    {p.tag}
                  </span>
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#525252",
                  lineHeight: 1.6,
                }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section style={{ borderTop: "1px solid #1a1a1a", background: "#080808" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "72px 24px" }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}>
              Core Principles
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
              marginBottom: 40,
            }}>
              Built differently, on purpose.
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}>
              {PRINCIPLES.map((p, i) => (
                <div key={p.number} style={{
                  background: "#111",
                  border: "1px solid #1a1a1a",
                  borderRadius: 10,
                  padding: "22px 22px",
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: COLORS[i] || "#333",
                    marginBottom: 10,
                  }}>
                    {p.number}
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#f5f5f5",
                    marginBottom: 8,
                  }}>
                    {p.title}
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#525252",
                    lineHeight: 1.6,
                  }}>
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: "1px solid #1a1a1a", padding: "32px 24px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 3 }}>
                {COLORS.map((c) => (
                  <div key={c} style={{ width: 3, height: 10, borderRadius: 1, background: c }} />
                ))}
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "#404040" }}>
                BlackRoad OS, Inc.
              </span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#262626" }}>
              © 2025 · All rights reserved
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
