import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const AGENTS = [
  { name: "Alice", role: "Gateway", desc: "Orchestrates all incoming requests across the mesh. The front door — fast, reliable, tireless.", color: COLORS[0], uptime: "347d", mem: "2.4TB" },
  { name: "Lucidia", role: "Core Intelligence", desc: "Primary AI engine. Conversation, reasoning, code generation. The mind at the center of everything.", color: COLORS[1], uptime: "289d", mem: "1.8TB" },
  { name: "Cecilia", role: "Memory", desc: "Manages PS-SHA∞ journals and truth state commits. Every interaction persisted, every hash verified.", color: COLORS[2], uptime: "289d", mem: "1.2TB" },
  { name: "Cece", role: "Governance", desc: "Policy evaluation, ledger integrity, audit trails. The conscience of the system — 12,400 evaluations, zero bypasses.", color: COLORS[3], uptime: "245d", mem: "940GB" },
  { name: "Eve", role: "Monitoring", desc: "Anomaly detection, auto-scaling, alerting. Watches everything so nothing breaks quietly.", color: COLORS[4], uptime: "156d", mem: "380GB" },
  { name: "Meridian", role: "Architecture", desc: "System design and capability planning. Thinks about how all the pieces fit together long-term.", color: COLORS[5], uptime: "194d", mem: "620GB" },
  { name: "Cadence", role: "Music", desc: "AI composition, hum-to-track, vibe-based production. Turns melodies in your head into finished tracks.", color: COLORS[0], uptime: "112d", mem: "290GB" },
  { name: "Radius", role: "Physics", desc: "Simulation, quantum experiments, scientific calculation. The lab partner who never sleeps.", color: COLORS[1], uptime: "98d", mem: "210GB" },
];

const VALUES = [
  { num: "01", title: "Community over extraction", body: "Every design decision asks: does this serve humans, or does it serve metrics? We choose humans. Every time." },
  { num: "02", title: "Contradictions are fuel", body: "K(t) = C(t) · e^(λ|δ_t|). We don't resolve contradictions — we harness them. Creative energy scales super-linearly with tension." },
  { num: "03", title: "Messy brilliance welcome", body: "BlackRoad is built for disorganized dreamers, not spreadsheet perfectionists. Bring your chaos. The OS brings structure." },
  { num: "04", title: "Ownership is non-negotiable", body: "Your data, your content, your audience, your agents. Export everything, anytime. No lock-in. No hostage-taking." },
  { num: "05", title: "Transparency by default", body: "Every policy evaluation logged. Every decision auditable. Every confidence score visible. Zero bypasses." },
  { num: "06", title: "The math is real", body: "317+ equations. Five novel frameworks. Peer-reviewable foundations. This isn't marketing — it's mathematics." },
];

const TIMELINE = [
  { year: "2024", events: ["317+ equations documented across seven volumes", "Z-Framework and 1-2-3-4 Pauli Model formalized", "20-domain architecture designed"] },
  { year: "2025", events: ["BlackRoad OS, Inc. incorporated (Delaware C-Corp)", "Lucidia Core online — chat, memory, code execution", "Core app shell deployed at app.blackroad.io", "First 8 agents spawned and operational"] },
  { year: "2026", events: ["Phase 1 MVP completion", "RoadWork v0 — first education vertical", "First Pi agent on mesh network", "SOC 2 compliance target"] },
];

function GradientBar({ height = 1, style = {} }: { height?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ height, background: GRADIENT, ...style }} />
  );
}

export default function AboutPage() {
  const [activeAgent, setActiveAgent] = useState<number | null>(null);

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
        <GradientBar height={1} />

        {/* Header */}
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
          <div style={{ display: "flex", gap: 18 }}>
            {["Portals", "Pricing", "Docs"].map((l) => (
              <a key={l} href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#525252", textDecoration: "none" }}>
                {l}
              </a>
            ))}
          </div>
        </header>

        <main style={{ maxWidth: 960, margin: "0 auto", padding: "72px 24px 80px" }}>

          {/* Hero */}
          <section style={{ marginBottom: 80, textAlign: "center" }}>
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
              About BlackRoad OS
            </div>

            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#f5f5f5",
              marginBottom: 20,
            }}>
              An operating system built<br />on math, not vibes.
            </h1>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              color: "#525252",
              lineHeight: 1.7,
              maxWidth: 540,
              margin: "0 auto",
            }}>
              BlackRoad began as a collection of equations. 317 of them, across seven volumes,
              over years of obsessive research into the relationship between AI, consciousness,
              governance, and human potential.
            </p>
          </section>

          {/* Agents */}
          <section style={{ marginBottom: 80 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}>
              The Team
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
              marginBottom: 32,
            }}>
              8 agents. 1 mission.
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
            }}>
              {AGENTS.map((agent, i) => (
                <div
                  key={agent.name}
                  onMouseEnter={() => setActiveAgent(i)}
                  onMouseLeave={() => setActiveAgent(null)}
                  style={{
                    background: activeAgent === i ? "#111" : "#0e0e0e",
                    border: "1px solid",
                    borderColor: activeAgent === i ? "#262626" : "#1a1a1a",
                    borderRadius: 10,
                    padding: "20px 22px",
                    cursor: "default",
                    transition: "all 0.15s",
                    borderTop: `2px solid ${agent.color}`,
                  }}
                >
                  <div style={{ marginBottom: 10 }}>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#f5f5f5",
                      marginBottom: 2,
                    }}>
                      {agent.name}
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: agent.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}>
                      {agent.role}
                    </div>
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#525252",
                    lineHeight: 1.6,
                    marginBottom: 14,
                  }}>
                    {agent.desc}
                  </p>
                  <div style={{ display: "flex", gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Uptime</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#404040" }}>{agent.uptime}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#333", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Memory</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#404040" }}>{agent.mem}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Values */}
          <section style={{ marginBottom: 80 }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}>
              What We Believe
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
              marginBottom: 32,
            }}>
              Six things we won't compromise on.
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 12,
            }}>
              {VALUES.map((v, i) => (
                <div key={v.num} style={{
                  background: "#111",
                  border: "1px solid #1a1a1a",
                  borderRadius: 10,
                  padding: "22px 22px",
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: COLORS[i % COLORS.length],
                    marginBottom: 10,
                  }}>
                    {v.num}
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#f5f5f5",
                    marginBottom: 8,
                  }}>
                    {v.title}
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#525252",
                    lineHeight: 1.6,
                  }}>
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#525252",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}>
              History
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
              marginBottom: 32,
            }}>
              The road so far.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {TIMELINE.map((entry, i) => (
                <div key={entry.year} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    fontWeight: 500,
                    color: COLORS[i % COLORS.length],
                    width: 48,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}>
                    {entry.year}
                  </div>
                  <div style={{
                    flex: 1,
                    background: "#111",
                    border: "1px solid #1a1a1a",
                    borderRadius: 8,
                    padding: "16px 18px",
                  }}>
                    {entry.events.map((event) => (
                      <div key={event} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        marginBottom: 8,
                      }}>
                        <span style={{ color: COLORS[i % COLORS.length], flexShrink: 0, fontSize: 12, marginTop: 1 }}>→</span>
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 13,
                          color: "#525252",
                          lineHeight: 1.5,
                        }}>
                          {event}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

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
