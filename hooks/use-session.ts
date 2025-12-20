import { authClient } from '@/lib/auth-client';

export function useSession() {
  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user;

  const email = user?.email;
  const name = user?.name ?? (email ? email.split('@')[0] : null);
  const image = user?.image ?? `https://avatar.vercel.sh/${email}`;
  const isAuthenticated = Boolean(user);
  const initials = user?.email.slice(0, 2).toUpperCase() || 'UN';

  return {
    isPending,
    error,
    session: user,
    name,
    email,
    image,
    isAuthenticated,
    initials,
    auth_session: session,
  };
}

export type useSessionType = Awaited<ReturnType<typeof useSession>>;
