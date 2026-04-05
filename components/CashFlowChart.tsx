"use client";

import React, { useState, useSyncExternalStore } from "react";
import {
  cashflowChartData,
  cashflowSummary,
  type CashflowDatum,
  type CashflowPeriod,
} from "@/data/mockData";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { MdKeyboardArrowDown } from "react-icons/md";
import { safeArray, safeNumber } from "./dashboardUtils";
import { EmptyState } from "./ui/EmptyState";

type TooltipEntry = {
  name: string;
  value: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
};

type CashflowLegendItem = {
  label: string;
  color: string;
};

type CashflowSummaryData = {
  totalBalance?: number;
  legend?: CashflowLegendItem[] | null;
};

type CashflowChartProps = {
  data?: Partial<Record<CashflowPeriod, CashflowDatum[]>> | null;
  summary?: CashflowSummaryData | null;
};

/* =========================================
   2. CUSTOM TOOLTIP COMPONENT
   ========================================= */
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4 shadow-dropdown dark:bg-[#161d1a]">
        <p className="mb-2 text-xs font-semibold text-content-muted">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-6 py-0.5"
          >
            <span className="text-sm font-medium text-content capitalize">
              {entry.name}
            </span>
            <span className="text-sm font-bold text-content">
              ₹{Math.abs(safeNumber(entry.value)).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

/* =========================================
   3. MAIN CASHFLOW COMPONENT
   ========================================= */
const CashflowChart = ({
  data = cashflowChartData,
  summary = cashflowSummary,
}: CashflowChartProps) => {
  const [timeFilter, setTimeFilter] = useState<CashflowPeriod>("This Year");
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const availablePeriods = (
    Object.keys(data ?? {}) as CashflowPeriod[]
  ).filter((period) => Array.isArray(data?.[period]));
  const selectedPeriod = availablePeriods.includes(timeFilter)
    ? timeFilter
    : availablePeriods[0];
  const activeData: CashflowDatum[] = selectedPeriod
    ? safeArray(data?.[selectedPeriod]).map((datum) => ({
        name: typeof datum?.name === "string" ? datum.name : "",
        income: safeNumber(datum?.income),
        expense: safeNumber(datum?.expense),
      }))
    : [];
  const safeLegend = safeArray(summary?.legend).filter(
    (item): item is CashflowLegendItem =>
      typeof item?.label === "string" && typeof item?.color === "string"
  );
  const totalBalance = safeNumber(summary?.totalBalance);
  const hasChartData = activeData.length > 0;

  const formatYAxis = (tickItem: number) => {
    if (tickItem === 0) return "0";
    return `${tickItem / 1000}K`;
  };

  return (
    <div className="card-container hover:border-border-strong border-border border flex flex-col gap-6">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold tracking-tight text-content">Cashflow</h2>
        <div className="relative">
          <select
            suppressHydrationWarning
            className="appearance-none rounded-lg border border-border bg-transparent py-1.5 pl-3 pr-8 text-xs text-primary tracking-tight font-semibold outline-none transition-colors hover:border-border-strong focus:border-primary dark:bg-background cursor-pointer"
            value={selectedPeriod ?? ""}
            onChange={(e) => setTimeFilter(e.target.value as CashflowPeriod)}
            disabled={!availablePeriods.length}
          >
            {availablePeriods.length ? (
              availablePeriods.map((key) => (
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

      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <p className="text-xs font-semibold text-content-muted">Total Balance</p>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            ₹{totalBalance.toLocaleString()}
          </h1>
        </div>
        <div className="flex items-center gap-4 pb-1">
          {safeLegend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-bold text-content">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-[240px] min-w-0 w-full pt-4">
        {!isMounted ? (
          <Skeleton className="h-full w-full rounded-xl" />
        ) : !hasChartData ? (
          <EmptyState
            title="No cashflow data available"
            description="Provide cashflow points to render the income and expense chart."
            className="h-full"
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              // The key forces the chart to re-animate when the filter changes!
              key={selectedPeriod}
              data={activeData}
              margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
              stackOffset="sign"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
              
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-content-muted)", fontSize: 10, fontWeight: 600 }}
                dy={15}
              />
              
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxis}
                tick={{ fill: "var(--color-content-muted)", fontSize: 10, fontWeight: 600 }}
              />
              
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--color-border)", opacity: 0.2 }} />
              
              <ReferenceLine y={0} stroke="var(--color-border-strong)" />
              
              {/* Radius restored, animations active by default */}
              <Bar 
                dataKey="income" 
                fill="#134933" 
                stackId="a" 
                barSize={26} 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="expense" 
                fill="#b4f0a4" 
                stackId="a" 
                barSize={26} 
                // Try [4, 4, 0, 0] if the previous one was rounding the wrong end!
                // The 4 values map to: [top-left, top-right, bottom-right, bottom-left]
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CashflowChart;
