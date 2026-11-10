import { SignOutButton } from "@clerk/nextjs";
import { ArrowLeft, Link2 } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUserLinks } from "../../../data/shortened-links";

export default function DashboardPage() {
  return (
    <Suspense fallback={<p role="status">Loading dashboard...</p>}>
      <AuthenticatedDashboard />
    </Suspense>
  );
}

async function AuthenticatedDashboard() {
  const links = await getCurrentUserLinks();

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
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Your workspace
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Your links
            </h1>
            <p className="mt-2 text-muted-foreground">
              View the shortened links you have created.
            </p>
          </div>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {links.length} {links.length === 1 ? "link" : "links"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All links</CardTitle>
            <CardDescription>
              Your most recently created links appear first.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {links.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                You haven&apos;t created any links yet.
              </p>
            ) : (
              <ul
                aria-label="Your shortened links"
                className="divide-y divide-border"
              >
                {links.map((link) => (
                  <li
                    key={link.shortCode}
                    className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-sm font-semibold text-foreground">
                        /{link.shortCode}
                      </p>
                      <a
                        className="mt-1 block break-all text-sm text-muted-foreground underline-offset-4 hover:underline"
                        href={link.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.url}
                      </a>
                    </div>
                    <time
                      className="shrink-0 text-xs text-muted-foreground"
                      dateTime={link.createdAt.toISOString()}
                    >
                      Created{" "}
                      {new Intl.DateTimeFormat(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "UTC",
                      }).format(link.createdAt)}{" "}
                      UTC
                    </time>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
