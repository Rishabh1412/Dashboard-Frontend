import Navbar from "@/components/Navbar";
import RoleToggle from "@/components/RoleToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navbar />

      <main className="flex-1 w-full overflow-y-auto pb-24 md:pb-8">{children}</main>
      <RoleToggle />
    </div>
  );
}
