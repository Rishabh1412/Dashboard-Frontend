import type { Transaction } from "@/types/transactions";

export type OverviewCardIconKey = "income" | "expense" | "savings";
export type QuickActionIconKey =
  | "top-up"
  | "transfer"
  | "request"
  | "history";
export type NavbarIconKey =
  | "dashboard"
  | "transactions"
  | "cards"
  | "savings"
  | "investments"
  | "settings";
export type SavingsPlanIconKey = "emergency" | "vacation" | "home";
export type CashflowPeriod = "This Year" | "Last Year" | "Last 6 Months";
export type StatisticTimeFilter = "This Month" | "Last Month" | "This Year";
export type StatisticTab = "Income" | "Expense";

export type CashflowDatum = {
  name: string;
  income: number;
  expense: number;
};

export type StatisticBreakdownItem = {
  id: number;
  category: string;
  percentage: number;
  amount: number;
  color: string;
  textColor: string;
};

export type StatisticBreakdownSection = {
  total: number;
  items: StatisticBreakdownItem[];
};

export type BillingItem = {
  id: number;
  company: string;
  description: string;
  date: string;
  amount: string;
  initial: string;
};

export type BillingGroup = {
  timeframe: string;
  items: BillingItem[];
};

export type SavingsPlanData = {
  id: string;
  iconKey: SavingsPlanIconKey;
  title: string;
  current: number;
  target: number;
  percentage: number;
};

export type OverviewCardData = {
  id: string;
  title: string;
  amount: number;
  percentage: number;
  isPositive: boolean;
  iconKey: OverviewCardIconKey;
};

export type QuickActionData = {
  name: string;
  iconKey: QuickActionIconKey;
};

export type NavbarLinkData = {
  name: string;
  href: string;
  iconKey: NavbarIconKey;
};

export const user = {
  name: "Rishabh Kartik",
  role: "admin",
  balance: 562000,
};

export const stats = {
  income: 78000,
  expense: 43000,
  savings: 56000,
};

export const overviewCards: OverviewCardData[] = [
  {
    id: "income",
    title: "Total Income",
    amount: 78000,
    percentage: 1.78,
    isPositive: true,
    iconKey: "income",
  },
  {
    id: "expense",
    title: "Total Expense",
    amount: 43000,
    percentage: -1.78,
    isPositive: false,
    iconKey: "expense",
  },
  {
    id: "savings",
    title: "Total Savings",
    amount: 56000,
    percentage: 1.24,
    isPositive: true,
    iconKey: "savings",
  },
];

export const quickActions: QuickActionData[] = [
  { name: "Top Up", iconKey: "top-up" },
  { name: "Transfer", iconKey: "transfer" },
  { name: "Request", iconKey: "request" },
  { name: "History", iconKey: "history" },
];

export const navbarLinks: NavbarLinkData[] = [
  { name: "Dashboard", href: "/dashboard", iconKey: "dashboard" },
  { name: "Transactions", href: "/transactions", iconKey: "transactions" },
  { name: "Cards", href: "/cards", iconKey: "cards" },
  { name: "Savings Plans", href: "/savings-plans", iconKey: "savings" },
  { name: "Investments", href: "/investments", iconKey: "investments" },
  { name: "Settings", href: "/settings", iconKey: "settings" },
];

export const cashflowSummary = {
  totalBalance: 562000,
  legend: [
    { label: "Income", color: "#134933" },
    { label: "Expense", color: "#b4f0a4" },
  ],
};

