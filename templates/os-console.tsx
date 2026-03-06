import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const AGENTS = [
  { name: "alice", role: "Gateway", status: "active", mem: "2.4TB", uptime: "347d", load: 34 },
  { name: "lucidia", role: "Core AI", status: "active", mem: "1.8TB", uptime: "289d", load: 61 },
  { name: "cecilia", role: "Memory", status: "active", mem: "1.2TB", uptime: "289d", load: 28 },
  { name: "cece", role: "Governance", status: "active", mem: "940GB", uptime: "245d", load: 12 },
  { name: "meridian", role: "Architecture", status: "active", mem: "620GB", uptime: "194d", load: 45 },
  { name: "eve", role: "Monitoring", status: "active", mem: "380GB", uptime: "156d", load: 72 },
  { name: "cadence", role: "Music", status: "idle", mem: "290GB", uptime: "112d", load: 3 },
  { name: "radius", role: "Physics", status: "idle", mem: "210GB", uptime: "98d", load: 0 },
];

const SERVICES = [
  { name: "api.blackroad.io", status: "operational", latency: "12ms", uptime: "99.99%" },
  { name: "app.blackroad.io", status: "operational", latency: "34ms", uptime: "99.97%" },
  { name: "ws.blackroad.io", status: "operational", latency: "8ms", uptime: "99.98%" },
  { name: "mesh.blackroad.network", status: "operational", latency: "22ms", uptime: "99.95%" },
  { name: "ledger.blackroad.systems", status: "operational", latency: "18ms", uptime: "99.99%" },
  { name: "vectors.blackroad.systems", status: "degraded", latency: "89ms", uptime: "99.84%" },
];

const EVENTS = [
  { time: "2m ago", agent: "cecilia", action: "Memory commit #4821 — 3 entries written to PS-SHA∞ chain" },
  { time: "8m ago", agent: "cece", action: "Policy deployed: edu.review.teacher-only scope updated" },
  { time: "15m ago", agent: "eve", action: "Latency spike on mesh.na1 — auto-scaled, resolved in 2m" },
  { time: "34m ago", agent: "system", action: "DNS propagation complete for edu.blackroad.io" },
  { time: "1h ago", agent: "cadence", action: "Composition #42 exported — 3:42, C minor, 108 BPM" },
  { time: "2h ago", agent: "alice", action: "Gateway health check passed — 7 endpoints, 2.4k concurrent WS" },
  { time: "3h ago", agent: "cece", action: "Weekly governance: 12,400 evals, 0 bypasses, ledger verified" },
];

function GradientBar({ height = 1 }: { height?: number }) {
  return (
    <div style={{ height, background: GRADIENT }} />
  );
}

function LoadBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2, overflow: "hidden", width: 60 }}>
      <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 2 }} />
    </div>
  );
}

