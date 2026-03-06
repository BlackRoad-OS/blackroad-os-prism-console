import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const PLANS = [
  {
    name: "Open",
    price: "0",
    period: "",
    desc: "For learners, explorers, and anyone who just wants to see what this is.",
    features: [
      "Full K-12 RoadWork access",
      "Lucidia chat — 50 messages/day",
      "RoadView search — unlimited",
      "BackRoad social — full access",
      "1 AI agent companion",
      "Community support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Builder",
    price: "10",
    period: "/mo",
    desc: "For creators, students, and independent professionals building real things.",
    features: [
      "Everything in Open",
      "Unlimited Lucidia chat + code",
      "RoadGlitch automations — 100/mo",
      "SoundRoad — 10 tracks/mo",
      "Genesis Road — basic 3D",
      "VaultRoad second brain — 10GB",
      "5 AI agents with memory",
      "CashRoad financial co-pilot",
      "Priority support",
    ],
    cta: "Start Building",
    highlight: true,
  },
  {
    name: "Studio",
    price: "29",
    period: "/mo",
    desc: "For teams, studios, and serious creators who need the full stack.",
    features: [
      "Everything in Builder",
      "Unlimited automations",
      "SoundRoad — unlimited tracks",
      "Genesis Road — full engine",
      "VaultRoad — 100GB",
      "25 AI agents with persistent memory",
      "RoadWorld — publish & earn",
      "80% revenue on all content",
      "API access",
      "Team collaboration — up to 5",
    ],
    cta: "Go Studio",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For schools, organizations, and companies that need the OS at scale.",
    features: [
      "Everything in Studio",
      "Unlimited agents",
      "Custom agent training",
      "Dedicated infrastructure",
      "SSO / SAML / SCIM",
      "Compliance & audit logs",
      "Outcome-based pricing for schools",
      "SLA guarantee",
      "Dedicated support engineer",
    ],
    cta: "Talk to Us",
    highlight: false,
  },
];

const FAQS = [
  { q: "What's outcome-based pricing?", a: "Schools pay per successful student outcome — not per seat. If a student doesn't learn, you don't pay. We believe in aligning incentives with actual results." },
  { q: "Can I switch plans anytime?", a: "Yes. Upgrade instantly, downgrade at end of billing cycle. No contracts, no cancellation fees, no friction." },
  { q: "What does 80% creator revenue mean?", a: "When you publish content, sell assets, or earn through the ecosystem, you keep 80%. Compare that to Roblox at 29%, YouTube at 55%, or Spotify at roughly 0.3%." },
  { q: "What's an AI agent with memory?", a: "Each agent has persistent memory via PS-SHA∞ hashing. They remember every interaction, evolve over time, and develop individual capabilities. They're teammates, not tools." },
  { q: "Is my data portable?", a: "Always. Export everything — your content, your audience contacts, your agent configurations, your vault. You own it all." },
  { q: "Do you sell my data?", a: "No. Ever. Your data trains nothing except your own agents. BlackRoad is funded by subscriptions and creator revenue sharing — not surveillance." },
];

const COMPARISONS = [
  { feature: "Creator revenue share", blackroad: "80%", others: "29–55%" },
  { feature: "Data ownership", blackroad: "Full export", others: "Platform-locked" },
  { feature: "AI agents with memory", blackroad: "Up to 1,000", others: "None" },
  { feature: "Search verification", blackroad: "Confidence scored", others: "SEO-driven" },
  { feature: "Social metrics", blackroad: "Hidden by design", others: "Vanity-first" },
  { feature: "Admin automation", blackroad: "Zero-friction OS", others: "Manual" },
];

function GradientBar({ height = 2, style = {} }: { height?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ height, background: GRADIENT, ...style }} />
  );
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        </header>

        <main style={{ maxWidth: 1020, margin: "0 auto", padding: "64px 24px 80px" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#f5f5f5",
              marginBottom: 16,
            }}>
              Simple pricing.<br />Real value.
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "#525252",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto",
            }}>
              Start free. Scale when you're ready. No dark patterns,
              no bait-and-switch, no cancellation friction.
            </p>
          </div>

          {/* Plans grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 12,
            marginBottom: 72,
          }}>
            {PLANS.map((plan) => (
              <div key={plan.name} style={{
                background: plan.highlight ? "#111" : "#0e0e0e",
                border: "1px solid",
                borderColor: plan.highlight ? "#262626" : "#1a1a1a",
                borderRadius: 12,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}>
                {plan.highlight && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: GRADIENT,
                  }} />
                )}

                {plan.highlight && (
                  <div style={{
                    display: "inline-block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "#525252",
                    border: "1px solid #1a1a1a",
                    padding: "2px 8px",
                    borderRadius: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 12,
                    width: "fit-content",
                  }}>
                    Most Popular
                  </div>
                )}

                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#f5f5f5",
                  marginBottom: 8,
                }}>
                  {plan.name}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: plan.price === "Custom" ? 24 : 32,
                    fontWeight: 700,
                    color: "#f5f5f5",
                  }}>
                    {plan.price === "0" ? "Free" : plan.price === "Custom" ? "Custom" : `$${plan.price}`}
                  </span>
                  {plan.period && (
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "#404040",
                      marginLeft: 2,
                    }}>
                      {plan.period}
                    </span>
                  )}
                </div>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "#404040",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}>
                  {plan.desc}
                </p>

                <div style={{ flex: 1, marginBottom: 24 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 8,
                    }}>
                      <span style={{ color: "#525252", marginTop: 1, flexShrink: 0, fontSize: 12 }}>✓</span>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "#525252",
                        lineHeight: 1.5,
                      }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <button style={{
                  width: "100%",
                  padding: "11px 0",
                  borderRadius: 8,
                  border: plan.highlight ? "none" : "1px solid #1a1a1a",
                  background: plan.highlight ? GRADIENT : "transparent",
                  color: plan.highlight ? "#0e0e0e" : "#525252",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <section style={{ marginBottom: 72 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}>
              How we compare
            </h2>
            <div style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: 10, overflow: "hidden" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                gap: 0,
                borderBottom: "1px solid #1a1a1a",
                padding: "12px 20px",
              }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.08em" }}>Feature</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.08em", width: 120, textAlign: "center" }}>BlackRoad</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: "0.08em", width: 120, textAlign: "center" }}>Others</span>
              </div>
              {COMPARISONS.map((row, i) => (
                <div key={row.feature} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: 0,
                  padding: "14px 20px",
                  borderBottom: i < COMPARISONS.length - 1 ? "1px solid #141414" : "none",
                }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#737373" }}>{row.feature}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#a3a3a3", width: 120, textAlign: "center", fontWeight: 500 }}>{row.blackroad}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#333", width: 120, textAlign: "center" }}>{row.others}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#f5f5f5",
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}>
              Questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {FAQS.map((faq, i) => {
                const isFirst = i === 0;
                const isLast = i === FAQS.length - 1;
                const borderRadius = isFirst ? "8px 8px 0 0" : isLast ? "0 0 8px 8px" : 0;
                return (
                <div key={i} style={{ background: "#111", borderRadius, overflow: "hidden" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      borderBottom: openFaq === i ? "1px solid #141414" : "none",
                      padding: "16px 18px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#d4d4d4", fontWeight: 500 }}>
                      {faq.q}
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#333", flexShrink: 0 }}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "14px 18px 16px" }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#525252", lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
