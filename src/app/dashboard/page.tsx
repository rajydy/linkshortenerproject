import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<p role="status">Loading dashboard...</p>}>
      <AuthenticatedDashboard />
    </Suspense>
  );
}

async function AuthenticatedDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return <h1>Dashboard</h1>;
}
