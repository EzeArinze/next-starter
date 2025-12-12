import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function ExpiredToken() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-900">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-white p-8 text-center shadow-lg dark:bg-zinc-800">
        <div className="flex justify-center">
          <AlertCircle className="h-14 w-14 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Token Expired Or invalid token
        </h1>

        <p className="text-zinc-600 dark:text-zinc-300">
          Oops! Your verification or reset link has expired. Don&apos;t worry—you can create a new
          account and get started again.
        </p>

        <Button asChild className="w-full">
          <Link href="/sign-in">Go to Sign in</Link>
        </Button>
      </div>
    </section>
  );
}
