import React from "react";

type SkeletonProps = {
  className?: string;
};

const joinClasses = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={joinClasses("skeleton rounded-xl", className)}
    />
  );
}

type SkeletonTextProps = {
  className?: string;
  lines?: number;
};

export function SkeletonText({
  className,
  lines = 3,
}: SkeletonTextProps) {
  const widths = ["w-full", "w-5/6", "w-3/4", "w-2/3"];

  return (
    <div className={joinClasses("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={joinClasses(
            "h-3",
            widths[Math.min(index, widths.length - 1)]
          )}
        />
      ))}
    </div>
  );
}
