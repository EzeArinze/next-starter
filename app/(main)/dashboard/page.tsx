'use client';

import { orpc } from '@/lib/orpc/orpc';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function Dashboardpage() {
  const {
    data: { session },
  } = useSuspenseQuery(orpc.user.list.queryOptions());

  return (
    <div>
      {/* <UserNav /> */}
      <p>Welcome {session?.name}</p>
      {'Sidebar and Dashboard Content would go here'}
    </div>
  );
}
