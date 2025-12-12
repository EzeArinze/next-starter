import { authClient, signIn, signUp } from '@/lib/auth-client';
import {
  resetPasswordEmail,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from '@/schema/auth-zod-schema';
import { toast } from 'sonner';

export async function SignIn({ email, password, callbackURL = '/dashboard' }: SignInType) {
  const validated = signInSchema.safeParse({ email, password });

  if (!validated.success) {
    throw new Error('Please provide a valid data');
  }

  await signIn.email(
    {
      email,
      password,
      callbackURL: callbackURL,
    },
    {
      onError: (ctx) => {
        if (ctx.error.status === 403) {
          toast.error('Please verify your email address');
        }

        toast.error(ctx.error.message || 'Sign in failed');
      },

      onSuccess: () => {
        toast.success(`Successfully signed in`);
      },
    },
  );
}

export async function SignUp({
  email,
  password,
  callbackURL = '/dashboard',
  confirmPassword,
}: SignUpType) {
  const validated = signUpSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!validated.success) {
    const errorMessage = validated.error.issues[0]?.message || 'Validation failed';
    throw new Error(errorMessage);
  }

  await signUp.email(
    {
      email,
      password,
      name: email.split('@')[0],
      callbackURL: callbackURL,
    },
    {
      onError: (ctx) => {
        toast.error(ctx.error.message || 'Sign un failed');
      },
      onSuccess: (ctx) => {
        toast.success(`Account created successfully: ${ctx.data.user.email}`);
      },
    },
  );
}

export async function resetPasswordAction({ password, confirmPassword, token }: resetPaswordType) {
  const validated = resetPasswordSchema.safeParse({
    password,
    confirmPassword,
  });

  if (validated.error) {
    throw new Error('Your password does not match');
  }

  const { data } = validated;

  await authClient.resetPassword(
    {
      newPassword: data.password,
      token,
    },
    {
      onError(context) {
        toast.error(context.error.message);
      },
      onSuccess() {
        toast.success('Password reset successfully');
        window.location.href = '/dashboard';
      },
    },
  );
}

export async function ResetPasswordMail({ email, redirectTo }: ResetPasswordActionType) {
  const validated = resetPasswordEmail.safeParse({ email });

  if (validated.error) {
    throw new Error('Please provide a valid email');
  }

  const { data } = validated;

  await authClient.requestPasswordReset(
    {
      email: data.email,
      redirectTo,
    },
    {
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
      onSuccess: () => {
        toast.success(`Password reset email sent`);
      },
    },
  );
}
