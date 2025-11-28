/**
 * Agent Dashboard - Real-time monitoring of all 16 AI agents
 *
 * This is the command center for the BlackRoad OS AI agent system.
 * Monitor all agents, their activity, and orchestrated workflows in real-time.
 */

'use client';

import React, { useState, useEffect } from 'react';

interface Agent {
  type: string;
  name: string;
  status: 'active' | 'inactive' | 'busy';
  domain: string[];
  tier: string;
  emoji: string;
  stats?: {
    totalTasks: number;
    successRate: string;
    averageConfidence: string;
    uptime: string;
  };
}

interface DashboardData {
  summary: {
    totalAgents: number;
    activeAgents: number;
    activeTasks: number;
    completedToday: number;
    avgResponseTime: string;
  };
  recentTasks: Array<{
    id: string;
    type: string;
    agent: string;
    status: string;
    duration: string;
    timestamp: string;
  }>;
  activeWorkflows: Array<{
    id: string;
    template: string;
    progress: number;
    eta: string;
  }>;
  metrics: {
    successRate: string;
    avgConfidence: string;
    tasksPerHour: number;
    workflowsCompleted: number;
  };
}

export default function AgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
    fetchDashboard();

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      fetchDashboard();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      const data = await response.json();
      if (data.success) {
        setAgents(data.agents);
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const response = await fetch('/api/agents/dashboard');
      const data = await response.json();
      if (data.success) {
        setDashboard(data.dashboard);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'inactive':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'strategic':
        return 'border-purple-500 bg-purple-50';
      case 'quality':
        return 'border-red-500 bg-red-50';
      case 'performance':
        return 'border-orange-500 bg-orange-50';
      case 'innovation':
        return 'border-blue-500 bg-blue-50';
      case 'ux':
        return 'border-pink-500 bg-pink-50';
      case 'coordination':
        return 'border-green-500 bg-green-50';
      case 'assistant':
        return 'border-gray-500 bg-gray-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AI Agent System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🤖 AI Agent Command Center
        </h1>
        <p className="text-gray-600">
          Real-time monitoring of all 16 BlackRoad OS AI agents
        </p>
      </div>

      {/* Summary Cards */}
      {dashboard && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Agents</div>
            <div className="text-3xl font-bold text-purple-600">
              {dashboard.summary.totalAgents}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {dashboard.summary.activeAgents} active
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Active Tasks</div>
            <div className="text-3xl font-bold text-blue-600">
              {dashboard.summary.activeTasks}
            </div>
            <div className="text-xs text-gray-500 mt-1">in progress</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Completed Today</div>
            <div className="text-3xl font-bold text-green-600">
              {dashboard.summary.completedToday}
            </div>
            <div className="text-xs text-gray-500 mt-1">tasks finished</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Success Rate</div>
            <div className="text-3xl font-bold text-orange-600">
              {dashboard.metrics.successRate}
            </div>
            <div className="text-xs text-gray-500 mt-1">accuracy</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Avg Response</div>
            <div className="text-3xl font-bold text-pink-600">
              {dashboard.summary.avgResponseTime}
            </div>
            <div className="text-xs text-gray-500 mt-1">per task</div>
          </div>
        </div>
      )}

      {/* Agent Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.type}
              onClick={() => setSelectedAgent(agent)}
              className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${getTierColor(
                agent.tier
              )} p-6`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{agent.emoji}</div>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(
                      agent.status
                    )}`}
                  ></div>
                  <span className="ml-2 text-xs text-gray-500 capitalize">
                    {agent.status}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-1">{agent.name}</h3>
              <p className="text-xs text-gray-600 mb-3 capitalize">
                {agent.tier} Tier
              </p>

              <div className="flex flex-wrap gap-1">
                {agent.domain.slice(0, 2).map((d) => (
                  <span
                    key={d}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    {d}
                  </span>
                ))}
                {agent.domain.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{agent.domain.length - 2}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Active Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {dashboard?.recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 capitalize">
                      {task.agent}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-sm text-gray-600 capitalize">
                      {task.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(task.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{task.duration}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      task.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Workflows */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Active Workflows
          </h2>
          <div className="space-y-4">
            {dashboard?.activeWorkflows.map((workflow) => (
              <div key={workflow.id} className="p-3 bg-gray-50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    {workflow.template}
                  </span>
                  <span className="text-sm text-gray-600">
                    ETA: {workflow.eta}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${workflow.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {workflow.progress}% complete
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedAgent(null)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-2xl w-full m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{selectedAgent.emoji}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedAgent.name}
                  </h2>
                  <p className="text-gray-600 capitalize">
                    {selectedAgent.tier} Tier
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Domain Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAgent.domain.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {selectedAgent.stats && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">Total Tasks</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {selectedAgent.stats.totalTasks}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">Success Rate</div>
                  <div className="text-2xl font-bold text-green-600">
                    {selectedAgent.stats.successRate}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">
                    Avg Confidence
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedAgent.stats.averageConfidence}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 mb-1">Uptime</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {selectedAgent.stats.uptime}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
