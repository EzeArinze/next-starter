'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { resetPasswordEmail, resetPasswordEmailType } from '@/schema/auth-zod-schema';
import { tryCatch } from '@/utils/try-catch';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ResetPasswordMail } from '../action';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import Logo from '@/components/logo';

export default function ForgotPassword() {
  const [pending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(resetPasswordEmail),
    defaultValues: {
      email: '',
    },
  });

  async function sendResetMail({ email }: resetPasswordEmailType) {
    startTransition(async () => {
      const { error } = await tryCatch(
        ResetPasswordMail({ email: email, redirectTo: '/reset-password' }),
      );
      if (error) toast.error(error.message);
    });
  }

  return (
    <section className="flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(sendResetMail)}
          className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
            <div className="text-center">
              <Link href="/" aria-label="go home" className="mx-auto block w-fit">
                <Logo />
              </Link>
              <h1 className="mt-4 mb-1 text-xl font-semibold">Recover Password</h1>
              <p className="text-sm">Enter your email to receive a reset link</p>
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full" type="submit" disabled={pending}>
                {pending ? <Spinner className="size-4" /> : 'Send Reset Link'}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                {"We'll send you a link to reset your password."}
              </p>
            </div>
          </div>

          <div className="p-3">
            <p className="text-accent-foreground text-center text-sm">
              Remembered your password?
              <Button asChild variant="link" className="px-2" type="button">
                <Link href="/sign-in">Log in</Link>
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
}
