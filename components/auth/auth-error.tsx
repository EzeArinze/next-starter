import Link from 'next/link';
import { Card } from '../ui/card';
import { buttonVariants } from '../ui/button';

type iAppProps = {
  message?: string;
};

export default function TokenError({ message = 'No Token found' }: iAppProps) {
  return (
    <Card className="border-border mx-auto mt-10 max-w-md rounded-lg border bg-white p-6 shadow-md">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold text-red-500">Authentication Error</h3>
        <p className="mt-2 text-gray-700">{message}</p>
        <div className="mt-4">
          <Link href="/sign-in" className={buttonVariants({ variant: 'outline' })}>
            Try requesting for password reset again
          </Link>
        </div>
      </div>
    </Card>
  );
}
