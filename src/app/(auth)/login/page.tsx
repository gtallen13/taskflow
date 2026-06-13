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
  <div className="min-h-screen bg-[#F8F9FB]">

    <div className="grid min-h-screen lg:grid-cols-2">

      {/* Left Branding Panel */}
      <div
        className="
          hidden
          lg:flex
          flex-col
          justify-between
          bg-gradient-to-br
          from-black
          via-[#14213D]
          to-[#14213D]
          p-12
          text-white
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#FCA311]
                text-xl
                font-bold
                text-[#14213D]
              "
            >
              T
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                TaskFlow
              </h1>

              <p className="text-slate-300">
                Productivity Suite
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-lg">
          <h2 className="text-5xl font-bold leading-tight">
            Stay Focused.
            <br />
            Track Progress.
            <br />
            Achieve More.
          </h2>

          <p className="mt-6 text-lg text-slate-300">
            Organize tasks, track time,
            generate reports and stay
            productive with a single
            workspace.
          </p>
        </div>

        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} TaskFlow
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="mb-10 text-center lg:hidden">

            <div
              className="
                mx-auto
                mb-4
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-[#FCA311]
                text-2xl
                font-bold
                text-[#14213D]
              "
            >
              T
            </div>

            <h1 className="text-3xl font-bold text-[#14213D]">
              TaskFlow
            </h1>

          </div>

          <div
            className="
              rounded-3xl
              border
              border-[#E5E5E5]
              bg-white
              p-8
              shadow-xl
            "
          >

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-[#14213D]">
                Welcome Back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to continue your
                productivity journey.
              </p>

            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E5E5E5]
                  px-4
                  py-3
                  focus:border-[#FCA311]
                  focus:outline-none
                "
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
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E5E5E5]
                  px-4
                  py-3
                  focus:border-[#FCA311]
                  focus:outline-none
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  cursor-pointer
                  rounded-xl
                  bg-[#FCA311]
                  py-3
                  font-semibold
                  text-[#14213D]
                  transition
                  hover:shadow-lg
                "
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>

            </form>

            <div className="my-6 flex items-center">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="px-4 text-sm text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>

            <button
              onClick={
                handleGoogleLogin
              }
              className="
                w-full
                cursor-pointer
                rounded-xl
                border
                border-[#E5E5E5]
                py-3
                font-medium
                transition
                hover:bg-slate-50
              "
            >
              Continue with Google
            </button>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="
                  font-semibold
                  text-[#14213D]
                "
              >
                Register
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
);
}