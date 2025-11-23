import { ReactNode } from 'react';
import { Shell } from './Shell';

type Props = {
  children: ReactNode;
};

export default function AppShell({ children }: Props) {
  return <Shell>{children}</Shell>;
}
