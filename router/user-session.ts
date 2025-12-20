import z from 'zod';
import { requireAuthMiddleware } from './middleware/auth/auth-middleware';
import { baseMiddleware } from './base';
import { getSession, getSessionType } from './middleware/auth/session';

export const userSession = baseMiddleware
  .use(requireAuthMiddleware)
  .route({
    method: 'GET',
    path: '/user-session',
    summary: 'user server session',
    tags: ['user-session'],
  })
  .input(z.void())
  .output(z.custom<{ session: getSessionType }>())
  .handler(async ({ context }) => {
    const session = context.session ?? (await getSession());

    return {
      session: session,
    };
  });
