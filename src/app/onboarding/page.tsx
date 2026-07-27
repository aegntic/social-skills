import { getSessionUser } from "@/lib/auth";
import { hasAccounts } from "@/lib/store";
import { OnboardingForm } from "@/components/OnboardingForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Set up your accounts",
  description: "Connect the social platforms you publish to.",
  robots: { index: false, follow: false },
};

export default async function OnboardingPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const done = await hasAccounts(user.id);
  if (done) redirect("/dashboard");
  return <OnboardingForm name={user.name} />;
}
