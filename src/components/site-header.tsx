import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

const nav = [
  { href: "/#why", label: "Why it exists" },
  { href: "/#how-it-works", label: "The workflow" },
  { href: "/#product", label: "For clients" },
  { href: "/#pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-400 bg-[#f4efe4]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-2" aria-label="FileFollowup home">
          <span className="font-display text-[1.35rem] font-semibold tracking-tight">FileFollowup</span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.14em] text-emerald-800 sm:inline">Monthly desk</span>
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-semibold text-slate-600 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-emerald-800">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" className="hidden sm:inline-flex">
            Sign in
          </ButtonLink>
          <ButtonLink href="/demo">Try the demo</ButtonLink>
        </div>
      </div>
    </header>
  );
}
