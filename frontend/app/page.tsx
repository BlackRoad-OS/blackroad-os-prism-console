export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Prism Console</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Manage your BlackRoad OS environments, deployments, and observability from this console.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Environments</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            View and manage your deployment environments
          </p>
        </div>
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Deployments</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Track and control your application deployments
          </p>
        </div>
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Logs</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Monitor and analyze system logs
          </p>
        </div>
      </div>
    </div>
  );
}
