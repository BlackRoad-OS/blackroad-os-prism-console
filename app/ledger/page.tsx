import { Suspense } from 'react';

interface LedgerEntry {
  id: string;
  timestamp: string;
  agentId: string;
  action: string;
  target?: string;
  hash: string;
  previousHash?: string;
  data: Record<string, any>;
}

async function fetchLedger(): Promise<LedgerEntry[]> {
  try {
    const res = await fetch('https://api.blackroad.io/ledger', {
      next: { revalidate: 5 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.entries || [];
  } catch (error) {
    console.error('Failed to fetch ledger:', error);
    return [];
  }
}

function LedgerEntryCard({ entry }: { entry: LedgerEntry }) {
  return (
    <div className="card-surface p-4 font-mono text-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-blue-400">{entry.action}</span>
            {entry.target && (
              <>
                <span className="text-gray-600">→</span>
                <span className="text-gray-400">{entry.target}</span>
              </>
            )}
          </div>

          <div className="mt-2 text-xs text-gray-500">
            <div>Agent: {entry.agentId}</div>
            <div>Hash: {entry.hash.substring(0, 16)}...</div>
            {entry.previousHash && (
              <div>Prev: {entry.previousHash.substring(0, 16)}...</div>
            )}
          </div>

          {Object.keys(entry.data).length > 0 && (
            <details className="mt-3">
              <summary className="text-gray-400 cursor-pointer hover:text-gray-300">
                Data ({Object.keys(entry.data).length} fields)
              </summary>
              <pre className="mt-2 text-xs text-gray-500 bg-black/30 p-2 rounded overflow-x-auto">
                {JSON.stringify(entry.data, null, 2)}
              </pre>
            </details>
          )}
        </div>

        <div className="text-xs text-gray-500 text-right">
          {new Date(entry.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

async function LedgerList() {
  const entries = await fetchLedger();

  if (entries.length === 0) {
    return (
      <div className="card-surface p-8 text-center">
        <p className="text-gray-400">No ledger entries</p>
        <p className="text-sm text-gray-500 mt-2">
          The immutable record will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {entries.map((entry) => (
        <LedgerEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default function LedgerPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold text-white">Ledger</h1>
        <p className="text-gray-400 mt-1">
          Immutable event log with PS-SHA∞ hash chain
        </p>
        <p className="text-sm text-gray-500 mt-2">
          "The record is sacred."
        </p>
      </section>

      <Suspense
        fallback={
          <div className="card-surface p-8 text-center text-gray-400">
            Loading ledger...
          </div>
        }
      >
        <LedgerList />
      </Suspense>
    </div>
  );
}
