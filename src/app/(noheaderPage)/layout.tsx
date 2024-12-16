import { ReactNode } from 'react';

export default function NoHeaderLayout({ children }: { children: ReactNode }) {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1' }}>
      {children}
    </main>
  );
}
