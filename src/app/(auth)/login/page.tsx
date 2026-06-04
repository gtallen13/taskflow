"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login, loginWithGoogle } from "../../../services/auth";

import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(
        email,
        password
      );

      toast.success(
        "Welcome back!"
      );

      router.push(
        "/dashboard"
      );
    } catch (error: any) {
      toast.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin =
    async () => {
      try {
        await loginWithGoogle();

        toast.success(
          "Logged in successfully"
        );

        router.push(
          "/dashboard"
        );
      } catch (error: any) {
        toast.error(
          error.message
        );
      }
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            TaskFlow
          </h1>

          <p className="mt-2 text-slate-500">
            Sign in to continue
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full rounded-lg bg-black py-3 text-white hover:opacity-90"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="px-4 text-sm text-slate-500">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          onClick={
            handleGoogleLogin
          }
          className="cursor-pointer w-full rounded-lg border py-3 hover:bg-slate-50"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-black"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}