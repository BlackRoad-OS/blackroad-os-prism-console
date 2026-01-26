import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

export const metadata: Metadata = {
  title: 'Prism Console',
  description: 'BlackRoad OS admin console – Gen-0 scaffold'
};

function NavLink({ href, children }: { href: Route | string; children: ReactNode }) {
  return (
    <Link
      href={href as Route}
      className="text-gray-400 hover:text-white transition-colors text-sm"
    >
      {children}
    </Link>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">BlackRoad OS</p>
              <h1 className="text-2xl font-semibold">Prism Console</h1>
            </div>
            <div className="card-surface px-4 py-2 text-sm text-gray-200">
              Edge-ready • shadcn/tailwind • Gen-0
            </div>
          </header>

          <nav className="flex gap-6 border-b border-gray-800 pb-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/agents">Agents</NavLink>
            <NavLink href="/intents">Intents</NavLink>
            <NavLink href="/ledger">Ledger</NavLink>
            <NavLink href="/env/production">Environments</NavLink>
          </nav>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
