'use client';

import { useState } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/tanstack-query/client';

export function TanstackProviders(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}
