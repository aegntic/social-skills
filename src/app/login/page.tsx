import { SiteFooter, SiteHeader } from "@/components/Shell";
import { AuthForm } from "@/components/AuthForm";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Log in",
  description: "Log in to Social Skills and publish across your social accounts.",
};

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");
  return (
    <>
      <SiteHeader />
      <main className="hero-grid flex-1 py-14">
        <AuthForm mode="login" />
      </main>
      <SiteFooter />
    </>
  );
}
