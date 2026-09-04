import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Header } from "@/app/_components/header";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/ui/components/toast";
import { cn } from "@/ui/lib/utils";

const shabnam = localFont({
  src: [
    {
      path: "../fonts/Shabnam-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Shabnam-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Shabnam.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Shabnam-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Shabnam-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-shabnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "داشبورد مانیتورینگ دستگاه‌ها | دیده‌نگار",
  description: "پنل مدیریت، نظارت و پایش تجهیزات شبکه دیده‌نگار",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={cn("h-full", shabnam.variable)}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <NuqsAdapter>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                  {children}
                </main>
              </div>
              <Toaster />
            </NuqsAdapter>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
