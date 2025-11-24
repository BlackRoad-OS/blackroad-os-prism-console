'use client';

import { useEffect, useMemo, useState } from 'react';
import { GenericTable } from '@/components/tables/GenericTable';
import { useEvents } from '@/hooks/useEvents';
import { EventRecord, RoadChainBlock } from '@/types';
import { getRoadChainBlocks } from '@/lib/apiClient';

const severities: (EventRecord['severity'] | 'all')[] = ['all', 'info', 'warning', 'error'];

export default function EventsPage() {
  const [limit, setLimit] = useState<number | undefined>(25);
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  const { events, isLoading, error, setParams } = useEvents({ limit });

  const applyFilters = () => {
    setParams({ limit, type: type || undefined, source: source || undefined });
  };
  const [tab, setTab] = useState<'events' | 'roadchain'>('events');
  const [severity, setSeverity] = useState<EventRecord['severity'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const { events, isLoading, error, setParams } = useEvents({ limit: 50 });
  const [blocks, setBlocks] = useState<RoadChainBlock[]>([]);
  const [blocksLoading, setBlocksLoading] = useState(true);
  const [blocksError, setBlocksError] = useState<Error | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    setBlocksLoading(true);
    getRoadChainBlocks()
      .then((res) => {
        setBlocks(res);
        setBlocksError(null);
      })
      .catch((err: Error) => setBlocksError(err))
      .finally(() => setBlocksLoading(false));
  }, []);

  useEffect(() => {
    const params: { severity?: EventRecord['severity']; search?: string } = {};
    if (severity !== 'all') params.severity = severity;
    if (search) params.search = search;
    setParams(params);
  }, [severity, search, setParams]);

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const matchesSeverity = severity === 'all' ? true : event.severity === severity;
      const text = search.toLowerCase();
      const matchesSearch = text
        ? event.summary.toLowerCase().includes(text) || event.source.toLowerCase().includes(text)
        : true;
      return matchesSeverity && matchesSearch;
    });
  }, [events, severity, search]);

  const columns = [
    { header: 'Timestamp', accessor: (event: EventRecord) => new Date(event.timestamp).toLocaleString() },
    { header: 'Type', accessor: (event: EventRecord) => event.type },
    { header: 'Source', accessor: (event: EventRecord) => event.source },
    {
      header: 'Severity',
      accessor: (event: EventRecord) => <span className={`status-pill ${event.severity || 'info'}`}>{event.severity || 'info'}</span>
    },
    { header: 'Summary', accessor: (event: EventRecord) => event.summary || '—' }
  ];

  const activeBlockEvents = useMemo(() => {
    if (!expanded) return [] as EventRecord[];
    const block = blocks.find((b) => b.height === expanded);
    if (!block) return [] as EventRecord[];
    return block.eventIds
      .map((id) => events.find((evt) => evt.id === id))
      .filter((evt): evt is EventRecord => Boolean(evt));
  }, [blocks, expanded, events]);

  return (
    <div className="page-grid">
      <div className="card" style={{ gridColumn: 'span 2' }}>
        <h1>Events / RoadChain</h1>
        <p className="muted">
          Stream of operator, agent, and finance events plus RoadChain block explorer. Filters are client-side until the API
          provides query parameters.
        </p>
        <div className="tab-row">
          <button className={tab === 'events' ? 'pill active' : 'pill'} onClick={() => setTab('events')}>
            Events
          </button>
          <button className={tab === 'roadchain' ? 'pill active' : 'pill'} onClick={() => setTab('roadchain')}>
            RoadChain
          </button>
        </div>
      </div>

      {tab === 'events' && (
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="filter-grid">
            <label>
              Severity
              <select value={severity} onChange={(e) => setSeverity(e.target.value as EventRecord['severity'] | 'all')}>
                {severities.map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
            </label>
            <label>
              Search
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search summary or source" />
            </label>
          </div>

          {error && <div className="error-banner">{error.message}</div>}
          {isLoading && <p className="muted">Loading events…</p>}
          <GenericTable columns={columns} data={filtered} emptyText={isLoading ? 'Loading…' : 'No events found'} />
        </div>
      )}

      {tab === 'roadchain' && (
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h3>RoadChain blocks</h3>
          <p className="muted small">TODO: replace with real /roadchain endpoint output.</p>
          {blocksError && <div className="error-banner">{blocksError.message}</div>}
          {blocksLoading && <p className="muted">Loading blocks…</p>}
          {!blocksLoading && blocks.length === 0 && <p className="muted">No RoadChain data yet.</p>}
          {!blocksLoading && blocks.length > 0 && (
            <ul className="event-list">
              {blocks.map((block) => (
                <li key={block.hash} className="event-item" onClick={() => setExpanded(block.height)}>
                  <div>
                    <div className="muted small">Height {block.height}</div>
                    <div className="muted small">Hash {block.hash.slice(0, 10)}…</div>
                    <div className="muted small">Timestamp {new Date(block.timestamp).toLocaleString()}</div>
                  </div>
                  <div className="pill-row">
                    <span className="pill">{block.eventIds.length} events</span>
                    <span className="pill subtle">prev {block.prevHash.slice(0, 10)}…</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {expanded && (
            <div className="card nested-card">
              <h4>Block {expanded} events</h4>
              {activeBlockEvents.length === 0 && <p className="muted">Events not loaded for this block.</p>}
              {activeBlockEvents.length > 0 && (
                <ul className="event-list">
                  {activeBlockEvents.map((event) => (
                    <li key={event.id} className="event-item">
                      <div>
                        <div className="muted small">{new Date(event.timestamp).toLocaleString()}</div>
                        <div className="event-type">{event.type}</div>
                        <div className="muted small">{event.source}</div>
                      </div>
                      <div className="pill-row">
                        <span className={`status-pill ${event.severity || 'info'}`}>{event.severity || 'info'}</span>
                        <span>{event.summary}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
