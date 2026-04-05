import React from "react";
import dynamic from "next/dynamic";
import { user } from "@/data/mockData";
import {
  DailyLimitsSkeleton,
  QuickAccessSkeleton,
  SavingsPlanSkeleton,
  UserCardSkeleton,
} from "./DashboardSkeletons";

const UserCard = dynamic(() => import("./UserCard"), {
  loading: () => <UserCardSkeleton />,
});

const QuickAccess = dynamic(() => import("./QuickAccess"), {
  loading: () => <QuickAccessSkeleton />,
});

const DailyLimits = dynamic(() => import("./DailyLimits"), {
  loading: () => <DailyLimitsSkeleton />,
});

const SavingsPlan = dynamic(() => import("./SavingsPlan"), {
  loading: () => <SavingsPlanSkeleton />,
});

const FirstRow = () => {
  return (
    <div className="flex flex-col gap-4">
      <UserCard userData={user} />
      <QuickAccess />
      <DailyLimits />
      <SavingsPlan />
    </div>
  );
};

export default FirstRow;
