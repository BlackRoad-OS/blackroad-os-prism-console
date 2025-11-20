import Link from 'next/link';
import { ReactNode } from 'react';
import type { Route } from 'next';
import { serverConfig } from '@/lib/config';

type Props = {
  children: ReactNode;
};

const navLinks: { href: Route; label: string }[] = [
  { href: '/', label: 'Overview' },
  { href: '/status', label: 'Status' },
  { href: '/health', label: 'Health' },
  { href: '/agents', label: 'Agents' }
];

export default function AppShell({ children }: Props) {
  return (
    <div>
      <nav>
        <div className="nav-links">
          <Link href="/" className="logo">
            Prism Console
          </Link>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <span className="badge" style={{ marginLeft: 'auto' }}>
            Environment: {serverConfig.environment}
          </span>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
