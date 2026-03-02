"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, googleSignIn, mapAuthError } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ErrorText } from "@/components/ui/ErrorText";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});
type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setAuthError("");
    try {
      await signIn(data.email, data.password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || "";
      setAuthError(mapAuthError(code));
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setAuthError("");
    try {
      await googleSignIn();
      router.push("/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || "";
      setAuthError(mapAuthError(code));
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="w-full max-w-narrow">
      <div className="text-center mb-8">
        <h1 className="font-display text-h1 text-stone-900 mb-2">Welcome back</h1>
        <p className="font-sans text-body text-stone-500">Come back whenever you&apos;re ready.</p>
      </div>
      <div className="bg-white rounded-card p-8 shadow-card">
        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 border border-stone-300 rounded-input py-3 font-sans font-medium text-[15px] text-stone-700 hover:bg-stone-100 transition-colors duration-fast disabled:opacity-50 mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
          {googleLoading ? "Connecting…" : "Continue with Google"}
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-stone-300" />
          <span className="font-sans text-[13px] text-stone-500">or</span>
          <div className="flex-1 h-px bg-stone-300" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="your@email.com" error={!!errors.email} {...register("email")} />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Your password" error={!!errors.password} {...register("password")} />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
            <div className="text-right mt-1">
              <Link href="/forgot-password" className="font-sans text-[13px] text-ember hover:text-ember-dark">
                Forgot your password?
              </Link>
            </div>
          </div>
          {authError && <ErrorText>{authError}</ErrorText>}
          <Button type="submit" variant="primary" className="w-full mt-2" loading={isSubmitting}>
            Sign in
          </Button>
        </form>
      </div>
      <p className="text-center font-sans text-[14px] text-stone-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-ember font-medium hover:text-ember-dark">Create one</Link>
      </p>
    </div>
  );
}
