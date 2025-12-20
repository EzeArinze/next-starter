import Link from 'next/link';
import { SignUpPage } from '../_components/sign-up';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function SignUp() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (user) {
    return redirect('/');
  }

  return (
    <>
      <Link
        href={'/'}
        className={buttonVariants({
          variant: 'link',
          className: 'w-full text-center',
        })}
      >
        <ArrowLeft className="size-4" /> Back to Homepage
      </Link>
      <SignUpPage />
    </>
  );
}
