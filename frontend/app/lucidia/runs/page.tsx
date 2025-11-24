import Panel from "@/components/Panel";
import StatusPill, { Status } from "@/components/StatusPill";

const runs: { id: string; program: string; status: Status; duration: string; environment: string }[] = [
  { id: "RUN-8421", program: "Atlas-extract", status: "running", duration: "08:24", environment: "stage" },
  { id: "RUN-8418", program: "Sigmaplex sync", status: "degraded", duration: "32:15", environment: "stage" },
  { id: "RUN-8413", program: "Worldline audit", status: "healthy", duration: "12:03", environment: "prod" },
];

export default function LucidiaRunsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Lucidia</p>
          <h1 className="text-3xl font-bold text-white">Runs & Windows</h1>
          <p className="text-zinc-400 mt-2">Nested execution, window-in-window state, and quick pivots to nodes.</p>
        </div>
        <button className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/20">
          Launch run
        </button>
      </div>

      <Panel title="Active runs" subtitle="Click through to inspect nodes and logs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {runs.map((run) => (
            <div key={run.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm text-white">{run.id}</p>
                  <p className="text-xs text-zinc-500">{run.program}</p>
                </div>
                <StatusPill status={run.status as any} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                <span>Duration</span>
                <span className="font-mono text-sm text-zinc-100">{run.duration}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                <span>Environment</span>
                <span className="rounded-full border border-zinc-700 px-2 py-1 text-emerald-100 bg-emerald-500/10">{run.environment}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-300">
                <button className="rounded-full border border-zinc-700 px-3 py-1 hover:border-emerald-500/40 hover:text-emerald-100">Open window</button>
                <button className="rounded-full border border-zinc-700 px-3 py-1 hover:border-emerald-500/40 hover:text-emerald-100">View graph</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
