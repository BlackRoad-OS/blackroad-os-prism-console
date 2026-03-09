import { useState } from "react";

const COLORS = [
  { hex: "#FF6B2B", name: "Ember", token: "--accent-1" },
  { hex: "#FF2255", name: "Fuse", token: "--accent-2" },
  { hex: "#CC00AA", name: "Pulse", token: "--accent-3" },
  { hex: "#8844FF", name: "Drift", token: "--accent-4" },
  { hex: "#4488FF", name: "Signal", token: "--accent-5" },
  { hex: "#00D4FF", name: "Arc", token: "--accent-6" },
];

const GRAYS = [
  { hex: "#0a0a0a", name: "950" },
  { hex: "#171717", name: "900" },
  { hex: "#262626", name: "800" },
  { hex: "#404040", name: "700" },
  { hex: "#737373", name: "500" },
  { hex: "#a3a3a3", name: "400" },
  { hex: "#d4d4d4", name: "300" },
  { hex: "#f5f5f5", name: "100" },
];

function GradientBar({ height = 2 }: { height?: number }) {
  return (
    <div
      style={{
        height,
        background: `linear-gradient(90deg, ${COLORS.map((c) => c.hex).join(", ")})`,
        borderRadius: height >= 4 ? 4 : 0,
      }}
    />
  );
}

function ColorSwatch({ hex, name, token }: { hex: string; name: string; token: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div
      onClick={handleCopy}
      style={{
        cursor: "pointer",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #1a1a1a",
        background: "#111",
      }}
    >
      <div style={{ height: 72, background: hex }} />
      <div style={{ padding: "10px 12px" }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#f5f5f5",
            marginBottom: 2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#525252",
            marginBottom: 4,
          }}
        >
          {hex}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#333",
          }}
        >
          {token}
        </div>
        {copied && (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#4488FF",
              marginTop: 4,
            }}
          >
            copied
          </div>
        )}
      </div>
    </div>
  );
}

function GraySwatch({ hex, name }: { hex: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div
      onClick={handleCopy}
      style={{
        cursor: "pointer",
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid #1a1a1a",
        background: "#111",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: hex,
          border: "1px solid #262626",
          flexShrink: 0,
        }}
      />
      <div>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "#d4d4d4",
          }}
        >
          Gray {name}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#525252",
          }}
        >
          {hex}
          {copied && <span style={{ marginLeft: 8, color: "#4488FF" }}>copied</span>}
        </div>
      </div>
    </div>
  );
}

export default function BrandColorsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 3px; }
      `}</style>

      <div
        style={{
          background: "#0e0e0e",
          minHeight: "100vh",
          fontFamily: "'Inter', sans-serif",
          color: "#f5f5f5",
        }}
      >
        <GradientBar height={2} />

        {/* Header */}
        <header
          style={{
            padding: "0 24px",
            height: 52,
            borderBottom: "1px solid #1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {COLORS.map((c) => (
                <div
                  key={c.hex}
                  style={{ width: 4, height: 14, borderRadius: 2, background: c.hex }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#f5f5f5",
              }}
            >
              BlackRoad Brand Colors
            </span>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#333",
            }}
          >
            v1.0 — 2025
          </span>
        </header>

        <main style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>
          {/* Accent gradient strip */}
          <div style={{ marginBottom: 48 }}>
            <GradientBar height={8} />
          </div>

          {/* Accent colors */}
          <section style={{ marginBottom: 48 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#525252",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              Accent Palette
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 12,
              }}
            >
              {COLORS.map((c) => (
                <ColorSwatch key={c.hex} {...c} />
              ))}
            </div>
          </section>

          {/* Neutrals */}
          <section style={{ marginBottom: 48 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#525252",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              Neutral / Gray Scale
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 8,
              }}
            >
              {GRAYS.map((g) => (
                <GraySwatch key={g.hex} {...g} />
              ))}
            </div>
          </section>

          {/* CSS tokens reference */}
          <section>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "#525252",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              CSS Custom Properties
            </div>
            <div
              style={{
                background: "#111",
                border: "1px solid #1a1a1a",
                borderRadius: 10,
                padding: "20px 24px",
              }}
            >
              <pre
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#a3a3a3",
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {`:root {\n${COLORS.map((c) => `  ${c.token}: ${c.hex};  /* ${c.name} */`).join("\n")}\n}`}
              </pre>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
