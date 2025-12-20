import UserDropdowm from './user-dropdown';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useSession } from '@/hooks/use-session';

export const AuthArea = () => {
  const { isPending, session, email, image, initials, name } = useSession();

  const checkSession = session && !isPending;

  return (
    <>
      {isPending && <Skeleton className="size-8 rounded-full px-3" />}

      {checkSession && (
        <div className="flex items-center gap-3">
          <UserDropdowm email={email} image={image} initials={initials} name={name} />
          <span className="text-muted-foreground truncate sm:hidden">{email}</span>
        </div>
      )}

      {!isPending && !session && (
        <Button asChild variant="link" size="default" className="w-full">
          <Link href="/sign-in" className="underline">
            <span className="text-sm font-semibold">Login</span>
          </Link>
        </Button>
      )}
    </>
  );
};
