import { os } from '@orpc/server';
import { requireAuthMiddleware } from './middleware/auth/auth-middleware';

export const router = os.use(requireAuthMiddleware).router({
  user: {
    list: os.handler(() => 'Adam'),
    create: os.handler(() => 'Mike'),
  },
});
