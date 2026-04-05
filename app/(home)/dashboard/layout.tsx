import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your transactions, track cash flow, and monitor your financial health.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer/>
    </>
  );
}