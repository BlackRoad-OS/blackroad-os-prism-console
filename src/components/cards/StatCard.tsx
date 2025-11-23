import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number | ReactNode;
  delta?: string;
  helpText?: string;
}

export function StatCard({ label, value, delta, helpText }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {delta && <div className="stat-delta">{delta}</div>}
      {helpText && <div className="stat-help">{helpText}</div>}
    </div>
  );
}
