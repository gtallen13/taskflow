"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } =
    useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            Loading...
          </h2>

          <p className="text-slate-500">
            Preparing your workspace
          </p>
        </div>
    </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}