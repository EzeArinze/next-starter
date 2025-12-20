import { baseMiddleware } from '../../base';
import { redirect } from 'next/navigation';
import { getSession, getSessionType } from './session';

export const requireAuthMiddleware = baseMiddleware
  .$context<{
    session?: getSessionType;
  }>()
  .middleware(async ({ context, next }) => {
    const session = context.session ?? (await getSession());

    if (!session) {
      return redirect('/sign-in');
    }

    return next({
      context: { session },
    });
  });
