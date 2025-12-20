import type { Metadata } from 'next';
import { Nav } from './_components/nav';

export const metadata: Metadata = {
  title: 'Next Starter',
  description: 'A starter template for Next.js with authentication, orpc, and TanStack Query.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning>
      <header>
        <Nav />
      </header>
      {children}
    </div>
  );
}
