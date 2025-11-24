import Panel from "@/components/Panel";
import StatusPill, { Status } from "@/components/StatusPill";

const anchors: { anchor: string; bound: string; status: Status; worldline: string }[] = [
  { anchor: "PS-SHA∞:0x9af...c12", bound: "atlas", status: "healthy", worldline: "WL-17" },
  { anchor: "PS-SHA∞:0x7db...a45", bound: "spectrum", status: "running", worldline: "WL-08" },
  { anchor: "PS-SHA∞:0x5c2...fe1", bound: "trace", status: "investigating", worldline: "WL-03" },
];

export default function IdentityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Identity</p>
          <h1 className="text-3xl font-bold text-white">SIG / PS-SHA∞</h1>
          <p className="text-zinc-400 mt-2">Map programs, runs, and agents back to their provenance anchors.</p>
        </div>
        <button className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/20">
          Open worldline
        </button>
      </div>

      <Panel title="Anchors" subtitle="Verified identity bindings">
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Anchor</th>
                <th className="px-4 py-3 text-left font-medium">Bound entity</th>
                <th className="px-4 py-3 text-left font-medium">Worldline</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-black/20">
              {anchors.map((anchor) => (
                <tr key={anchor.anchor} className="hover:bg-zinc-900/40">
                  <td className="px-4 py-3 font-mono text-xs text-white">{anchor.anchor}</td>
                  <td className="px-4 py-3 text-zinc-300">{anchor.bound}</td>
                  <td className="px-4 py-3 text-zinc-300">{anchor.worldline}</td>
                  <td className="px-4 py-3"><StatusPill status={anchor.status as any} /></td>
                  <td className="px-4 py-3 text-xs">
                    <button className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-100">
                      Trace
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
