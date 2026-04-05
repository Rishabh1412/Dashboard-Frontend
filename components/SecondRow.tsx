import React from "react";
import dynamic from "next/dynamic";
import {
  CashflowChartSkeleton,
  OverviewCardsSkeleton,
  RecentTransactionsSkeleton,
} from "./DashboardSkeletons";

const OverviewCards = dynamic(() => import("./OverviewCards"), {
  loading: () => <OverviewCardsSkeleton />,
});

const CashflowChart = dynamic(() => import("./CashFlowChart"), {
  ssr: false,
  loading: () => <CashflowChartSkeleton />,
});

const RecentTransactions = dynamic(() => import("./RecentTransactions"), {
  loading: () => <RecentTransactionsSkeleton />,
});

const SecondRow = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <OverviewCards />
      <CashflowChart />
      <RecentTransactions />
    </div>
  );
};

export default SecondRow;
