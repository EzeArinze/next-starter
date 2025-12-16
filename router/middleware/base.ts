import { os } from '@orpc/server';

export const baseMiddleware = os.$context<{ request: Request }>().errors({
  RATE_LIMITED: {
    message: 'Too many requests. Please try again later.',
  },
  BAD_REQUEST: {
    message: 'The request was invalid/Bad request.',
  },
  NOT_FOUND: {
    message: 'Not found.',
  },
  FORBIDDEN: {
    message: 'You do not have permission to access this resource.',
  },
  UNAUTHORIZED: {
    message: 'You are not authorized to access this resource.',
  },
  INTERNAL_SERVER_ERROR: {
    message: 'An internal server error occurred.',
  },
});
