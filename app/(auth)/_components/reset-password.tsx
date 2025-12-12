'use client';

import { Button } from '@/components/ui/button';
import { resetPasswordSchema, resetPasswordSchemaType } from '@/schema/auth-zod-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { tryCatch } from '@/utils/try-catch';
import { resetPasswordAction } from '../action';
import Logo from '@/components/logo';

export default function ResetPassword({ token }: { token: string }) {
  const [pending, startTranstion] = useTransition();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function resetPassword({ password, confirmPassword }: resetPasswordSchemaType) {
    startTranstion(async () => {
      const { error } = await tryCatch(resetPasswordAction({ password, token, confirmPassword }));
      if (error) toast.error(error.message);
    });
  }

  return (
    <section className="flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(resetPassword)}
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
              {/* Password */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm">Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={pending} className="w-full">
                {pending ? <Spinner className="size-4" /> : 'reset-password'}
              </Button>
            </div>
          </div>

          <div className="p-3">
            <p className="text-accent-foreground text-center text-sm">
              Remembered your password
              <Button asChild variant="link" className="px-2" type="button">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
}
