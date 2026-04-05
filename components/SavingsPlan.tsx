import React from "react";
import {
  savingsPlans,
  savingsPlanSummary,
  type SavingsPlanData,
  type SavingsPlanIconKey,
} from "@/data/mockData";
import {
  MdOutlineWarningAmber,
  MdFlightTakeoff,
  MdOutlineHome,
} from "react-icons/md";
import { PlanCard } from "./PlanCard";
import { safeArray, safeNumber } from "./dashboardUtils";
import { EmptyState } from "./ui/EmptyState";

const iconMap: Record<SavingsPlanIconKey, typeof MdOutlineWarningAmber> = {
  emergency: MdOutlineWarningAmber,
  vacation: MdFlightTakeoff,
  home: MdOutlineHome,
};

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

type SavingsPlanSummaryData = {
  totalSavings?: number;
};

type SavingsPlanProps = {
  plans?: SavingsPlanData[] | null;
  summary?: SavingsPlanSummaryData | null;
};

const SavingsPlan = ({
  plans = savingsPlans,
  summary = savingsPlanSummary,
}: SavingsPlanProps) => {
  const safePlans = safeArray(plans).filter(
    (plan): plan is SavingsPlanData =>
      typeof plan?.id === "string" && typeof plan?.title === "string"
  );
  const totalSavings = safeNumber(
    summary?.totalSavings,
    safePlans.reduce((total, plan) => total + safeNumber(plan.current), 0)
  );

  return (
    <div className="card-container hover:border-border-strong flex flex-col gap-4 tracking-tight">
      {/* Saving Plans Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-content">Saving Plans</h2>
          <button className="flex items-center gap-1 text-xs font-bold text-content-muted hover:text-primary">
            <span className="text-lg">+</span> Add Plan
          </button>
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-semibold text-content-muted">
            Total Savings
          </p>
          <h1 className="text-2xl font-bold tracking-tighter text-primary dark:text-content">
            {formatCurrency(totalSavings)}
          </h1>
        </div>
      </div>

      {/* Nested Plan Cards List */}
      <div className="flex flex-col gap-3">
        {safePlans.length > 0 ? (
          safePlans.map((plan) => (
            <PlanCard
              key={plan.id}
              icon={iconMap[plan.iconKey] ?? MdOutlineWarningAmber}
              title={plan.title}
              current={formatCurrency(safeNumber(plan.current))}
              target={formatCurrency(safeNumber(plan.target))}
              percentage={safeNumber(plan.percentage)}
            />
          ))
        ) : (
          <EmptyState
            title="No savings plans yet"
            description="Add or provide savings plan data to render progress cards in this section."
          />
        )}
      </div>
    </div>
  );
};

export default SavingsPlan;
