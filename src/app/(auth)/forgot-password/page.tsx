"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPassword, mapAuthError } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ErrorText } from "@/components/ui/ErrorText";

const schema = z.object({ email: z.string().email("Please enter a valid email address") });
type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [authError, setAuthError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setAuthError("");
    try {
      await resetPassword(data.email);
      setSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || "";
      setAuthError(mapAuthError(code));
    }
  }

  if (sent) {
    return (
      <div className="w-full max-w-narrow text-center">
        <div className="bg-white rounded-card p-10 shadow-card">
          <div className="w-14 h-14 rounded-full bg-[rgba(74,140,111,0.12)] flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-success" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="font-display text-h2 text-stone-900 mb-3">Check your email</h2>
          <p className="font-sans text-body text-stone-500 mb-6">
            We&apos;ve sent a password reset link. It may take a minute to arrive.
          </p>
          <Link href="/sign-in">
            <Button variant="secondary" className="w-full">Back to sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-narrow">
      <div className="text-center mb-8">
        <h1 className="font-display text-h1 text-stone-900 mb-2">Reset your password</h1>
        <p className="font-sans text-body text-stone-500">We&apos;ll send you a link to get back in.</p>
      </div>
      <div className="bg-white rounded-card p-8 shadow-card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="your@email.com" error={!!errors.email} {...register("email")} />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </div>
          {authError && <ErrorText>{authError}</ErrorText>}
          <Button type="submit" variant="primary" className="w-full" loading={isSubmitting}>
            Send reset link
          </Button>
        </form>
      </div>
      <p className="text-center font-sans text-[14px] text-stone-500 mt-6">
        <Link href="/sign-in" className="text-ember hover:text-ember-dark">Back to sign in</Link>
      </p>
    </div>
  );
}
