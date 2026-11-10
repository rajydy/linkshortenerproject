import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Link2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/70">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2.5 rounded-md text-base font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Linkshortener dashboard"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-lime-300 text-slate-950">
              <Link2 aria-hidden="true" className="size-5" />
            </span>
            <span>linkshortener</span>
          </a>
          <SignOutButton redirectUrl="/">
            <Button variant="outline">
              <ArrowLeft aria-hidden="true" />
              Sign out
            </Button>
          </SignOutButton>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8 lg:px-12">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
      </main>
    </div>
  );
}