export default function OSConsolePage() {
  const [activeTab, setActiveTab] = useState<"agents" | "services" | "events">("agents");

  const activeAgents = AGENTS.filter((a) => a.status === "active").length;
  const operationalServices = SERVICES.filter((s) => s.status === "operational").length;

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

        {/* Top bar */}
        <header style={{
          padding: "0 20px",
          height: 48,
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "#0e0e0e",
          zIndex: 50,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 2 }}>
              {COLORS.map((c) => (
                <div key={c} style={{ width: 3, height: 12, borderRadius: 1, background: c }} />
              ))}
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>
              BlackRoad OS
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#333" }}>
              console
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4488FF" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#404040" }}>
                mesh.na1
              </span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#333" }}>
              {new Date().toUTCString().replace(" GMT", " UTC")}
            </div>
          </div>
        </header>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 60px" }}>

          {/* Summary cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 8,
            marginBottom: 24,
          }}>
            {[
              { label: "Active Agents", value: `${activeAgents} / ${AGENTS.length}`, color: COLORS[4] },
              { label: "Services Up", value: `${operationalServices} / ${SERVICES.length}`, color: COLORS[5] },
              { label: "Memory Commits", value: "4,821", color: COLORS[2] },
              { label: "Governance Evals", value: "12,400", color: COLORS[3] },
              { label: "Events (24h)", value: "347", color: COLORS[0] },
              { label: "Uptime", value: "99.97%", color: COLORS[1] },
            ].map((card) => (
              <div key={card.label} style={{
                background: "#111",
                border: "1px solid #1a1a1a",
                borderRadius: 8,
                padding: "14px 16px",
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: "#333",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 6,
                }}>
                  {card.label}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: card.color,
                }}>
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid #1a1a1a",
            marginBottom: 20,
          }}>
            {(["agents", "services", "events"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "1px solid #f5f5f5" : "1px solid transparent",
                  marginBottom: -1,
                  padding: "10px 18px",
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: activeTab === tab ? "#f5f5f5" : "#333",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Agents tab */}
          {activeTab === "agents" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Table header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "140px 120px 80px 80px 80px 1fr",
                gap: 0,
                padding: "8px 16px",
              }}>
                {["Agent", "Role", "Memory", "Uptime", "Status", "Load"].map((h) => (
                  <span key={h} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "#333",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}>
                    {h}
                  </span>
                ))}
              </div>
              {AGENTS.map((agent, i) => (
                <div key={agent.name} style={{
                  display: "grid",
                  gridTemplateColumns: "140px 120px 80px 80px 80px 1fr",
                  alignItems: "center",
                  gap: 0,
                  padding: "12px 16px",
                  background: "#111",
                  borderRadius: 6,
                  border: "1px solid #141414",
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: "#d4d4d4",
                  }}>
                    {agent.name}
                  </span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#525252",
                  }}>
                    {agent.role}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#404040",
                  }}>
                    {agent.mem}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#333",
                  }}>
                    {agent.uptime}
                  </span>
                  <div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: agent.status === "active" ? "#4488FF" : "#333",
                      background: agent.status === "active" ? "rgba(68,136,255,0.06)" : "#141414",
                      border: `1px solid ${agent.status === "active" ? "rgba(68,136,255,0.15)" : "#1a1a1a"}`,
                      padding: "2px 7px",
                      borderRadius: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}>
                      {agent.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <LoadBar value={agent.load} color={COLORS[i % COLORS.length]} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#333" }}>
                      {agent.load}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Services tab */}
          {activeTab === "services" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 80px 100px",
                gap: 0,
                padding: "8px 16px",
              }}>
                {["Service", "Status", "Latency", "Uptime"].map((h) => (
                  <span key={h} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "#333",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}>
                    {h}
                  </span>
                ))}
              </div>
              {SERVICES.map((svc) => (
                <div key={svc.name} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px 80px 100px",
                  alignItems: "center",
                  gap: 0,
                  padding: "12px 16px",
                  background: "#111",
                  borderRadius: 6,
                  border: "1px solid #141414",
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#d4d4d4" }}>
                    {svc.name}
                  </span>
                  <div>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: svc.status === "operational" ? "#4488FF" : "#FF2255",
                      background: svc.status === "operational" ? "rgba(68,136,255,0.06)" : "rgba(255,34,85,0.06)",
                      border: `1px solid ${svc.status === "operational" ? "rgba(68,136,255,0.15)" : "rgba(255,34,85,0.15)"}`,
                      padding: "2px 7px",
                      borderRadius: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}>
                      {svc.status}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#404040" }}>
                    {svc.latency}
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#525252" }}>
                    {svc.uptime}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Events tab */}
          {activeTab === "events" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {EVENTS.map((event, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "12px 16px",
                  background: "#111",
                  borderRadius: 6,
                  border: "1px solid #141414",
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#333", flexShrink: 0, marginTop: 2 }}>
                    {event.time}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: COLORS[i % COLORS.length],
                    flexShrink: 0,
                    marginTop: 2,
                    width: 64,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {event.agent}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#525252", lineHeight: 1.5 }}>
                    {event.action}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
