"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Overview", href: "/" },
  { name: "Lucidia Programs", href: "/lucidia/programs" },
  { name: "Runs & Windows", href: "/lucidia/runs" },
  { name: "Agents", href: "/agents" },
  { name: "Jobs & Queues", href: "/jobs" },
  { name: "Identity / SIG", href: "/identity" },
  { name: "Environments", href: "/environments" },
  { name: "Deployments", href: "/deployments" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-black/50 text-white min-h-screen p-6 border-r border-[#111827] backdrop-blur-xl">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">BlackRoad OS</p>
        <h1 className="text-2xl font-bold text-white">Prism Console</h1>
        <p className="text-sm text-zinc-400 mt-1">Control room</p>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-xl transition-colors border ${
                  pathname === item.href
                    ? "bg-emerald-500/10 text-emerald-100 border-emerald-500/40"
                    : "text-zinc-300 border-transparent hover:border-zinc-800 hover:bg-zinc-900"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
