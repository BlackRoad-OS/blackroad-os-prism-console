export type Status = "healthy" | "degraded" | "failed" | "running" | "idle" | "investigating";

interface StatusPillProps {
  status: Status;
  label?: string;
}

const statusStyles: Record<Status, string> = {
  healthy: "bg-emerald-500/15 text-emerald-200 border-emerald-500/40",
  degraded: "bg-amber-500/15 text-amber-200 border-amber-500/40",
  failed: "bg-rose-500/15 text-rose-200 border-rose-500/40",
  running: "bg-sky-500/15 text-sky-200 border-sky-500/40",
  idle: "bg-zinc-700/40 text-zinc-200 border-zinc-600/70",
  investigating: "bg-indigo-500/15 text-indigo-200 border-indigo-500/40",
};

export default function StatusPill({ status, label }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
      <span className="capitalize">{label ?? status}</span>
    </span>
  );
}
