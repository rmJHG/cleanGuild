import { ReactNode } from 'react';

export default function NoHeaderLayout({ children }: { children: ReactNode }) {
  return <main style={{ flex: '1' }}>{children}</main>;
}
