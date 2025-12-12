import { createAuthClient } from 'better-auth/client';
import { toast } from 'sonner';

export const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get('X-Retry-After');
        toast.error(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
      }
    },
  },
});

export const { signIn, signOut, signUp } = authClient;
