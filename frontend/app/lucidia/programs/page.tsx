import Panel from "@/components/Panel";
import StatusPill, { Status } from "@/components/StatusPill";

const programs: { name: string; id: string; version: string; owner: string; status: Status }[] = [
  { name: "Atlas-extract", id: "LCP-023", version: "1.4.2", owner: "atlas", status: "healthy" },
  { name: "Sigmaplex sync", id: "LCP-011", version: "2.0.0", owner: "trace", status: "degraded" },
  { name: "Worldline audit", id: "LCP-007", version: "0.9.8", owner: "spectrum", status: "healthy" },
];

export default function LucidiaProgramsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Lucidia</p>
          <h1 className="text-3xl font-bold text-white">Programs</h1>
          <p className="text-zinc-400 mt-2">Catalog of Lucidia programs available in this environment.</p>
        </div>
        <button className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/20">
          New run
        </button>
      </div>

      <Panel subtitle="Name, id, owner, version" title="Program catalog">
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Program</th>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Version</th>
                <th className="px-4 py-3 text-left font-medium">Owner</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-black/20">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-zinc-900/40">
                  <td className="px-4 py-3 text-white font-medium">{program.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-400">{program.id}</td>
                  <td className="px-4 py-3 text-zinc-300">{program.version}</td>
                  <td className="px-4 py-3 text-zinc-300">{program.owner}</td>
                  <td className="px-4 py-3"><StatusPill status={program.status as any} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-xs">
                      <button className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-100">
                        Open
                      </button>
                      <button className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-100">
                        Run
                      </button>
                    </div>
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
