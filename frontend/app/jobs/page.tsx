import Panel from "@/components/Panel";
import StatusPill, { Status } from "@/components/StatusPill";

const queues: { name: string; depth: number; status: Status }[] = [
  { name: "default", depth: 42, status: "running" },
  { name: "priority", depth: 6, status: "healthy" },
  { name: "slow", depth: 18, status: "degraded" },
];

const jobs: { id: string; queue: string; status: Status; runtime: string }[] = [
  { id: "JOB-2033", queue: "priority", status: "running", runtime: "00:48" },
  { id: "JOB-2031", queue: "default", status: "healthy", runtime: "03:11" },
  { id: "JOB-2029", queue: "slow", status: "degraded", runtime: "12:45" },
];

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Operator</p>
          <h1 className="text-3xl font-bold text-white">Jobs & Queues</h1>
          <p className="text-zinc-400 mt-2">Borrowed from operator: queue depth, inflight work, and retry heat.</p>
        </div>
        <button className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/20">
          Drain queue
        </button>
      </div>

      <Panel title="Queues" subtitle="Depth and health by queue">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {queues.map((queue) => (
            <div key={queue.name} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{queue.name}</p>
                  <p className="text-xs text-zinc-500">Queue depth</p>
                </div>
                <StatusPill status={queue.status as any} />
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">{queue.depth}</p>
              <p className="text-xs text-zinc-500">messages</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-300">
                <button className="rounded-full border border-zinc-700 px-3 py-1 hover:border-emerald-500/40 hover:text-emerald-100">Inspect</button>
                <button className="rounded-full border border-zinc-700 px-3 py-1 hover:border-emerald-500/40 hover:text-emerald-100">Retry all</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Recent jobs" subtitle="Last 10 jobs across queues">
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Job</th>
                <th className="px-4 py-3 text-left font-medium">Queue</th>
                <th className="px-4 py-3 text-left font-medium">Runtime</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-black/20">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-zinc-900/40">
                  <td className="px-4 py-3 font-mono text-sm text-white">{job.id}</td>
                  <td className="px-4 py-3 text-zinc-300">{job.queue}</td>
                  <td className="px-4 py-3 text-zinc-300">{job.runtime}</td>
                  <td className="px-4 py-3"><StatusPill status={job.status as any} /></td>
                  <td className="px-4 py-3 text-xs">
                    <button className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-100">
                      Retry
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
