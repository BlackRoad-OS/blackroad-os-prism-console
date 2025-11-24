"use client";

import { useState } from "react";

const environments = ["dev", "stage", "prod"];
const healthIndicators = [
  { label: "core", status: "healthy" },
  { label: "operator", status: "degraded" },
  { label: "web", status: "healthy" },
  { label: "infra", status: "investigating" },
];

const statusColor: Record<string, string> = {
  healthy: "bg-emerald-500/20 text-emerald-200 border-emerald-500/40",
  degraded: "bg-amber-500/20 text-amber-200 border-amber-500/40",
  investigating: "bg-sky-500/20 text-sky-200 border-sky-500/40",
};

export default function TopBar() {
  const [environment, setEnvironment] = useState("stage");

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#111827] bg-black/30 backdrop-blur"> 
      <div className="flex items-center gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Environment</p>
          <div className="flex items-center gap-2 mt-1">
            {environments.map((env) => (
              <button
                key={env}
                onClick={() => setEnvironment(env)}
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors duration-200 ${
                  environment === env
                    ? "bg-emerald-500/10 border-emerald-400 text-emerald-100"
                    : "border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700"
                }`}
              >
                {env}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {healthIndicators.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                statusColor[item.status]
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
              <span className="capitalize">{item.label}</span>
              <span className="text-[11px] uppercase tracking-wide opacity-80">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400">
          <span className="text-zinc-500">Search</span>
          <span className="font-mono text-[11px] text-zinc-500">/</span>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Identity</span>
            <span className="font-mono text-sm text-zinc-200">founder@blackroad</span>
          </div>
        </div>
      </div>
    </header>
  );
}
