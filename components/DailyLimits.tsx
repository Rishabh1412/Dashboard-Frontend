import React from "react";
import { dailyLimit } from "@/data/mockData";
import { MdMoreVert } from "react-icons/md";
import { ProgressBar } from "./ui/ProgressBar";
import { safeNumber } from "./dashboardUtils";
import { EmptyState } from "./ui/EmptyState";

type DailyLimitData = {
  spent?: number;
  total?: number;
};

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

type DailyLimitsProps = {
  limits?: DailyLimitData | null;
};

const DailyLimits = ({ limits = dailyLimit }: DailyLimitsProps) => {
  const spent = safeNumber(limits?.spent);
  const total = safeNumber(limits?.total);
  const progress = total > 0 ? (spent / total) * 100 : 0;
  const hasLimitData = spent > 0 || total > 0;

  return (
    <div className="card-container hover:border-border-strong flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base tracking-tight font-bold text-content">Daily Limit</h2>
        <button className="text-content-muted hover:text-content">
          <MdMoreVert className="text-xl" />
        </button>
      </div>

      {hasLimitData ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-tight text-content-muted">
              <span className="text-xs text-content font-bold">
                {formatCurrency(spent)}
              </span>{" "}
              spent of {formatCurrency(total)}
            </p>
            <span className="text-sm font-bold tracking-tight text-content">
              {progress.toFixed(1)}%
            </span>
          </div>

          <ProgressBar progress={progress} />
        </>
      ) : (
        <EmptyState
          title="No limit data available"
          description="Daily spending totals will appear here once limit data is provided."
        />
      )}
    </div>
  );
};

export default DailyLimits;
