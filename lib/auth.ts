import { APIError, betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import { env } from './env';
import { nextCookies } from 'better-auth/next-js';
import { createAuthMiddleware } from 'better-auth/api';
import { ALLOWED_EMAIL_DOMAINS } from '@/utils/allowed-emails';
import { EmailSender } from '@/services/email-sender';
import ResetPasswordEmail from '@/components/email/reset-password';
import VerifyAccountEmail from '@/components/email/verify-account';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true,
    autoSignIn: true,
    requireEmailVerification: true,
    minPasswordLength: 6,
    maxPasswordLength: 12,
    resetPasswordTokenExpiresIn: 15 * 60,
    sendResetPassword: async ({ user, url }) => {
      await EmailSender({
        to: user.email,
        subject: 'reset your password',
        template: ResetPasswordEmail({ username: user.name, url }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await EmailSender({
        to: user.email,
        subject: 'verify email',
        template: VerifyAccountEmail({ username: user.name, url }),
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 5 * 60,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      prompt: 'select_account',
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== '/sign-up/email') {
        return;
      }
      const isAllowedDomain = ALLOWED_EMAIL_DOMAINS.some((domain) =>
        ctx.body?.email.endsWith(domain),
      );

      if (!isAllowedDomain) {
        throw new APIError('BAD_REQUEST', {
          message: 'Email must end with real domains',
        });
      }
    }),
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 30 * 60,
    },
  },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
  trustedOrigins: [env.BETTER_AUTH_URL],
  plugins: [nextCookies()],
});
