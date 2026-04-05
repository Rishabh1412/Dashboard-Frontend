"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      router.replace("/dashboard");
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-xl rounded-4xl border border-border bg-surface p-8 text-center shadow-card">
        <div className="mx-auto mb-5 w-fit rounded-full bg-light-green px-4 py-2 text-base font-semibold uppercase tracking-tight text-primary">
          404 NOT FOUND
        </div>
        <h1 className="text-3xl font-semibold tracking-tighter text-content">
          This page drifted off the dashboard.
        </h1>
        <p className="mt-3 text-sm text-content-muted">
          The route you requested could not be found. You&apos;ll be redirected to
          the dashboard in a few seconds, or you can jump back right now.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Go To Dashboard
          </Link>
          <button
            type="button"
            onClick={() => router.replace("/dashboard")}
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-bold text-content-muted transition-colors hover:border-border-strong hover:text-content"
          >
            Redirect Now
          </button>
        </div>
      </div>
    </div>
  );
}
