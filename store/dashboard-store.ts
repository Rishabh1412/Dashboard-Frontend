"use client";

import { initialTransactions } from "@/data/mockData";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Transaction, UserRole } from "@/types/transactions";

type DashboardStore = {
  role: UserRole;
  transactions: Transaction[];
  setRole: (role: UserRole) => void;
  addTransaction: (transaction: Transaction) => void;
  editTransaction: (
    id: Transaction["id"],
    updatedData: Partial<Omit<Transaction, "id">>
  ) => void;
  deleteTransaction: (id: Transaction["id"]) => void;
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      role: "admin",
      transactions: initialTransactions,
      setRole: (role) => set({ role }),
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
      editTransaction: (id, updatedData) =>
        set((state) => {
          const transactionExists = state.transactions.some(
            (transaction) => transaction.id === id
          );

          if (!transactionExists) {
            return state;
          }

          return {
            transactions: state.transactions.map((transaction) =>
              transaction.id === id
                ? { ...transaction, ...updatedData }
                : transaction
            ),
          };
        }),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== id
          ),
        })),
    }),
    {
      name: "dashboard-rbac-store",
    }
  )
);
