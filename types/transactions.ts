export type UserRole = "admin" | "viewer";

export type TransactionStatus = "Completed" | "Pending" | "Failed";

export type Transaction = {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  status: TransactionStatus;
  note?: string;
};

