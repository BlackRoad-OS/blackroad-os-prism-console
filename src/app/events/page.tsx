'use client';

import { useState } from 'react';
import { GenericTable } from '@/components/tables/GenericTable';
import { useEvents } from '@/hooks/useEvents';
import type { EventRecord } from '@/types/events';

export default function EventsPage() {
  const [limit, setLimit] = useState<number | undefined>(25);
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  const { events, isLoading, error, setParams } = useEvents({ limit });

  const applyFilters = () => {
    setParams({ limit, type: type || undefined, source: source || undefined });
  };

  const columns = [
    { header: 'Timestamp', accessor: (event: EventRecord) => new Date(event.timestamp).toLocaleString() },
    { header: 'Type', accessor: (event: EventRecord) => event.type },
    { header: 'Source', accessor: (event: EventRecord) => event.source },
    { header: 'Summary', accessor: (event: EventRecord) => event.summary || '—' }
  ];

  return (
    <div className="card">
      <h1>Events</h1>
      <p className="muted">Recent events across agents and finance systems.</p>

      <div className="filter-grid">
        <label>
          Type
          <input value={type} onChange={(e) => setType(e.target.value)} placeholder="task.completed" />
        </label>
        <label>
          Source
          <input value={source} onChange={(e) => setSource(e.target.value)} placeholder="agent:finance" />
        </label>
        <label>
          Limit
          <input
            type="number"
            min={1}
            max={200}
            value={limit ?? 0}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </label>
        <button className="button" onClick={applyFilters} disabled={isLoading}>
          Apply
        </button>
      </div>

      {error && <div className="error-banner">{error.message}</div>}
      {isLoading && <p className="muted">Loading events…</p>}
      <GenericTable columns={columns} data={events} emptyText={isLoading ? 'Loading…' : 'No events found'} />
    </div>
  );
}
