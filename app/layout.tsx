"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/auth";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[var(--bg-surface)] text-[var(--text-primary)] antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {!isAuthPage && <Navbar />}
          <main className="flex-1">{children}</main>
          {!isAuthPage && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}