import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowDownRight, ArrowRight, Link2, LockKeyhole, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

const features = [
  {
    icon: Link2,
    title: "A simpler link workflow",
    description:
      "A clear, focused starting point for the links you want to share.",
  },
  {
    icon: LockKeyhole,
    title: "Your space stays private",
    description:
      "Sign in with Clerk to access the private dashboard built for your account.",
  },
  {
    icon: Sparkles,
    title: "Easy to get started",
    description:
      "Create an account or sign in from the page, without leaving to a separate flow.",
  },
];

export default function Home() {
  return (
    <div
      id="top"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-background"
    >
      <Suspense fallback={null}>
        <RedirectAuthenticatedUser />
      </Suspense>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(ellipse_at_top,rgba(132,204,22,0.12),transparent_65%)]"
      />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 rounded-md text-base font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Linkshortener home"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-lime-300 text-slate-950">
            <Link2 aria-hidden="true" className="size-5" />
          </span>
          <span>linkshortener</span>
        </a>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1.5 sm:gap-3"
        >
          <a
            href="#features"
            className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
          >
            Features
          </a>
          <ThemeToggle />
          <Suspense>
            <Show when="signed-out">
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex">
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="px-3">
                      Sign in
                    </Button>
                  </SignInButton>
                </span>
                <SignUpButton mode="modal">
                  <Button
                    aria-label="Get started"
                    className="size-9 bg-lime-300 p-0 text-slate-950 hover:bg-lime-200 sm:h-9 sm:w-auto sm:px-4"
                  >
                    <span className="sr-only sm:not-sr-only">Get started</span>
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </SignUpButton>
              </div>
            </Show>
          </Suspense>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-8 lg:px-12">
        <section
          aria-labelledby="hero-title"
          className="grid flex-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28"
        >
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.07] px-3.5 py-1.5 text-xs font-medium text-lime-700 dark:text-lime-200">
              <span className="size-1.5 rounded-full bg-lime-300" />
              A fresh start for your links
            </div>
            <h1
              id="hero-title"
              className="text-balance text-5xl font-semibold leading-[1.06] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl"
            >
              Make your links
              <span className="block text-lime-700 dark:text-lime-300">
                go further.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:mx-0">
              A cleaner starting point for your URL shortener. Create an
              account and step into your own private workspace.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <SignUpButton mode="modal">
                <Button className="h-12 w-full bg-lime-300 px-6 text-base font-semibold text-slate-950 hover:bg-lime-200 sm:w-auto">
                  Get started
                  <ArrowRight aria-hidden="true" />
                </Button>
              </SignUpButton>
              <a
                href="#features"
                className="inline-flex h-12 items-center gap-2 rounded-md px-5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Explore features
                <ArrowDownRight aria-hidden="true" className="size-4" />
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Already have an account?{" "}
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="rounded-sm font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Sign in
                </button>
              </SignInButton>
            </p>
          </div>

          <div
            aria-hidden="true"
            className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center"
          >
            <div className="absolute inset-[8%] rounded-full border border-lime-300/10" />
            <div className="absolute inset-[20%] rounded-full border border-lime-300/15" />
            <div className="absolute inset-[32%] rounded-full border border-lime-300/20" />
            <div className="absolute size-[68%] rounded-full bg-lime-300/[0.06] blur-3xl" />
            <div className="relative grid size-32 place-items-center rounded-[2rem] border border-lime-200/20 bg-card shadow-[0_0_90px_rgba(163,230,53,0.12)] sm:size-40">
              <Link2 className="size-14 text-lime-300 sm:size-16" />
            </div>
            <span className="absolute left-[13%] top-[25%] grid size-12 place-items-center rounded-2xl border border-border bg-card text-lime-200 shadow-xl sm:size-14">
              <Sparkles className="size-5 sm:size-6" />
            </span>
            <span className="absolute bottom-[18%] right-[13%] grid size-12 place-items-center rounded-2xl border border-border bg-card text-lime-200 shadow-xl sm:size-14">
              <LockKeyhole className="size-5 sm:size-6" />
            </span>
            <span className="absolute right-[10%] top-[22%] size-2 rounded-full bg-lime-300/80" />
            <span className="absolute bottom-[20%] left-[12%] size-1.5 rounded-full bg-lime-200/60" />
          </div>
        </section>

        <section
          id="features"
          aria-labelledby="features-title"
          className="scroll-mt-8 border-t border-border/70 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wide text-lime-700 dark:text-lime-300">
              THE RIGHT KIND OF SIMPLE
            </p>
            <h2
              id="features-title"
              className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Everything starts with a good link.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A focused experience with the essentials to get you going.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="h-full border-border/70 bg-card/70 p-1 transition-colors hover:border-lime-300/30"
              >
                <CardHeader className="gap-4 p-5 sm:p-6">
                  <span className="grid size-11 place-items-center rounded-xl border border-lime-300/15 bg-lime-300/[0.07] text-lime-700 dark:text-lime-200">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                </CardHeader>
                <CardContent className="px-5 pb-5 text-sm leading-6 text-muted-foreground sm:px-6 sm:pb-6">
                  {description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="closing-title"
          className="mb-12 rounded-3xl border border-lime-300/15 bg-gradient-to-br from-lime-300/[0.08] to-card/40 px-6 py-10 text-center sm:mb-16 sm:px-10 sm:py-14"
        >
          <h2
            id="closing-title"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Ready to get started?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Create your account and take the first step toward a more organized
            link-sharing workflow.
          </p>
          <div className="mt-6">
            <SignUpButton mode="modal">
              <Button className="h-11 bg-lime-300 px-5 font-semibold text-slate-950 hover:bg-lime-200">
                Create your account
                <ArrowRight aria-hidden="true" />
              </Button>
            </SignUpButton>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8 lg:px-12">
          <span className="font-medium text-foreground">linkshortener</span>
          <span>Simple links. Less friction.</span>
        </div>
      </footer>
    </div>
  );
}

async function RedirectAuthenticatedUser() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }
  return null;
}
