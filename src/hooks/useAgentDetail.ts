'use client';

import { useEffect, useState } from 'react';
import { Agent } from '@/types';
import { getAgents } from '@/lib/apiClient';

type AgentTaskSummary = {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const mockTasks: AgentTaskSummary[] = [
  {
    id: 'task-001',
    type: 'health.check',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'task-002',
    type: 'finance.reconcile',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function useAgentDetail(id: string | undefined) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [tasks, setTasks] = useState<AgentTaskSummary[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);

    getAgents()
      .then((agents) => {
        if (cancelled) return;
        const found = agents.find((a) => a.id === id) || null;
        setAgent(found);
        setTasks(mockTasks);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setAgent(null);
          setTasks([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { agent, tasks, isLoading, error };
}
