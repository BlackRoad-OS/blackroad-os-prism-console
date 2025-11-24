import Panel from "@/components/Panel";

export default function EnvironmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Deploy</p>
        <h1 className="text-3xl font-bold text-white">Environments</h1>
        <p className="text-zinc-400 mt-2">Promote and observe the dev / stage / prod worldlines.</p>
      </div>

      <Panel title="Environment matrix" subtitle="dev → stage → prod">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["dev", "stage", "prod"].map((env) => (
            <div key={env} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
              <p className="text-lg font-semibold text-white uppercase">{env}</p>
              <p className="text-xs text-zinc-500">Configuration coming soon.</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-300">
                <button className="rounded-full border border-zinc-700 px-3 py-1 hover:border-emerald-500/40 hover:text-emerald-100">View config</button>
                <button className="rounded-full border border-zinc-700 px-3 py-1 hover:border-emerald-500/40 hover:text-emerald-100">Deploy</button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
