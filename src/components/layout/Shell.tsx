import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

type Props = {
  children: ReactNode;
};

export function Shell({ children }: Props) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell-main">
        <TopBar />
        <main className="app-shell-content">{children}</main>
      </div>
    </div>
  );
}
