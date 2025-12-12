import { useTransition } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { tryCatch } from '@/utils/try-catch';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { AuthSeperator } from './auth-seperator';
import Logo from '@/components/logo';
import { signInSchema, signInSchemaType } from '@/schema/auth-zod-schema';
import { SignIn } from '../action';

export default function SignInPage() {
  const [loading, startTransition] = useTransition();
  const [pending, providerTransition] = useTransition();

  const form = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = ({ data, action, provider }: SignInAction) => {
    if (action === 'credentials' && data) {
      const { email, password } = data;
      startTransition(async () => {
        const { error } = await tryCatch(SignIn({ email, password }));
        if (error) toast.error(error.message || 'Something went wrong, try again!');
      });
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
      <div className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link href="/" aria-label="go home" className="mx-auto block w-fit">
              <Logo />
            </Link>
            <h1 className="mt-4 mb-1 text-xl font-semibold">Sign In</h1>
            <p className="text-muted-foreground text-sm">Welcome back! Sign in to continue</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                handleSignIn({ data, action: 'credentials', provider: undefined }),
              )}
              className="mt-6 space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm">
                  Email
                </Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input id="email" type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Button asChild variant="link" size="sm">
                    <Link href="/forgot-password" className="text-sm">
                      Forgot your Password?
                    </Link>
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input id="password" type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={loading || pending} className="w-full">
                {loading ? <Spinner className="size-4" /> : 'Sign In'}
              </Button>
            </form>
          </Form>

          <AuthSeperator />

          <Button
            type="button"
            onClick={() => handleSignIn({ action: 'provider', data: null, provider: 'google' })}
            disabled={pending || loading}
            variant="outline"
            className="flex w-full items-center justify-center gap-2"
          >
            {pending ? (
              <Spinner className="size-4" />
            ) : (
              <>
                <IconBrandGoogleFilled className="size-5" /> Continue with Google
              </>
            )}
          </Button>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            {"Don't have an account?"}
            <Button asChild variant="link" className="px-2">
              <Link href="/sign-up">Create account</Link>
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}
