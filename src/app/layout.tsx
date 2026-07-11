import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "ContaInbox | Documentos contables sin perseguir clientes",
  description: "Portal simple para que contadores soliciten, reciban y organicen documentos mensuales de sus clientes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-950 antialiased dark:bg-slate-950 dark:text-white">
        <Analytics>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Analytics>
      </body>
    </html>
  );
}
