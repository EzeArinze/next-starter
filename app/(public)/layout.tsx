import { Nav } from './_components/nav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning className="bg-background min-h-screen">
      <header className="fixed inset-x-0 top-0 z-20 h-16">
        <Nav />
      </header>

      <main className="pt-16">{children}</main>
    </div>
  );
}
