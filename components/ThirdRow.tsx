import React from "react";
import dynamic from "next/dynamic";
import {
  StatisticCardSkeleton,
  UpcomingBillingSkeleton,
} from "./DashboardSkeletons";

const StatisticCard = dynamic(() => import("./StatisticCard"), {
  loading: () => <StatisticCardSkeleton />,
});

const UpcomingBilling = dynamic(() => import("./UpcomingBills"), {
  loading: () => <UpcomingBillingSkeleton />,
});

const ThirdRow = () => {
  return (
    <div className="flex flex-col gap-4">
      <StatisticCard />
      <UpcomingBilling />
    </div>
  );
};

export default ThirdRow;
