import { Article } from "@/components/article";
import "@/styles.css";

import type { Metadata } from "next";

import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Toldo",
  description: "A modal component for React",
  keywords: ["Dialog", "Modal", "React", "Component"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toldo.vercel.app/",
    title: "Toldo",
    description: "A modal component for React",
    images: ["https://toldo.vercel.app/og.png"],
    siteName: "Toldo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toldo",
    description: "A modal component for React",
    images: ["https://toldo.vercel.app/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider enableSystem={true} attribute="class" storageKey="theme" defaultTheme="system">
          <main className="mx-auto max-w-screen-md gap-x-12 overflow-x-hidden px-6 py-24 md:overflow-x-visible">
            <Article className="article ">{children}</Article>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
