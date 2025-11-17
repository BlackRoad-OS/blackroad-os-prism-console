export default function DeploymentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Deployments</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8">
        Track and manage your application deployments.
      </p>
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          Deployment history and controls will be available here.
        </p>
      </div>
    </div>
  );
}
