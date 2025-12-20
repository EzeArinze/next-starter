import type React from 'react';
import { Suspense } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense>
        <div className="w-full max-w-md">{children}</div>
      </Suspense>
    </div>
  );
}
