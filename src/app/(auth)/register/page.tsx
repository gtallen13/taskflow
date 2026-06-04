"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  register,
  loginWithGoogle,
} from "../../../services/auth";

import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {
        toast.error(
          "Passwords do not match"
        );
        return;
      }

      try {
        setLoading(true);

        await register(
          name,
          email,
          password
        );

        toast.success(
          "Account created"
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-slate-500">
            Get started with TaskFlow
          </p>
        </div>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-4"
        >
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
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
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        <button
          onClick={() =>
            loginWithGoogle()
          }
          className="cursor-pointer mt-4 w-full rounded-lg border py-3 hover:bg-slate-50"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-black"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}