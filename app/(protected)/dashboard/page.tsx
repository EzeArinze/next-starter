import { orpc } from '@/lib/orpc/orpc';
import { HydrateClient, queryClient } from '@/lib/tanstack-query/hydration';

export default async function Dashboardpage() {
  await queryClient.prefetchQuery(orpc.user.list.queryOptions());

  return (
    <div>
      <HydrateClient client={queryClient}>
        {/* <UserNav /> */}
        {'Sidebar and Dashboard Content would go here'}
      </HydrateClient>
    </div>
  );
}
