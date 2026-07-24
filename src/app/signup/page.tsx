import { SiteFooter, SiteHeader } from "@/components/Shell";
import { AuthForm } from "@/components/AuthForm";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign up",
  description: "Create a Social Skills account and start cross-posting in minutes.",
};

export default async function SignupPage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");
  return (
    <>
      <SiteHeader />
      <main className="hero-grid flex-1 py-14">
        <AuthForm mode="signup" />
      </main>
      <SiteFooter />
    </>
  );
}
