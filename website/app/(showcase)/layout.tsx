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
          <main className="fixed inset-0 flex flex-col items-center justify-center">
            <div className="article">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
