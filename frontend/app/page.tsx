import Panel from "@/components/Panel";
import StatusPill, { Status } from "@/components/StatusPill";

export default function Home() {
  const health: { name: string; status: Status; detail: string }[] = [
    { name: "Core", status: "healthy", detail: "All signals within thresholds" },
    { name: "Operator", status: "degraded", detail: "Retry spike detected" },
    { name: "Web", status: "healthy", detail: "All edges responding" },
    { name: "Infra", status: "investigating", detail: "Reviewing overnight alerts" },
  ];

  const metrics = [
    { label: "Active runs", value: 18, trend: "+4 vs last hour" },
    { label: "Failed runs (24h)", value: 3, trend: "-2 vs baseline" },
    { label: "Queue depth", value: 42, trend: "+11 inflight" },
    { label: "Agents online", value: 12, trend: "3 running hot" },
  ];

  const live: { title: string; time: string; status: Status }[] = [
    { title: "Window #5 recovered", time: "1m ago", status: "healthy" },
    { title: "Agent atlas retrying", time: "4m ago", status: "degraded" },
    { title: "New SIG anchor published", time: "12m ago", status: "running" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Prism Console</p>
        <h1 className="text-4xl font-bold text-white">System Overview</h1>
        <p className="text-zinc-400 mt-2 max-w-3xl">
          The glass cockpit for Lucidia programs, nested runs, agents, and the operator stack. Everything you
          and your agents need to steer the worldlines in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Panel title="Health" subtitle="Core, operator, web, infra at a glance">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {health.map((item) => (
              <div key={item.name} className="flex items-start justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                <div>
                  <p className="text-sm text-zinc-400">{item.name}</p>
                  <p className="text-sm text-zinc-500 mt-1">{item.detail}</p>
                </div>
                <StatusPill status={item.status} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Ops pulse" subtitle="Runs, agents, queues" action={<a className="text-emerald-300 hover:text-emerald-200" href="/lucidia/runs">Open runs</a>}>
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <p className="text-sm text-zinc-400">{metric.label}</p>
                <p className="text-3xl font-semibold text-white mt-1">{metric.value}</p>
                <p className="text-xs text-emerald-300 mt-1">{metric.trend}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Live signals" subtitle="Last 15 minutes" action={<a className="text-emerald-300 hover:text-emerald-200" href="/jobs">Jump to jobs</a>}>
          <div className="space-y-3">
            {live.map((event) => (
              <div key={event.title} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{event.title}</p>
                  <p className="text-xs text-zinc-500">{event.time}</p>
                </div>
                <StatusPill status={event.status} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel title="Lucidia programs" subtitle="Catalog of programs ready to run" action={<a className="text-emerald-300 hover:text-emerald-200" href="/lucidia/programs">Browse all</a>}>
          <div className="space-y-3">
            {["Atlas-extract", "Sigmaplex sync", "Worldline audit"].map((program) => (
              <div key={program} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{program}</p>
                  <p className="text-xs text-zinc-500">Lucidia program</p>
                </div>
                <button className="text-xs font-medium text-emerald-200 border border-emerald-500/50 rounded-full px-3 py-1 hover:bg-emerald-500/10">
                  Open
                </button>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Runs & windows" subtitle="Nested execution view" action={<a className="text-emerald-300 hover:text-emerald-200" href="/lucidia/runs">View runs</a>}>
          <div className="space-y-3">
            {["RUN-8421", "RUN-8418", "RUN-8413"].map((run) => (
              <div key={run} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                <div>
                  <p className="font-mono text-sm text-white">{run}</p>
                  <p className="text-xs text-zinc-500">Lucidia window-in-window</p>
                </div>
                <StatusPill status="running" />
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Agents" subtitle="Online + hot + failing" action={<a className="text-emerald-300 hover:text-emerald-200" href="/agents">Inspect agents</a>}>
          <div className="space-y-3">
            {["atlas", "spectrum", "trace"].map((agent) => (
              <div key={agent} className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{agent}</p>
                  <p className="text-xs text-zinc-500">Agent</p>
                </div>
                <StatusPill status="healthy" />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
