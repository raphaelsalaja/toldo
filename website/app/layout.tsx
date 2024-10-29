import "@/styles/main.css";

import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { OpenGraph } from "@/lib/og";

import clsx from "clsx";
import { Inter } from "next/font/google";

import { SideNavigation } from "../components/side-navigation/index";

export const metadata: Metadata = {
  ...OpenGraph,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(inter.className)} suppressHydrationWarning>
      <body>
        <Providers>
          <nav className="fixed top-0 left-0 hidden h-fit px-12 py-24 sm:block">
            <SideNavigation />
          </nav>
          <main className="mx-auto max-w-screen-sm gap-x-12 overflow-x-hidden px-6 py-24 md:overflow-x-visible">
            <article className="article ">{children}</article>
          </main>
        </Providers>
      </body>
    </html>
  );
}
