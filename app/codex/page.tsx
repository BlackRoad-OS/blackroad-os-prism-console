import { loadCodexPrompt } from '@/lib/codex';

export default async function CodexPage() {
  const codex = await loadCodexPrompt();

  return (
    <div className="flex flex-col gap-6">
      <header className="card-surface p-5">
        <p className="text-sm text-gray-400">{codex.repo}</p>
        <h1 className="text-2xl font-semibold">{codex.agent_class} Codex</h1>
        <p className="mt-2 text-sm text-gray-300">{codex.purpose}</p>
        <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm leading-relaxed text-gray-200 whitespace-pre-wrap">
          {codex.prompt}
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <CodexList title="Inputs" items={codex.inputs} />
        <CodexList title="Outputs" items={codex.outputs} />
        <CodexList title="Routes" items={codex.routes} />
        <CodexList title="Tags" items={codex.tags} />
      </div>
    </div>
  );
}

function CodexList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="card-surface p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-gray-300">
        {items.map((item) => (
          <li key={item} className="rounded bg-black/20 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
