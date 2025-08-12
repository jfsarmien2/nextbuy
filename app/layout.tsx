import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NextBuy Storefront",
    template: "%s | NextBuy Storefront",
  },
  description: "A simple e-commerce store built with Next.js and Tailwind CSS",
  openGraph: {
    title: "NextBuy Storefront",
    description:
      "A simple e-commerce store built with Next.js and Tailwind CSS",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "NextBuy Storefront",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="sytem"
            enableSystem
            disableTransitionOnChange
          >
            <header>
              <Navbar />
          </header>
            {children}
            <footer className="border-t border-dashed py-6">
              <div className=" container mx-auto text-sm text-muted-foreground text-center">
                ©️ { new Date().getFullYear() } NextBuy. All rights reserved.
              </div>
            </footer>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
