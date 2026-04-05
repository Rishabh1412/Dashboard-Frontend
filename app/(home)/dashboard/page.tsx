"use client";
import { ThemeToggle } from "@/app/theme-toggle";
import FirstRow from "@/components/FirstRow";
import SecondRow from "@/components/SecondRow";
import ThirdRow from "@/components/ThirdRow";
import { user } from "@/data/mockData";
import { safeText } from "@/components/dashboardUtils";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { useState } from "react";
import { MdOutlineNotifications, MdSearch } from "react-icons/md";

type DashboardTab = {
  id: number;
  label: string;
  Component: ComponentType;
};

const Page = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(0);

  const tabs: DashboardTab[] = [
    { id: 0, label: "Overview", Component: FirstRow },
    { id: 1, label: "Cashflow", Component: SecondRow },
    { id: 2, label: "Statistics", Component: ThirdRow },
  ];

  const formatPageTitle = (path?: string | null) => {
    if (!path || path === "/") return "Dashboard";
    const cleanPath = path.slice(1);

    return cleanPath
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const pageTitle = formatPageTitle(pathname);
  const ActiveTab = tabs[activeTab]?.Component ?? FirstRow;
  const profileName = safeText(user?.name, "Dashboard User");

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 rounded-2xl mt-14 md:mt-0 bg-white px-4 py-2 pt-4 dark:bg-black">
      <div className="flex items-center justify-between">
        <h2 className="font-bold tracking-tighter">{pageTitle}</h2>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative w-full md:max-w-36 max-w-32">
            <MdSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-content-muted" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full bg-gray-100 px-4 py-2 pl-10 text-sm tracking-tight text-content focus:outline-none dark:bg-surface"
            />
          </div>

          <button
            className="flex items-center gap-2 icon-box rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Notifications"
          >
            <MdOutlineNotifications className="text-2xl text-gray-600 dark:text-gray-300" />
          </button>
          <ThemeToggle />

          <button
            className="relative flex items-center justify-center p-1 group rounded-full transition-all duration-300 ease-out hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="User Profile and Status"
          >
            <div className="absolute w-10 h-10 rounded-full border-2 border-primary opacity-0 group-hover:animate-[ping-slow_1.5s_ease-out_infinite] pointer-events-none"></div>

            <img
              src="/pfp.jpeg"
              alt="Your profile"
              className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 shadow-inner group-hover:border-gray-200 dark:group-hover:border-gray-700 transition-all duration-300 ease-out"
            />

            <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-white dark:border-gray-900 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-spring"></div>

            <div className="pointer-events-none absolute top-full right-0 w-max translate-y-2 mt-0.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex flex-col items-center rounded-xl bg-gray-900 px-4 py-1.5 shadow-xl dark:bg-white">
                <p className="text-xs font-bold tracking-tight text-white dark:text-gray-900">
                  {profileName}
                </p>
              </div>
              <div className="absolute -top-1.5 right-4 h-3 w-3 rotate-45 bg-gray-900 dark:bg-white rounded-sm shadow-xl z-[-1]" />
            </div>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 md:flex-row">
        <div className="relative flex w-full rounded-xl bg-surface md:hidden">
          <div
            className="absolute bottom-1 top-1 left-1 w-[calc(33.333%-2.6px)] rounded-lg bg-surface-hover border border-border hover:bor-bord transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${activeTab * 100}%)` }}
          />

          {/* Tab Buttons */}
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`relative z-10 flex-1 tracking-tight py-3 text-xs font-semibold transition-colors ${
                activeTab === index ? "text-primary font-bold" : "text-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT AREA
        Mobile: Only shows the active tab block.
        Desktop: Shows all blocks side-by-side (md:flex).
      */}
        <div className="flex w-full flex-col gap-4 xl:hidden">
          <ActiveTab />
        </div>

        <div className="hidden w-full flex-col gap-4 xl:flex xl:flex-row xl:justify-center">
          {tabs.map((tab) => (
            <div key={tab.id} className="min-w-0 xl:w-auto">
              <tab.Component />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
