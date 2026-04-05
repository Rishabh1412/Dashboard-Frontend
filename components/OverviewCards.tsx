import React from "react";
import {
  overviewCards,
  type OverviewCardData,
  type OverviewCardIconKey,
} from "@/data/mockData";
import type { IconType } from "react-icons";
import {
  MdMoreVert,
  MdTrendingUp,
  MdTrendingDown,
  MdOutlineCallReceived,
  MdOutlineCallMade,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { safeArray, safeNumber, safeText } from "./dashboardUtils";
import { EmptyState } from "./ui/EmptyState";

type SummaryCardProps = {
  title: string;
  amount: string;
  percentage: number;
  isPositive: boolean;
  icon: IconType;
};

const iconMap: Record<OverviewCardIconKey, IconType> = {
  income: MdOutlineCallReceived,
  expense: MdOutlineCallMade,
  savings: MdOutlineAccountBalanceWallet,
};

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;


const SummaryCard = ({
  title,
  amount,
  percentage,
  isPositive,
  icon: Icon,
}: SummaryCardProps) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-card border border-border bg-surface p-4 shadow-card transition-colors hover:border-border-strong">
      {/* Header: Icon & Options Menu */}
      <div className="flex items-start gap-12 justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-[0.85rem] bg-light-green text-primary">
          <Icon className="text-xl" />
        </div>
        <button className="text-content-muted hover:text-content">
          <MdMoreVert className="text-xl" />
        </button>
      </div>

      <div className="mt-2 flex flex-col ">
        <div
          className={`inline-flex w-fit items-center gap-0.5 mb-2 rounded-full text-[9px] px-2 py-0.5 font-extrabold tracking-wide ${
            isPositive ? "badge-success" : "badge-danger"
          }`}
        >
          {isPositive ? (
            <MdTrendingUp className="text-xs" />
          ) : (
            <MdTrendingDown className="text-xs" />
          )}
          {isPositive ? "+" : "-"}
          {Math.abs(percentage)}%
        </div>

        <h2 className="text-xl font-bold leading-none tracking-tight text-content mt-1">
          {amount}
        </h2>

        <p className="text-xs font-semibold tracking-tight text-content-muted">
          {title}
        </p>
      </div>
    </div>
  );
};

/* =========================================
   2. MAIN OVERVIEW SECTION
   ========================================= */
type OverviewCardsProps = {
  cards?: OverviewCardData[] | null;
};

const OverviewCards = ({ cards = overviewCards }: OverviewCardsProps) => {
  const safeCards = safeArray(cards).filter(
    (card): card is OverviewCardData =>
      typeof card?.id === "string" && typeof card?.title === "string"
  );

  if (safeCards.length === 0) {
    return (
      <div className="grid w-full grid-cols-1 gap-2">
        <EmptyState
          title="No overview metrics available"
          description="Summary cards will appear here once overview data is provided."
          className="min-h-36"
        />
      </div>
    );
  }

  return (
    // Responsive grid: Stacks vertically on mobile, sits 3-in-a-row on desktop
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
      {safeCards.map((card) => (
        <SummaryCard
          key={card.id}
          title={safeText(card.title, "Untitled metric")}
          amount={formatCurrency(safeNumber(card.amount))}
          percentage={safeNumber(card.percentage)}
          isPositive={Boolean(card.isPositive)}
          icon={iconMap[card.iconKey] ?? MdOutlineAccountBalanceWallet}
        />
      ))}
    </div>
  );
};

export default OverviewCards;
