"use client";

import React, { useState } from "react";
import {
  type StatisticBreakdownItem,
  statisticsData,
  type StatisticBreakdownSection,
  type StatisticTimeFilter,
  type StatisticTab,
} from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { MdKeyboardArrowDown } from "react-icons/md";
import { safeArray, safeNumber, safeText } from "./dashboardUtils";
import { EmptyState } from "./ui/EmptyState";

type StatisticsDataMap = Partial<
  Record<StatisticTimeFilter, Partial<Record<StatisticTab, StatisticBreakdownSection>>>
>;

const emptySection: StatisticBreakdownSection = {
  total: 0,
  items: [],
};

type StatisticCardProps = {
  data?: StatisticsDataMap | null;
};

const StatisticCard = ({ data = statisticsData }: StatisticCardProps) => {
  const [activeTab, setActiveTab] = useState<StatisticTab>("Expense");
  const [timeFilter, setTimeFilter] =
    useState<StatisticTimeFilter>("This Month");
  const availableFilters = (Object.keys(data ?? {}) as StatisticTimeFilter[])
    .filter((filter) => typeof data?.[filter] === "object");
  const selectedFilter = availableFilters.includes(timeFilter)
    ? timeFilter
    : availableFilters[0];

  // Get dynamic data based on current selections
  const selectedDataset = selectedFilter ? data?.[selectedFilter] : undefined;
  const incomeData = selectedDataset?.Income ?? emptySection;
  const expenseData = selectedDataset?.Expense ?? emptySection;
  const currentData = activeTab === "Income" ? incomeData : expenseData;
  const currentItems = safeArray(currentData.items).filter(
    (item): item is StatisticBreakdownItem =>
      typeof item?.id === "number" && typeof item?.category === "string"
  );
  const incomeTotal = safeNumber(incomeData.total);
  const expenseTotal = safeNumber(expenseData.total);
  const hasStatisticData = currentItems.length > 0;

  return (
    <div className="card-container w-full max-w-sm flex flex-col p-4 px-5 rounded-3xl border-border border hover:border-border-strong transition-colors bg-white dark:bg-[#161d1a]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base tracking-tight font-bold text-gray-900 dark:text-white">
          Statistics
        </h2>

        {/* Custom Styled Select Dropdown */}
        <div className="relative">
          <select
            suppressHydrationWarning
            className="appearance-none rounded-lg border border-border bg-transparent py-1.5 pl-3 pr-8 text-xs text-primary tracking-tight font-semibold outline-none transition-colors hover:border-border-strong focus:border-primary dark:bg-background cursor-pointer"
            value={selectedFilter ?? ""}
            onChange={(e) =>
              setTimeFilter(e.target.value as StatisticTimeFilter)
            }
            disabled={!availableFilters.length}
          >
            {availableFilters.length ? (
              availableFilters.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))
            ) : (
              <option value="">No data</option>
            )}
          </select>
          <MdKeyboardArrowDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-content-muted" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 gap-3 font-semibold dark:border-gray-800 mb-8">
        <button
          onClick={() => setActiveTab("Income")}
          className={`flex-1 pb-3 text-xs text-nowrap text-center transition-colors ${
            activeTab === "Income"
              ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white"
              : "text-gray-400 border-b-2 border-transparent hover:text-gray-600"
          }`}
        >
          Income{" "}
          <span className="text-xs font-normal opacity-70">
            (₹{incomeTotal.toLocaleString()})
          </span>
        </button>
        <button
          onClick={() => setActiveTab("Expense")}
          className={`flex-1 pb-3 text-xs text-nowrap text-center transition-colors ${
            activeTab === "Expense"
              ? "text-gray-900 dark:text-white border-b-2 border-[#b4f0a4]"
              : "text-gray-400 border-b-2 border-transparent hover:text-gray-600"
          }`}
        >
          Expense{" "}
          <span className="text-xs font-normal opacity-70">
            (₹{expenseTotal.toLocaleString()})
          </span>
        </button>
      </div>

      {/* Chart Area */}
      <div className="relative w-full h-[220px] mb-8">
        {hasStatisticData ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart
                // Key forces Recharts to re-animate when data or tabs change
                key={`${selectedFilter}-${activeTab}`}
              >
                <Pie
                  data={currentItems}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="percentage"
                  stroke="none"
                  cornerRadius={1}
                  isAnimationActive={true}
                >
                  {currentItems.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color ?? "#134933"} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Text inside the Donut hole */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xxs font-semibold text-content-muted uppercase tracking-tight">
                Total {activeTab}
              </span>
              <span className="text-xl font-bold text-[#134933] tracking-tight dark:text-white mt-0.5">
                ₹{safeNumber(currentData.total).toLocaleString()}
              </span>
            </div>
          </>
        ) : (
          <EmptyState
            title="No statistics available"
            description="Provide income or expense breakdown data to render this chart."
            className="h-full"
          />
        )}
      </div>

      {/* List Area */}
      <div className="flex flex-col gap-3">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div
                  className={`flex items-center justify-center w-[36px] py-1.5 rounded-xl text-xxs font-medium ${item.textColor}`}
                  style={{ backgroundColor: item.color ?? "#134933" }}
                >
                  {safeNumber(item.percentage)}%
                </div>
                <span className="text-xs font-semibold tracking-tight text-content dark:text-gray-200">
                  {safeText(item.category, "Uncategorized")}
                </span>
              </div>
              <span className="text-sm font-bold text-primary tracking-tight dark:text-white">
                ₹{safeNumber(item.amount).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-xs text-content-muted">
            No category breakdown is available for the selected period.
          </p>
        )}
      </div>
    </div>
  );
};

export default StatisticCard;
