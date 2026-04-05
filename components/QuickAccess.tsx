import React from "react";
import {
  quickActions,
  type QuickActionData,
  type QuickActionIconKey,
} from "@/data/mockData";
import {
  MdOutlineAddBox,
  MdOutlineCurrencyExchange,
  MdOutlineAccountBalanceWallet,
  MdOutlineAccessTime,
} from "react-icons/md";
import { safeArray, safeText } from "./dashboardUtils";
import { EmptyState } from "./ui/EmptyState";

const iconMap: Record<QuickActionIconKey, typeof MdOutlineAddBox> = {
  "top-up": MdOutlineAddBox,
  transfer: MdOutlineCurrencyExchange,
  request: MdOutlineAccountBalanceWallet,
  history: MdOutlineAccessTime,
};

type QuickAccessProps = {
  actions?: QuickActionData[] | null;
};

const QuickAccess = ({ actions = quickActions }: QuickAccessProps) => {
  const safeActions = safeArray(actions).filter(
    (action): action is QuickActionData =>
      typeof action?.iconKey === "string" && typeof action?.name === "string"
  );

  if (safeActions.length === 0) {
    return (
      <div className="flex w-full rounded-card bg-surface transition-colors">
        <EmptyState
          title="No quick actions available"
          description="Quick shortcuts will appear here once action data is provided."
          className="min-h-24 rounded-card"
        />
      </div>
    );
  }

  return (
    <div
      // Using your custom theme variables. 
      // dark:bg-surface ensures it switches to the dark card background in dark mode,
      // since your --bg-light-green stays bright in both modes.
      className="flex w-full md:px-0 items-center gap-0.5 justify-between rounded-card overflow-hidden bg-surface transition-colors"
    >
      {safeActions.map((action) => {
        const Icon = iconMap[action.iconKey] ?? MdOutlineAccessTime;

        return (
          <React.Fragment key={safeText(action.name, action.iconKey)}>
            <button className="p-3 group flex cursor-pointer w-full bg-light-green flex-col items-center justify-center gap-1 focus:outline-none">
              <div className="text-2xl text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110">
                <Icon className="text-lg" />
              </div>
              <span className="text-xxs text-nowrap font-bold text-content">
                {safeText(action.name, "Unnamed")}
              </span>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default QuickAccess;
