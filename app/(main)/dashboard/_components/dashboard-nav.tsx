'use client';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Bell, Menu, Settings, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useScroll } from 'motion/react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { useSuspenseQuery } from '@tanstack/react-query';
import { orpc } from '@/lib/orpc/orpc';

const NavMenu = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'People', href: '/dashboard/people' },
  { name: 'Hiring', href: '/dashboard/hiring' },
  { name: 'Devices', href: '/dashboard/devices' },
  { name: 'Apps', href: '/dashboard/apps' },
  { name: 'Salary', href: '/dashboard/salary' },
  { name: 'Calendar', href: '/dashboard/calendar' },
  { name: 'Reviews', href: '/dashboard/reviews' },
];

export default function DashboardNav() {
  const {
    data: { session },
  } = useSuspenseQuery(orpc.user.list.queryOptions());
  console.log(session);

  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setScrolled(v > 0);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-200',
        scrolled && 'bg-background/60 backdrop-blur-xl',
      )}
    >
      {/* TOP BAR */}
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
        data-state={menuOpen && 'active'}
      >
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <div className="flex items-center gap-2">
          <nav className="bg-primary/15 hidden items-center rounded-full px-2 py-0.5 shadow-sm lg:flex">
            {NavMenu.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-neutral-900 text-white'
                      : 'text-muted-foreground hover:bg-neutral-700 hover:text-white',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/settings"
              className="bg-primary/15 text-muted-foreground hidden items-center gap-2 rounded-full px-4 py-2 text-sm shadow-sm hover:bg-neutral-700 hover:text-white lg:flex"
            >
              <Settings className="size-4" />
              Settings
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="bg-primary/15 text-muted-foreground hidden rounded-full shadow-sm hover:bg-neutral-700 hover:text-white lg:flex"
            >
              <Bell className="size-4" />
            </Button>

            <Link
              href="/dashboard/profile"
              className="bg-primary/15 text-muted-foreground flex size-8 items-center justify-center rounded-full shadow-sm hover:bg-neutral-700 hover:text-white"
            >
              <User className="size-4" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen == true ? 'Close Menu' : 'Open Menu'}
              className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
            >
              <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
              <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={cn(
          'absolute top-full left-0 w-full px-6 lg:hidden',
          menuOpen ? 'block' : 'hidden',
        )}
      >
        <div className="bg-background mt-4 rounded-3xl border p-6 shadow-2xl">
          <ul className="space-y-5">
            {NavMenu.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'block text-base font-medium transition',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
            >
              <Settings className="size-4" />
              Settings
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