export const cashflowChartData: Record<CashflowPeriod, CashflowDatum[]> = {
  "This Year": [
    { name: "Jan", income: 6000, expense: -4500 },
    { name: "Feb", income: 3800, expense: -6500 },
    { name: "Mar", income: 5000, expense: -5500 },
    { name: "Apr", income: 7200, expense: -2800 },
    { name: "May", income: 4500, expense: -4800 },
    { name: "Jun", income: 6000, expense: -4000 },
    { name: "Jul", income: 3000, expense: -5500 },
    { name: "Aug", income: 4200, expense: -4200 },
    { name: "Sep", income: 7000, expense: -5800 },
    { name: "Oct", income: 5200, expense: -4000 },
    { name: "Nov", income: 3200, expense: -6200 },
    { name: "Dec", income: 4500, expense: -3500 },
  ],
  "Last Year": [
    { name: "Jan", income: 5000, expense: -3500 },
    { name: "Feb", income: 4800, expense: -5500 },
    { name: "Mar", income: 6000, expense: -4500 },
    { name: "Apr", income: 6200, expense: -3800 },
    { name: "May", income: 5500, expense: -3800 },
    { name: "Jun", income: 5000, expense: -5000 },
    { name: "Jul", income: 4000, expense: -4500 },
    { name: "Aug", income: 5200, expense: -3200 },
    { name: "Sep", income: 6000, expense: -4800 },
    { name: "Oct", income: 4200, expense: -5000 },
    { name: "Nov", income: 4200, expense: -5200 },
    { name: "Dec", income: 5500, expense: -2500 },
  ],
  "Last 6 Months": [
    { name: "Jul", income: 3000, expense: -5500 },
    { name: "Aug", income: 4200, expense: -4200 },
    { name: "Sep", income: 7000, expense: -5800 },
    { name: "Oct", income: 5200, expense: -4000 },
    { name: "Nov", income: 3200, expense: -6200 },
    { name: "Dec", income: 4500, expense: -3500 },
  ],
};

export const statisticsData: Record<
  StatisticTimeFilter,
  Record<StatisticTab, StatisticBreakdownSection>
> = {
  "This Month": {
    Income: {
      total: 4800,
      items: [
        {
          id: 1,
          category: "Salary",
          percentage: 70,
          amount: 3360,
          color: "#134933",
          textColor: "text-white",
        },
        {
          id: 2,
          category: "Freelance",
          percentage: 20,
          amount: 960,
          color: "#b4f0a4",
          textColor: "text-gray-900",
        },
        {
          id: 3,
          category: "Dividends",
          percentage: 10,
          amount: 480,
          color: "#EEF6F0",
          textColor: "text-gray-800",
        },
      ],
    },
    Expense: {
      total: 3500,
      items: [
        {
          id: 1,
          category: "Rent & Living",
          percentage: 60,
          amount: 2100,
          color: "#134933",
          textColor: "text-white",
        },
        {
          id: 2,
          category: "Investment",
          percentage: 15,
          amount: 525,
          color: "#b4f0a4",
          textColor: "text-gray-900",
        },
        {
          id: 3,
          category: "Education",
          percentage: 12,
          amount: 420,
          color: "#EEF6F0",
          textColor: "text-gray-800",
        },
        {
          id: 4,
          category: "Food & Drink",
          percentage: 8,
          amount: 280,
          color: "#E5E7EB",
          textColor: "text-gray-800",
        },
        {
          id: 5,
          category: "Entertainment",
          percentage: 5,
          amount: 175,
          color: "#9CA3AF",
          textColor: "text-white",
        },
      ],
    },
  },
  "Last Month": {
    Income: {
      total: 4200,
      items: [
        {
          id: 1,
          category: "Salary",
          percentage: 80,
          amount: 3360,
          color: "#134933",
          textColor: "text-white",
        },
        {
          id: 2,
          category: "Freelance",
          percentage: 20,
          amount: 840,
          color: "#b4f0a4",
          textColor: "text-gray-900",
        },
      ],
    },
    Expense: {
      total: 3900,
      items: [
        {
          id: 1,
          category: "Rent & Living",
          percentage: 55,
          amount: 2145,
          color: "#134933",
          textColor: "text-white",
        },
        {
          id: 2,
          category: "Investment",
          percentage: 20,
          amount: 780,
          color: "#b4f0a4",
          textColor: "text-gray-900",
        },
        {
          id: 3,
          category: "Travel",
          percentage: 15,
          amount: 585,
          color: "#EEF6F0",
          textColor: "text-gray-800",
        },
        {
          id: 4,
          category: "Food & Drink",
          percentage: 10,
          amount: 390,
          color: "#E5E7EB",
          textColor: "text-gray-800",
        },
      ],
    },
  },
  "This Year": {
    Income: {
      total: 56000,
      items: [
        {
          id: 1,
          category: "Salary",
          percentage: 75,
          amount: 42000,
          color: "#134933",
          textColor: "text-white",
        },
        {
          id: 2,
          category: "Freelance",
          percentage: 15,
          amount: 8400,
          color: "#b4f0a4",
          textColor: "text-gray-900",
        },
        {
          id: 3,
          category: "Investments",
          percentage: 10,
          amount: 5600,
          color: "#EEF6F0",
          textColor: "text-gray-800",
        },
      ],
    },
    Expense: {
      total: 41000,
      items: [
        {
          id: 1,
          category: "Rent & Living",
          percentage: 50,
          amount: 20500,
          color: "#134933",
          textColor: "text-white",
        },
        {
          id: 2,
          category: "Investment",
          percentage: 25,
          amount: 10250,
          color: "#b4f0a4",
          textColor: "text-gray-900",
        },
        {
          id: 3,
          category: "Education",
          percentage: 15,
          amount: 6150,
          color: "#EEF6F0",
          textColor: "text-gray-800",
        },
        {
          id: 4,
          category: "Food & Drink",
          percentage: 10,
          amount: 4100,
          color: "#E5E7EB",
          textColor: "text-gray-800",
        },
      ],
    },
  },
};

