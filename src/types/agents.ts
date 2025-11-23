export type AgentStatus = 'online' | 'offline' | 'degraded' | 'unknown';

export interface AgentCapability {
  id: string;
  name: string;
  description?: string;
}

export interface AgentSummary {
  id: string;
  name: string;
  status: AgentStatus;
  lastHeartbeat?: string;
  capabilities: AgentCapability[];
  domain?: string;
  metadata?: Record<string, unknown>;
}

export interface AgentTaskSummary {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
