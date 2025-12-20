import { ReactNode } from 'react';
import { orpc } from '@/lib/orpc/orpc';
import { HydrateClient, queryClient } from '@/lib/tanstack-query/hydration';

export default async function Protectedlayout({ children }: { children: ReactNode }) {
  await queryClient.prefetchQuery(orpc.user.list.queryOptions());

  return (
    <div>
      <HydrateClient client={queryClient}>{children}</HydrateClient>
    </div>
  );
}
