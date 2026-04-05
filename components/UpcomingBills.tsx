"use client";

import React from "react";
import {
  upcomingBillingGroups,
  type BillingGroup,
  type BillingItem,
} from "@/data/mockData";
import { MdMoreVert } from "react-icons/md";
import { safeArray, safeText } from "./dashboardUtils";
import { EmptyState } from "./ui/EmptyState";

type UpcomingBillingProps = {
  groups?: BillingGroup[] | null;
};

/* =========================================
   2. MAIN COMPONENT
   ========================================= */
const UpcomingBilling = ({ groups = upcomingBillingGroups }: UpcomingBillingProps) => {
  const safeGroups = safeArray(groups).filter(
    (group): group is BillingGroup =>
      typeof group?.timeframe === "string" && Array.isArray(group?.items)
  );

  return (
    <div className="card-container flex flex-col gap-4 rounded-3xl border border-border bg-white p-4 transition-colors hover:border-border-strong dark:bg-[#161d1a]">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold tracking-tight text-content">
          Upcoming Billing
        </h2>
        <button className="flex h-6 w-6 items-center justify-center rounded-full text-content-muted transition-colors hover:text-content">
          <MdMoreVert className="text-xl" />
        </button>
      </div>

      <div className="flex flex-col max-h-86 overflow-y-auto gap-4">
        {safeGroups.length > 0 ? (
          safeGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col">
              {/* Timeframe Label */}
              <h3 className="mb-4 text-sm font-semibold tracking-tight text-content">
                {safeText(group.timeframe, "Upcoming")}
              </h3>

              <div className="flex flex-col">
                {safeArray(group.items)
                  .filter(
                    (item): item is BillingItem =>
                      typeof item?.company === "string"
                  )
                  .map((item, itemIndex, items) => {
                    const isLast = itemIndex === items.length - 1;

                    return (
                      <div
                        key={item.id ?? `${groupIndex}-${itemIndex}`}
                        className="relative flex gap-4 pb-6 last:pb-0"
                      >
                        {/* Vertical Connecting Line (Hidden on the last item) */}
                        {!isLast && (
                          <div className="absolute left-[14px] top-10 -bottom-2 w-[2px] bg-border/60"></div>
                        )}

                        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b4f0a4] text-sm font-bold text-[#134933] shadow-sm ring-4 ring-white dark:ring-[#161d1a]">
                          {safeText(item.initial, "?").slice(0, 1)}
                        </div>

                        {/* Content Details */}
                        <div className="flex flex-col">
                          <p className="text-xs text-wrap text-content">
                            <span className="font-bold">
                              {safeText(item.company, "Unknown service")}
                            </span>{" "}
                            {safeText(
                              item.description,
                              "Billing details pending"
                            )}
                          </p>
                          <p className="mt-1 text-xs font-medium text-content-muted">
                            {safeText(item.date, "Date unavailable")} &bull;{" "}
                            <span className="font-semibold text-content">
                              {safeText(item.amount, "Amount unavailable")}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            title="No billing items scheduled"
            description="Upcoming invoices and renewals will show up here once billing data is available."
          />
        )}
      </div>
    </div>
  );
};

export default UpcomingBilling;
