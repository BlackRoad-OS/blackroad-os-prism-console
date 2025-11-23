'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';

const links: { href: Route; label: string }[] = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/agents', label: 'Agents' },
  { href: '/finance', label: 'Finance' },
  { href: '/events', label: 'Events' },
  { href: '/status', label: 'Status' }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">Prism Console</div>
        <div className="sidebar-subtitle">BlackRoad OS</div>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={active ? 'nav-link active' : 'nav-link'}>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <p className="muted">Read-only dashboards for agents, finance, and events.</p>
      </div>
    </aside>
  );
}
