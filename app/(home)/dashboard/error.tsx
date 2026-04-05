"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mt-14 flex min-h-screen w-full items-center justify-center rounded-2xl bg-surface px-4 py-8  md:mt-0">
      <div className="flex w-full max-w-lg flex-col items-center rounded-[1.75rem] border border-border bg-surface px-6 py-10 text-center shadow-card">
        <div className="rounded-full bg-light-green px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-primary">
          Dashboard Recovery
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-content">
          Something went wrong while rendering the dashboard.
        </h2>
        <p className="mt-2 text-sm text-content-muted">
          We now guard missing data paths more carefully, but this screen is here
          as a final fallback so the app can recover gracefully.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-6 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
