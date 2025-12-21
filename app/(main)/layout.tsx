import { ReactNode } from 'react';
import { orpc } from '@/lib/orpc/orpc';
import { HydrateClient, queryClient } from '@/lib/tanstack-query/hydration';
import DashboardNav from './dashboard/_components/dashboard-nav';

export default async function Protectedlayout({ children }: { children: ReactNode }) {
  await queryClient.prefetchQuery(orpc.user.list.queryOptions());

  return (
    <div>
      <HydrateClient client={queryClient}>
        <DashboardNav />
        {children}
      </HydrateClient>
    </div>
  );
}
