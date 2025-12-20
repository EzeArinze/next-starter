import Link from 'next/link';
import { SignInPage } from '../_components/sign-in';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function SignIn() {
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
        <ArrowLeft className="size-4" /> Back to Homepge
      </Link>
      <SignInPage />
    </>
  );
}
