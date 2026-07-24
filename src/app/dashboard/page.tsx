import { DashboardApp } from "@/components/DashboardApp";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
  description: "Compose, schedule, and review multi-platform posts.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return <DashboardApp />;
}
