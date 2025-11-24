import Panel from "@/components/Panel";
import StatusPill, { Status } from "@/components/StatusPill";

const agents: { name: string; capabilities: string; status: Status; lastRun: string }[] = [
  { name: "atlas", capabilities: "retrieval, summarization", status: "healthy", lastRun: "2m ago" },
  { name: "spectrum", capabilities: "graphs, timelines", status: "running", lastRun: "7m ago" },
  { name: "trace", capabilities: "provenance, SIG", status: "degraded", lastRun: "15m ago" },
];

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Agents</p>
        <h1 className="text-3xl font-bold text-white">Active agents</h1>
        <p className="text-zinc-400 mt-2">Line of sight across the agent village, including hot and failing workers.</p>
      </div>

      <Panel title="Roster" subtitle="Agents, capabilities, and last activity">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <div key={agent.name} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{agent.name}</p>
                  <p className="text-xs text-zinc-500">{agent.capabilities}</p>
                </div>
                <StatusPill status={agent.status as any} />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                <span>Last run</span>
                <span className="font-mono text-sm text-zinc-100">{agent.lastRun}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-300">
                <button className="rounded-full border border-zinc-700 px-3 py-1 hover:border-emerald-500/40 hover:text-emerald-100">Inspect</button>
                <button className="rounded-full border border-zinc-700 px-3 py-1 hover:border-emerald-500/40 hover:text-emerald-100">Open logs</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
