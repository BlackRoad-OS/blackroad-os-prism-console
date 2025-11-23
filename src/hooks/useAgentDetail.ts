'use client';

import { useEffect, useState } from 'react';
import type { AgentSummary, AgentTaskSummary } from '../types/agents';
import { fetchAgentDetail, fetchAgentTasks } from '../services/agentsService';

export function useAgentDetail(id: string | undefined) {
  const [agent, setAgent] = useState<AgentSummary | null>(null);
  const [tasks, setTasks] = useState<AgentTaskSummary[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);

    Promise.all([fetchAgentDetail(id), fetchAgentTasks(id)])
      .then(([agentDetail, agentTasks]) => {
        if (!cancelled) {
          setAgent(agentDetail);
          setTasks(agentTasks);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setAgent(null);
          setTasks([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { agent, tasks, isLoading, error };
}
