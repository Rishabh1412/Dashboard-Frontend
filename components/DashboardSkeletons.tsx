import React from "react";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

const cardShell =
  "rounded-[1.25rem] border border-border bg-surface p-4 shadow-card";

export function UserCardSkeleton() {
  return (
    <div className="flex aspect-[3/2] w-full flex-col justify-between rounded-3xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-2 gap-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-2 w-2 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <SkeletonText className="max-w-40" lines={2} />

      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-9" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-9" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuickAccessSkeleton() {
  return (
    <div className="flex w-full overflow-hidden rounded-[1.25rem] border border-border bg-surface">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-1 flex-col items-center justify-center gap-2 border-r border-border/70 bg-light-green px-3 py-4 last:border-r-0"
        >
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-3 w-14" />
        </div>
      ))}
    </div>
  );
}

export function DailyLimitsSkeleton() {
  return (
    <div className={`${cardShell} flex flex-col gap-4`}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  );
}

function SavingsPlanItemSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function SavingsPlanSkeleton() {
  return (
    <div className={`${cardShell} flex flex-col gap-4 tracking-tight`}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="flex flex-col gap-3">
        <SavingsPlanItemSkeleton />
        <SavingsPlanItemSkeleton />
        <SavingsPlanItemSkeleton />
      </div>
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-[1.25rem] border border-border bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-12">
        <Skeleton className="h-8 w-8 rounded-[0.85rem]" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function OverviewCardsSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
      <SummaryCardSkeleton />
      <SummaryCardSkeleton />
      <SummaryCardSkeleton />
    </div>
  );
}

export function CashflowChartSkeleton() {
  return (
    <div className={`${cardShell} flex flex-col gap-6 border`}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-36" />
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2.5 w-2.5 rounded-sm" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-2.5 w-2.5 rounded-sm" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
      </div>

      <div className="flex h-[240px] w-full items-end gap-2 rounded-xl border border-border/60 px-3 pb-5 pt-6">
        {[
          "h-20",
          "h-28",
          "h-24",
          "h-36",
          "h-[5.5rem]",
          "h-32",
          "h-[4.5rem]",
          "h-24",
          "h-40",
          "h-28",
          "h-16",
          "h-24",
        ].map(
          (height, index) => (
            <Skeleton
              key={index}
              className={`w-full rounded-t-lg rounded-b-sm ${height}`}
            />
          )
        )}
      </div>
    </div>
  );
}

function RecentTransactionRowSkeleton() {
  return (
    <div className="grid grid-cols-[1.2fr_0.9fr_0.6fr_1.2fr_0.7fr] items-center gap-3 border-b border-border px-1 py-3 last:border-b-0">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-14" />
      </div>
      <Skeleton className="h-3 w-14" />
      <Skeleton className="h-3 w-full max-w-40" />
      <Skeleton className="h-7 w-[4.5rem] rounded-md" />
    </div>
  );
}

function RecentTransactionCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-3 w-16" />
      </div>
      <SkeletonText lines={2} />
      <div className="flex items-center justify-between border-t border-border pt-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-7 w-[4.5rem] rounded-md" />
      </div>
    </div>
  );
}

export function RecentTransactionsSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-border bg-surface p-4">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Skeleton className="h-5 w-40" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>

      <div className="hidden lg:block">
        {Array.from({ length: 5 }).map((_, index) => (
          <RecentTransactionRowSkeleton key={index} />
        ))}
      </div>

      <div className="flex flex-col gap-3 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <RecentTransactionCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function StatisticCardSkeleton() {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-3xl border border-border bg-surface p-5 shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>

      <div className="mb-8 flex gap-3 border-b border-border pb-3">
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 flex-1" />
      </div>

      <div className="relative mb-8 flex h-[220px] w-full items-center justify-center">
        <Skeleton className="h-40 w-40 rounded-full" />
        <div className="absolute h-24 w-24 rounded-full border border-border bg-surface" />
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-10 rounded-xl" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-[4.5rem]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingGroupSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="mb-4 h-4 w-24" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-1 flex-col gap-2 pt-1">
              <SkeletonText lines={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UpcomingBillingSkeleton() {
  return (
    <div className={`${cardShell} flex flex-col gap-4 rounded-3xl`}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex flex-col gap-6">
        <BillingGroupSkeleton />
        <BillingGroupSkeleton />
      </div>
    </div>
  );
}

export function FirstRowSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <UserCardSkeleton />
      <QuickAccessSkeleton />
      <DailyLimitsSkeleton />
      <SavingsPlanSkeleton />
    </div>
  );
}

export function SecondRowSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      <OverviewCardsSkeleton />
      <CashflowChartSkeleton />
      <RecentTransactionsSkeleton />
    </div>
  );
}

export function ThirdRowSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <StatisticCardSkeleton />
      <UpcomingBillingSkeleton />
    </div>
  );
}

export function DashboardPageSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="mt-14 flex min-h-screen w-full flex-col gap-4 rounded-2xl bg-white px-4 py-2 pt-4 dark:bg-black md:mt-0"
    >
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex items-center gap-2 md:gap-4">
          <Skeleton className="h-10 w-32 rounded-full md:w-36" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full rounded-xl bg-surface p-1 md:hidden">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="ml-1 h-10 flex-1 rounded-lg" />
          <Skeleton className="ml-1 h-10 flex-1 rounded-lg" />
        </div>

        <div className="flex w-full flex-col gap-4 xl:flex-row xl:justify-center">
          <div className="min-w-0 w-full xl:w-auto">
            <FirstRowSkeleton />
          </div>
          <div className="hidden min-w-0 w-full xl:block xl:w-auto">
            <SecondRowSkeleton />
          </div>
          <div className="hidden min-w-0 w-full xl:block xl:w-auto">
            <ThirdRowSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
