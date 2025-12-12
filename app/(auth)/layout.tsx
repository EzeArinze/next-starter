import type React from 'react';
import { Suspense } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-green-50 p-4 dark:from-slate-900 dark:to-slate-800">
      <Suspense>
        <div className="w-full max-w-md">{children}</div>
      </Suspense>
    </div>
  );
}
