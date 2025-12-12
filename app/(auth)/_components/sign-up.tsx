'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { AuthSeperator } from './auth-seperator';
import { signUpSchema, signUpSchemaType } from '@/schema/auth-zod-schema';
import { tryCatch } from '@/utils/try-catch';

import { authClient } from '@/lib/auth-client';
import Logo from '@/components/logo';
import { SignUp } from '../action';

export default function SignUpPage() {
  const [loading, startTransition] = useTransition();
  const [pending, providerTransition] = useTransition();

  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSignUp = ({ data, action, provider }: AuthenticationAction) => {
    if (action === 'credentials' && data) {
      const { email, password, confirmPassword } = data;

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      startTransition(async () => {
        const { error } = await tryCatch(SignUp({ email, password, confirmPassword }));
        if (error) toast.error(error.message || 'Failed to sign up, try again!');
        return;
      });
      form.reset();
      return;
    }

    providerTransition(async () => {
      await authClient.signIn.social({
        provider: provider!,
        callbackURL: '/dashboard',
        fetchOptions: {
          onError(context) {
            toast.error(context.error.message || 'Failed to sign in with Google');
          },
        },
      });
    });
  };

  return (
    <section className="flex">
      <form
        onSubmit={form.handleSubmit((data) => handleSignUp({ data, action: 'credentials' }))}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link href="/" aria-label="go home" className="mx-auto block w-fit">
              <Logo />
            </Link>
            <h1 className="mt-4 mb-1 text-xl font-semibold">Create Account</h1>
            <p className="text-sm">Welcome! Create an account to get started</p>
          </div>

          <div className="mt-6 space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="block text-sm">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...form.register('confirmPassword')}
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={loading || pending} className="w-full">
              {loading ? <Spinner className="size-4" /> : 'Sign Up'}
            </Button>
          </div>

          <AuthSeperator />

          <Button
            type="button"
            onClick={() => handleSignUp({ action: 'provider', data: null, provider: 'google' })}
            disabled={pending || loading}
            variant="outline"
            className="flex w-full items-center justify-center gap-2"
          >
            {pending ? (
              <Spinner />
            ) : (
              <>
                <IconBrandGoogleFilled /> Continue with Google
              </>
            )}
          </Button>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account?
            <Button asChild variant="link" className="px-2">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}
