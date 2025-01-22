import { ReactNode } from 'react';

export default function NoHeaderLayout({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        width: '100%',
        maxWidth: '900px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
      }}
    >
      {children}
    </main>
  );
}
