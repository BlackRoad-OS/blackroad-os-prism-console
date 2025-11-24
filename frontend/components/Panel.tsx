import { ReactNode } from "react";

interface PanelProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function Panel({ title, subtitle, action, children }: PanelProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)]">
      {(title || action || subtitle) && (
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 px-5 py-4">
          <div>
            {title && <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>}
            {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
          </div>
          {action && <div className="text-sm text-zinc-400">{action}</div>}
        </div>
      )}
      <div className="px-5 py-4 text-zinc-200">
        {children}
      </div>
    </section>
  );
}
