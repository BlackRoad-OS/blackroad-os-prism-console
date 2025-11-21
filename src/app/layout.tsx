import './globals.css';
import { ReactNode } from 'react';
import AppShell from '@/components/layout/AppShell';

export const metadata = {
  title: 'BlackRoad OS – Prism Console',
  description: 'Operational console for BlackRoad OS'
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
