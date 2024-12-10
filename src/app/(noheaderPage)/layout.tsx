import { ReactNode } from 'react';

export default function NoHeaderLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main style={{ flex: '1', height: '100dvh !important' }}>{children}</main>
    </div>
  );
}
