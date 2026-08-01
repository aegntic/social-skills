import { redirect } from "next/navigation";

// /compose is referenced externally (docs, social posts, old links).
// The real entry point is the dashboard's compose tab.
export default function ComposePage() {
  redirect("/dashboard?tab=compose");
}
