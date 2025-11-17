"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Environments", href: "/environments" },
  { name: "Deployments", href: "/deployments" },
  { name: "Logs", href: "/logs" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-zinc-900 text-white min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Prism Console</h1>
        <p className="text-sm text-zinc-400 mt-1">BlackRoad OS</p>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded transition-colors ${
                  pathname === item.href
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-300 hover:bg-zinc-800"
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