export const upcomingBillingGroups: BillingGroup[] = [
  {
    timeframe: "This Week",
    items: [
      {
        id: 1,
        company: "Figma",
        description: "Professional Plan renewal",
        date: "Tomorrow",
        amount: "₹15.00",
        initial: "F",
      },
      {
        id: 2,
        company: "AWS Cloud",
        description: "Server hosting invoice",
        date: "In 3 days",
        amount: "₹142.50",
        initial: "A",
      },
      {
        id: 3,
        company: "Spotify",
        description: "Family Premium subscription",
        date: "In 5 days",
        amount: "₹16.99",
        initial: "S",
      },
    ],
  },
  {
    timeframe: "Next Week",
    items: [
      {
        id: 4,
        company: "Netflix",
        description: "Standard Plan renewal",
        date: "Aug 22",
        amount: "₹15.49",
        initial: "N",
      },
      {
        id: 5,
        company: "Adobe",
        description: "Creative Cloud yearly",
        date: "Aug 25",
        amount: "₹54.99",
        initial: "A",
      },
    ],
  },
];

export const savingsPlanSummary = {
  totalSavings: 84500,
};

export const savingsPlans: SavingsPlanData[] = [
  {
    id: "emergency-fund",
    iconKey: "emergency",
    title: "Emergency Fund",
    current: 5000,
    target: 10000,
    percentage: 50,
  },
  {
    id: "vacation-fund",
    iconKey: "vacation",
    title: "Vacation Fund",
    current: 3000,
    target: 5000,
    percentage: 60,
  },
  {
    id: "home-down-payment",
    iconKey: "home",
    title: "Home Down Payment",
    current: 7250,
    target: 20000,
    percentage: 36.25,
  },
];

export const dailyLimit = {
  spent: 2500,
  total: 20000,
};

export const initialTransactions: Transaction[] = [
  {
    id: "txn-1",
    name: "Electricity Bill",
    category: "Payments",
    date: "2028-03-01",
    amount: 295.81,
    note: "Payment for monthly electricity bill",
    status: "Failed",
  },
  {
    id: "txn-2",
    name: "Weekly Groceries",
    category: "Shopping",
    date: "2028-03-04",
    amount: 204.07,
    note: "Groceries shopping at local supermarket",
    status: "Completed",
  },
  {
    id: "txn-3",
    name: "Movie Night",
    category: "Entertainment",
    date: "2028-02-27",
    amount: 97.84,
    note: "Tickets for movies and snacks",
    status: "Pending",
  },
  {
    id: "txn-4",
    name: "Medical Check-up",
    category: "Healthcare",
    date: "2028-02-07",
    amount: 323.33,
    note: "Routine health check-up and medications",
    status: "Pending",
  },
  {
    id: "txn-5",
    name: "Dinner at Italian Restaurant",
    category: "Dining Out",
    date: "2028-02-11",
    amount: 226.25,
    note: "Dining out with family at a local Italian restaurant",
    status: "Pending",
  },
];