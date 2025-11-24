import Panel from "@/components/Panel";
import StatusPill, { Status } from "@/components/StatusPill";

const deployments: { id: string; target: string; status: Status; when: string }[] = [
  { id: "deploy-152", target: "stage", status: "running", when: "Now" },
  { id: "deploy-151", target: "stage", status: "healthy", when: "3h ago" },
  { id: "deploy-150", target: "prod", status: "healthy", when: "12h ago" },
];

export default function DeploymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Deploy</p>
        <h1 className="text-3xl font-bold text-white">Deployments</h1>
        <p className="text-zinc-400 mt-2">Track history, velocity, and current pushes across environments.</p>
      </div>

      <Panel title="Recent deployments" subtitle="Latest pushes into stage and prod">
        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Deployment</th>
                <th className="px-4 py-3 text-left font-medium">Target</th>
                <th className="px-4 py-3 text-left font-medium">When</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-black/20">
              {deployments.map((deploy) => (
                <tr key={deploy.id} className="hover:bg-zinc-900/40">
                  <td className="px-4 py-3 font-mono text-sm text-white">{deploy.id}</td>
                  <td className="px-4 py-3 text-zinc-300 uppercase">{deploy.target}</td>
                  <td className="px-4 py-3 text-zinc-300">{deploy.when}</td>
                  <td className="px-4 py-3"><StatusPill status={deploy.status as any} /></td>
                  <td className="px-4 py-3 text-xs">
                    <button className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-200 hover:border-emerald-500/40 hover:text-emerald-100">
                      Rollback
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
