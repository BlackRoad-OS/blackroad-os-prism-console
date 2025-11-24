'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';

const navLinks: { href: Route; label: string; icon: string }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/agents', label: 'Agents', icon: '🛰️' },
  { href: '/finance', label: 'Finance', icon: '💠' },
  { href: '/events', label: 'Events', icon: '🧭' }
];

const externalLinks = [
  { href: 'https://blackroad-os-docs.example.com', label: 'Docs', icon: '📘' },
  { href: 'https://blackroad-os-web.example.com', label: 'Web', icon: '🌐' },
  { href: 'https://github.com/BlackRoad-OS', label: 'GitHub', icon: '🐙' }
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
        {navLinks.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={active ? 'nav-link active' : 'nav-link'}>
              <span className="nav-icon" aria-hidden>
                {link.icon}
              </span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-divider" aria-hidden />
      <nav className="sidebar-nav">
        {externalLinks.map((link) => (
          <a key={link.href} href={link.href} className="nav-link" target="_blank" rel="noreferrer">
            <span className="nav-icon" aria-hidden>
              {link.icon}
            </span>
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p className="muted">Operator cockpit for the BlackRoad OS orchestration universe.</p>
      </div>
    </aside>
  );
}
