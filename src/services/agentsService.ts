import { apiGet } from '../lib/apiClient';
import type { AgentSummary, AgentTaskSummary } from '../types/agents';

export async function fetchAgents(): Promise<AgentSummary[]> {
  return apiGet<AgentSummary[]>('/internal/agents');
}

export async function fetchAgentDetail(id: string): Promise<AgentSummary> {
  return apiGet<AgentSummary>(`/internal/agents/${encodeURIComponent(id)}`);
}

export async function fetchAgentTasks(id: string): Promise<AgentTaskSummary[]> {
  return apiGet<AgentTaskSummary[]>(`/internal/agents/${encodeURIComponent(id)}/tasks`);
}
