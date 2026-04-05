"use client";

import React from "react";
import { useDashboardStore } from "@/store/dashboard-store";
import type { UserRole } from "@/types/transactions";
import { MdAdminPanelSettings, MdFace } from "react-icons/md";

export default function RoleToggle() {
  const role = useDashboardStore((state) => state.role);
  const setRole = useDashboardStore((state) => state.setRole);

  const nextRole: UserRole = role === "admin" ? "viewer" : "admin";
  const isAdmin = role === "admin";

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      
      {/* --- Tooltip --- */}
      <div className="pointer-events-none absolute bottom-full right-0 mb-3 w-max translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex flex-col items-end rounded-xl bg-gray-900 px-4 py-2.5 shadow-xl dark:bg-white">
          <p className="text-xs font-bold text-white dark:text-gray-900">
            Current: {isAdmin ? "Admin Mode" : "Viewer Mode"}
          </p>
          <p className="mt-0.5 text-[10px] text-gray-400 dark:text-gray-500">
            Click to switch to {isAdmin ? "Viewer" : "Admin"}
          </p>
        </div>
        {/* Tooltip Arrow */}
        <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-gray-900 dark:bg-white" />
      </div>

      <button
        type="button"
        onClick={() => setRole(nextRole)}
        aria-label={`Switch to ${nextRole} mode`}
        // Added a custom cubic-bezier for a "springy/bouncy" effect
        className={`relative flex items-center gap-3 rounded-full border p-1.5 pr-5 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 active:scale-95 shadow-lg ${
          isAdmin
            ? "border-border hover:border-border-strong bg-primary text-content-inverse"
            : "border-border bg-surface text-content hover:border-border-strong"
        }`}
      >
        {/* Icon Badge Container */}
        <div
          className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isAdmin
              ? "bg-surface rotate-[360deg]" // Spins a full circle when switching to Admin
              : "bg-content rotate-0"
          }`}
        >
          {/* Admin Icon */}
          <MdAdminPanelSettings 
            className={`absolute text-xl text-primary transition-all duration-500 ${
              isAdmin 
                ? "scale-100 opacity-100 rotate-0" 
                : "scale-50 opacity-0 -rotate-180"
            }`} 
          />
          
          {/* Viewer Icon */}
          <MdFace 
            className={`absolute text-xl text-content-inverse transition-all duration-500 ${
              !isAdmin 
                ? "scale-100 opacity-100 rotate-0" 
                : "scale-50 opacity-0 rotate-180"
            }`} 
          />
        </div>

        {/* Label Container (Handles the width change smoothly) */}
        <div className="relative grid transition-all duration-500">
          <span 
            className={`text-sm font-bold tracking-tight transition-all duration-300 col-start-1 row-start-1 ${
              isAdmin ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            Admin
          </span>
          <span 
            className={`text-sm font-bold tracking-tight transition-all duration-300 col-start-1 row-start-1 ${
              !isAdmin ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            Viewer
          </span>
        </div>
      </button>
    </div>
  );
}