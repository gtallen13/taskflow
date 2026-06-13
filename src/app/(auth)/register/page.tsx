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
            Organize Work.
            <br />
            Build Momentum.
            <br />
            Reach Goals.
          </h2>

          <p className="mt-6 text-lg text-slate-300">
            Create tasks, track time,
            generate reports and stay
            productive from one place.
          </p>
        </div>

        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} TaskFlow
        </div>
      </div>

      {/* Right Registration Panel */}
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
                Create Account
              </h2>

              <p className="mt-2 text-slate-500">
                Start organizing your work today.
              </p>

            </div>

            <form
              onSubmit={handleRegister}
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
                  ? "Creating..."
                  : "Create Account"}
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
              onClick={() =>
                loginWithGoogle()
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
              Already have an account?{" "}
              <a
                href="/login"
                className="
                  font-semibold
                  text-[#14213D]
                "
              >
                Sign In
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
);
}