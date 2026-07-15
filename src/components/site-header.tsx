import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/demo", label: "Demo" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-300 bg-[#f4efe4]/92 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="FileFollowup home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 font-serif text-sm font-bold text-emerald-800 transition group-hover:-rotate-6">
            FF
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">FileFollowup</span>
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.08em] text-slate-600 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-emerald-800">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" className="hidden sm:inline-flex">
            Login
          </ButtonLink>
          <ButtonLink href="/demo">View demo</ButtonLink>
        </div>
      </div>
    </header>
  );
}
