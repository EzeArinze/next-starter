import type { Metadata } from 'next';
import { Nav } from './_components/nav';

export const metadata: Metadata = {
  title: 'Universal prime capital',
  description: "Invest in real-estate, crypto, crude-oil, gold, ruby's. e.t.c",
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
