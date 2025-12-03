import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Prism Console',
  description: 'BlackRoad OS admin console – Gen-0 scaffold'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-gray-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">BlackRoad OS</p>
              <h1 className="text-2xl font-semibold">Prism Console</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/codex"
                className="rounded-md border border-white/10 px-3 py-2 text-sm text-gray-200 transition hover:border-white/30"
              >
                Codex
              </Link>
              <div className="card-surface px-4 py-2 text-sm text-gray-200">
                Edge-ready • shadcn/tailwind • Gen-0
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
