"use client";

import React, { useEffect, useState } from "react";
import {
  MdAdd,
  MdClose,
  MdDeleteOutline,
  MdEditSquare,
  MdKeyboardArrowDown,
  MdOutlineTune,
  MdUnfoldMore,
} from "react-icons/md";
import { useDashboardStore } from "@/store/dashboard-store";
import type {
  Transaction,
  TransactionStatus,
  UserRole,
} from "@/types/transactions";
import { safeArray, safeNumber, safeText } from "./dashboardUtils";

type StatusFilter = "All Statuses" | TransactionStatus;
type CategoryFilter = "All Categories" | string;
type SortOption =
  | "Newest First"
  | "Oldest First"
  | "Amount High"
  | "Amount Low"
  | "Name A-Z";

type TransactionDraft = {
  name: string;
  amount: string;
  category: string;
  date: string;
  status: TransactionStatus;
  note: string;
};

type TransactionModalProps = {
  mode: "add" | "edit";
  draft: TransactionDraft;
  onChange: (
    field: keyof TransactionDraft,
    value: TransactionDraft[keyof TransactionDraft]
  ) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const STATUS_OPTIONS: TransactionStatus[] = ["Completed", "Pending", "Failed"];
const SORT_OPTIONS: SortOption[] = [
  "Newest First",
  "Oldest First",
  "Amount High",
  "Amount Low",
  "Name A-Z",
];

const emptyDraft: TransactionDraft = {
  name: "",
  amount: "",
  category: "",
  date: "",
  status: "Pending",
  note: "",
};

const toDraft = (transaction: Transaction): TransactionDraft => ({
  name: transaction.name,
  amount: transaction.amount.toString(),
  category: transaction.category,
  date: transaction.date,
  status: transaction.status,
  note: transaction.note ?? "",
});

const formatDate = (date: string) => {
  if (!date) return "No date";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const createTransactionId = () =>
  globalThis.crypto?.randomUUID() ??
  `txn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const normalizeRole = (role: UserRole | string | undefined): UserRole =>
  role === "viewer" ? "viewer" : "admin";

const normalizeTransaction = (
  transaction: Partial<Transaction> | null | undefined,
  index: number
): Transaction => ({
  id: safeText(transaction?.id, `txn-fallback-${index}`),
  name: safeText(transaction?.name, "Untitled Transaction"),
  amount: safeNumber(transaction?.amount),
  category: safeText(transaction?.category, "Uncategorized"),
  date: typeof transaction?.date === "string" ? transaction.date : "",
  status: STATUS_OPTIONS.includes(transaction?.status as TransactionStatus)
    ? (transaction?.status as TransactionStatus)
    : "Pending",
  note: typeof transaction?.note === "string" ? transaction.note : "",
});

const StatusBadge = ({ status }: { status: TransactionStatus }) => {
  const styles: Record<TransactionStatus, string> = {
    Completed: "bg-transparent border-success text-success",
    Pending: "bg-transparent border-warning text-warning",
    Failed: "bg-transparent border-danger text-danger",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
      tone === "danger"
        ? "border-danger/25 text-danger hover:bg-danger/8"
        : "border-border bg-background text-primary hover:border-border-strong hover:bg-surface-hover"
    }`}
    aria-label={label}
    title={label}
  >
    <Icon className="text-base" />
  </button>
);

