"use client";

import {
  navbarLinks,
  type NavbarIconKey,
  type NavbarLinkData,
} from "@/data/mockData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

// Added MdMenu and MdClose for the hamburger toggle
import {
  MdOutlineSpaceDashboard,
  MdOutlineSwapHoriz,
  MdOutlineCreditCard,
  MdOutlineSavings,
  MdOutlineTrendingUp,
  MdOutlineSettings,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { safeArray, safeText } from "./dashboardUtils";

const iconMap: Record<NavbarIconKey, typeof MdOutlineSpaceDashboard> = {
  dashboard: MdOutlineSpaceDashboard,
  transactions: MdOutlineSwapHoriz,
  cards: MdOutlineCreditCard,
  savings: MdOutlineSavings,
  investments: MdOutlineTrendingUp,
  settings: MdOutlineSettings,
};

type NavbarProps = {
  links?: NavbarLinkData[] | null;
};

const Navbar = ({ links = navbarLinks }: NavbarProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const safeLinks = safeArray(links).filter(
    (link): link is NavbarLinkData =>
      typeof link?.href === "string" && typeof link?.name === "string"
  );

  return (
    <>
      <header className="glass-panel bg-white/50 dark:bg-black/50 fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-x-0 border-t-0 px-4 md:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-b-[inherit] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.36),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(186,244,157,0.18),transparent_34%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.18),transparent_32%)]"
        />

        <h3 className="relative flex items-center gap-2 font-black tracking-tighter">
          FLOW
        </h3>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative rounded-full text-2xl text-content"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </header>

      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 top-16 z-30 bg-black/20 backdrop-blur-[6px] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      <nav
        className={` md:bg-transparent fixed left-2 right-2 top-16 z-40 flex h-[calc(100vh-5.5rem)] flex-col overflow-hidden rounded-2xl px-4 py-4 transition-transform duration-300 ease-in-out md:static md:left-0 md:right-auto md:top-16 md:h-screen md:w-44 md:translate-x-0 md:overflow-visible md:rounded-none md:border-0 md:px-4 md:py-0 md:shadow-none md:backdrop-blur-none ${
          isMobileMenuOpen ? "translate-x-0 glass-panel" : "-translate-x-[105%]"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.42),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(186,244,157,0.24),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.22),transparent_28%)] md:hidden"
        />

        <div className="relative hidden md:block">
          <h3 className="my-4 flex items-center gap-2 font-black tracking-tighter">
            FLOW
          </h3>
        </div>

        <div className="relative flex flex-col gap-1.5">
          {safeLinks.length > 0 ? (
            safeLinks.map((link) => {
              const Icon = iconMap[link.iconKey] ?? MdOutlineSpaceDashboard;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                >
                  {Icon && <Icon className="text-xl" />}
                  {safeText(link.name, "Untitled")}
                </Link>
              );
            })
          ) : (
            <p className="rounded-2xl border border-dashed border-border-strong px-4 py-3 text-xs text-content-muted">
              Navigation links are unavailable right now.
            </p>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
