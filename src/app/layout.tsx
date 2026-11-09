import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { themeStorageKey } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linkshortener | Make your links go further",
  description:
    "A cleaner starting point for your URL shortener. Create an account and step into your own private workspace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            variables: {
              colorBackground: "var(--popover)",
              colorForeground: "var(--popover-foreground)",
              colorMutedForeground: "var(--muted-foreground)",
              colorPrimary: "var(--primary)",
              colorInput: "var(--background)",
              colorInputForeground: "var(--foreground)",
              fontFamily: "var(--font-geist-sans)",
            },
          }}
        >
          {children}
        </ClerkProvider>
        <Script id="theme-preference" strategy="beforeInteractive">
          {`try {
  if (window.localStorage.getItem("${themeStorageKey}") === "light") {
    document.documentElement.classList.remove("dark");
  }
} catch (error) {
  console.error("Unable to read the theme preference.", error);
}`}
        </Script>
      </body>
    </html>
  );
}