function TransactionModal({
  mode,
  draft,
  onChange,
  onClose,
  onSubmit,
}: TransactionModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 p-4 backdrop-blur-[3px]">
      <div className="w-full max-w-lg rounded-[1.75rem] border border-border bg-surface p-5 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)] dark:shadow-[0_32px_90px_-36px_rgba(0,0,0,0.72)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-content">
              {mode === "add" ? "Add Transaction" : "Edit Transaction"}
            </h2>
            <p className="mt-1 text-xs text-content-muted">
              {mode === "add"
                ? "Create a new transaction entry for the dashboard."
                : "Update the selected transaction details."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-content-muted transition-colors hover:border-border-strong hover:text-content"
            aria-label="Close transaction form"
          >
            <MdClose className="text-lg" />
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-content-muted">
                Name
              </span>
              <input
                required
                value={draft.name}
                onChange={(event) => onChange("name", event.target.value)}
                placeholder="Payroll deposit"
                className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-content outline-none transition-colors focus:border-primary"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-content-muted">
                Amount
              </span>
              <input
                required
                min="0"
                step="0.01"
                type="number"
                value={draft.amount}
                onChange={(event) => onChange("amount", event.target.value)}
                placeholder="250.00"
                className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-content outline-none transition-colors focus:border-primary"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-content-muted">
                Category
              </span>
              <input
                required
                value={draft.category}
                onChange={(event) => onChange("category", event.target.value)}
                placeholder="Utilities"
                className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-content outline-none transition-colors focus:border-primary"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-content-muted">
                Date
              </span>
              <input
                required
                type="date"
                value={draft.date}
                onChange={(event) => onChange("date", event.target.value)}
                className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-content outline-none transition-colors focus:border-primary"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-content-muted">
              Status
            </span>
            <select
              value={draft.status}
              onChange={(event) =>
                onChange("status", event.target.value as TransactionStatus)
              }
              className="rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-content outline-none transition-colors focus:border-primary"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-content-muted">
              Note
            </span>
            <textarea
              rows={4}
              value={draft.note}
              onChange={(event) => onChange("note", event.target.value)}
              placeholder="Optional context for this transaction"
              className="resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm text-content outline-none transition-colors focus:border-primary"
            />
          </label>

          <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border px-5 py-3 text-sm font-bold text-content-muted transition-colors hover:border-border-strong hover:text-content"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {mode === "add" ? "Save Transaction" : "Update Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const EmptyState = ({ role, onAdd }: { role: UserRole; onAdd: () => void }) => (
  <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border-strong bg-background px-6 py-14 text-center">
    <div className="mb-3 rounded-full bg-light-green px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-primary">
      No Transactions
    </div>
    <h3 className="text-lg font-bold text-wrap tracking-tight text-content">
      The transaction list is currently empty.
    </h3>
    <p className="mt-2 max-w-md text-sm text-content-muted">
      {role === "admin"
        ? "Add a new transaction to repopulate the dashboard instantly for both modes."
        : "Viewer mode is read-only. Switch to admin mode if you need to create a new record."}
    </p>
    {role === "admin" ? (
      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        <MdAdd className="text-lg" />
        Add Transaction
      </button>
    ) : null}
  </div>
);

const RecentTransactions = () => {
  const storedRole = useDashboardStore((state) => state.role);
  const storedTransactions = useDashboardStore((state) => state.transactions);
  const addTransaction = useDashboardStore((state) => state.addTransaction);
  const editTransaction = useDashboardStore((state) => state.editTransaction);
  const deleteTransaction = useDashboardStore((state) => state.deleteTransaction);

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All Statuses");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("All Categories");
  const [sortOption, setSortOption] = useState<SortOption>("Newest First");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<TransactionDraft>(emptyDraft);

  const role = normalizeRole(storedRole);
  const transactions = safeArray(storedTransactions).map(normalizeTransaction);
  const isAdmin = role === "admin";
  const modalMode = editingId ? "edit" : "add";
  const categoryOptions: CategoryFilter[] = [
    "All Categories",
    ...Array.from(new Set(transactions.map((transaction) => transaction.category))),
  ];
  const filteredTransactions = transactions
    .filter((transaction) =>
      statusFilter === "All Statuses"
        ? true
        : transaction.status === statusFilter
    )
    .filter((transaction) =>
      categoryFilter === "All Categories"
        ? true
        : transaction.category === categoryFilter
    )
    .sort((left, right) => {
      switch (sortOption) {
        case "Oldest First":
          return left.date.localeCompare(right.date);
        case "Amount High":
          return right.amount - left.amount;
        case "Amount Low":
          return left.amount - right.amount;
        case "Name A-Z":
          return left.name.localeCompare(right.name);
        case "Newest First":
        default:
          return right.date.localeCompare(left.date);
      }
    });
  const hasActiveFilters =
    statusFilter !== "All Statuses" ||
    categoryFilter !== "All Categories" ||
    sortOption !== "Newest First";

  useEffect(() => {
    const unsubscribe = useDashboardStore.subscribe((state, previousState) => {
      if (state.role === "viewer" && previousState.role !== "viewer") {
        setIsModalOpen(false);
        setEditingId(null);
        setDraft(emptyDraft);
      }
    });

    return unsubscribe;
  }, []);

  const handleDraftChange = (
    field: keyof TransactionDraft,
    value: TransactionDraft[keyof TransactionDraft]
  ) => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
  };

  const openAddModal = () => {
    if (!isAdmin) return;

    setEditingId(null);
    setDraft(emptyDraft);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction: Transaction) => {
    if (!isAdmin) return;

    setEditingId(transaction.id);
    setDraft(toDraft(transaction));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setDraft(emptyDraft);
  };

  const resetFilters = () => {
    setStatusFilter("All Statuses");
    setCategoryFilter("All Categories");
    setSortOption("Newest First");
  };

  const handleDeleteTransaction = (id: string) => {
    if (!isAdmin) return;

    const shouldDelete = window.confirm(
      "Delete this transaction from the dashboard?"
    );

    if (!shouldDelete) return;

    deleteTransaction(id);

    if (editingId === id) {
      closeModal();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAdmin) return;

    const amount = Number.parseFloat(draft.amount);

    if (!Number.isFinite(amount)) {
      return;
    }

    const payload: Omit<Transaction, "id"> = {
      name: draft.name.trim(),
      amount,
      category: draft.category.trim(),
      date: draft.date,
      status: draft.status,
      note: draft.note.trim(),
    };

    if (editingId) {
      editTransaction(editingId, payload);
    } else {
      addTransaction({
        id: createTransactionId(),
        ...payload,
      });
    }

    closeModal();
  };

  return (
    <>
      <div className="md:max-w-120 w-full overflow-hidden rounded-3xl border border-border bg-white p-4 dark:bg-surface">
        <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-bold tracking-tight text-nowrap text-content">
              Recent Transactions
            </h2>
            <p className="mt-1 text-xxs font-semibold uppercase tracking-tighter text-content-muted">
              {isAdmin
                ? "Admin can create, update, and remove records."
                : "Viewer mode keeps this ledger read-only."}
            </p>
          </div>

          <div className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:min-w-[18rem]">
            <button
              type="button"
              onClick={() => setIsFilterPanelOpen((open) => !open)}
              className={`flex cursor-pointer items-center justify-center rounded-lg border p-1.5 transition-colors dark:bg-background ${
                isFilterPanelOpen || hasActiveFilters
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-transparent text-primary hover:border-border-strong"
              }`}
              aria-label="Transaction filters"
              title="Transaction filters"
            >
              <MdOutlineTune className="text-base" />
            </button>

            {isAdmin ? (
              <button
                type="button"
                onClick={openAddModal}
                className="inline-flex items-center gap-0.5 rounded-full bg-primary px-2 py-2 text-[11px] leading-0 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <MdAdd className="text-base" />
                Add Transaction
              </button>
            ) : null}
          </div>
        </div>

        {isFilterPanelOpen ? (
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-border bg-background p-3">
            <div className="grid gap-3 md:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-content-muted">
                  Status
                </span>
                <div className="relative">
                  <select
                    className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-transparent py-2.5 pl-3 pr-8 text-xs font-semibold tracking-tight text-primary outline-none transition-colors hover:border-border-strong focus:border-primary"
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value as StatusFilter)
                    }
                  >
                    <option value="All Statuses">All Statuses</option>
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <MdKeyboardArrowDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-content-muted" />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-content-muted">
                  Category
                </span>
                <div className="relative">
                  <select
                    className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-transparent py-2.5 pl-3 pr-8 text-xs font-semibold tracking-tight text-primary outline-none transition-colors hover:border-border-strong focus:border-primary"
                    value={categoryFilter}
                    onChange={(event) =>
                      setCategoryFilter(event.target.value as CategoryFilter)
                    }
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <MdKeyboardArrowDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-content-muted" />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-content-muted">
                  Sort
                </span>
                <div className="relative">
                  <select
                    className="w-full cursor-pointer appearance-none rounded-xl border border-border bg-transparent py-2.5 pl-3 pr-8 text-xs font-semibold tracking-tight text-primary outline-none transition-colors hover:border-border-strong focus:border-primary"
                    value={sortOption}
                    onChange={(event) =>
                      setSortOption(event.target.value as SortOption)
                    }
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <MdKeyboardArrowDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-content-muted" />
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold tracking-tight text-content-muted">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-content-muted transition-colors hover:border-border-strong hover:text-content"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : null}

        {filteredTransactions.length === 0 ? (
          <EmptyState role={role} onAdd={openAddModal} />
        ) : (
          <>
            <div className="hidden max-h-80 overflow-x-auto overflow-y-auto lg:block">
              <table className="w-full border-collapse text-left ">
                <thead>
                  <tr className="bg-surface-hover text-xxs font-semibold tracking-tighter text-content-muted">
                    <th className="rounded-l-lg px-3 py-2 font-medium">
                      <div className="flex items-center gap-1 text-nowrap transition-colors hover:text-content">
                        Transaction Name
                        <MdUnfoldMore className="text-xs opacity-70" />
                      </div>
                    </th>
                    <th className="px-3 py-2 font-medium">
                      <div className="flex items-center gap-1 text-nowrap transition-colors hover:text-content">
                        Date
                        <MdUnfoldMore className="text-xs opacity-70" />
                      </div>
                    </th>
                    <th className="px-3 py-2 font-medium">
                      <div className="flex items-center gap-1 text-nowrap transition-colors hover:text-content">
                        Amount
                        <MdUnfoldMore className="text-xs opacity-70" />
                      </div>
                    </th>
                    <th className="px-3 py-2 font-medium">
                      <div className="flex items-center gap-1 text-nowrap transition-colors hover:text-content">
                        Note
                        <MdUnfoldMore className="text-xs opacity-70" />
                      </div>
                    </th>
                    <th className="rounded-r-lg px-3 py-2 font-medium">
                      <div className="flex items-center gap-1 text-nowrap transition-colors hover:text-content">
                        Status
                        <MdUnfoldMore className="text-xs opacity-70" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="group transition-colors hover:bg-gray-100/80 dark:hover:bg-white/[0.02]"
                    >
                      <td className="px-3 py-2.5">
                        <p className="text-[11px] font-bold text-content">
                          {safeText(transaction.name, "Untitled Transaction")}
                        </p>
                        <p className="mt-0.5 text-[10px] text-content-muted">
                          {safeText(transaction.category, "Uncategorized")}
                        </p>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="text-xxs text-nowrap font-bold text-content">
                          {formatDate(transaction.date)}
                        </p>
                      </td>
                      <td className="px-3 py-2.5 text-xs font-bold text-content">
                        ₹{safeNumber(transaction.amount).toFixed(2)}
                      </td>
                      <td className="max-w-[170px] px-3 py-2.5 text-content-muted">
                        <p className="truncate text-xs tracking-tight">
                          {safeText(transaction.note, "No note provided")}
                        </p>
                      </td>
                      <td className="w-xs px-3 py-2.5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="origin-left scale-90">
                            <StatusBadge status={transaction.status} />
                          </div>

                          {isAdmin ? (
                            <div className="flex items-center gap-2">
                              <ActionButton
                                icon={MdEditSquare}
                                label={`Edit ${transaction.name}`}
                                onClick={() => openEditModal(transaction)}
                              />
                              <ActionButton
                                icon={MdDeleteOutline}
                                label={`Delete ${transaction.name}`}
                                onClick={() =>
                                  handleDeleteTransaction(transaction.id)
                                }
                                tone="danger"
                              />
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 lg:hidden">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-transparent p-4 transition-colors hover:border-border-strong hover:bg-surface-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-content">
                        {safeText(transaction.name, "Untitled Transaction")}
                      </p>
                      <p className="mt-0.5 text-[10px] text-content-muted">
                        {safeText(transaction.category, "Uncategorized")}
                      </p>
                    </div>
                    <p className="whitespace-nowrap text-xs font-bold text-content">
                      ₹{safeNumber(transaction.amount).toFixed(2)}
                    </p>
                  </div>

                  <p className="line-clamp-2 text-[11px] text-content-muted">
                    {safeText(transaction.note, "No note provided")}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                    <div className="text-[10px] font-medium text-content-muted">
                      {formatDate(transaction.date)}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="origin-right scale-90">
                        <StatusBadge status={transaction.status} />
                      </div>

                      {isAdmin ? (
                        <div className="flex items-center gap-2">
                          <ActionButton
                            icon={MdEditSquare}
                            label={`Edit ${transaction.name}`}
                            onClick={() => openEditModal(transaction)}
                          />
                          <ActionButton
                            icon={MdDeleteOutline}
                            label={`Delete ${transaction.name}`}
                            onClick={() =>
                              handleDeleteTransaction(transaction.id)
                            }
                            tone="danger"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {isAdmin && isModalOpen ? (
        <TransactionModal
          mode={modalMode}
          draft={draft}
          onChange={handleDraftChange}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      ) : null}
    </>
  );
};

export default RecentTransactions;
