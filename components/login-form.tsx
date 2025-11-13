'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {LoginSchema, LoginValues} from "@/validations/login.schema";
import {login} from "@/services/auth.service";

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [formError, setFormError] = React.useState<string | null>(null);
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  async function onSubmit(values: LoginValues) {
    setFormError(null);
    const { ok, status, payload } = await login(values);

    if (!ok) {
      if (status === 422 && payload?.errors) {
        if (payload.errors.email?.[0]) form.setError('email', { type: 'server', message: payload.errors.email[0] });
        if (payload.errors.password?.[0]) form.setError('password', { type: 'server', message: payload.errors.password[0] });
        setFormError(payload.message || 'Please fix the errors below.');
      } else if (status === 401) {
        setFormError(payload?.message || 'Invalid credentials.');
      } else if (status === 419) {
        setFormError('Session/CSRF mismatch. Please refresh and try again.');
      } else {
        setFormError(payload?.message || 'Login failed.');
      }
      return;
    }

    window.location.href = '/dashboard';
  }

  return (
      <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('flex flex-col gap-6', className)}
            {...props}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>

          {formError && (
              <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {formError}
              </div>
          )}

          <div className="grid gap-6">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="m@example.com" {...field} />
                      </FormControl>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline text-green-900 hover:text-green-800">
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </FormItem>
                )}
            />

            <Button type="submit" className="w-full bg-green-900 hover:bg-green-800" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>
        </form>
      </Form>
  );
}