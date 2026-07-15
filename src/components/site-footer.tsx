import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-300 bg-[#eee5d5]/70 py-10 text-sm text-slate-600">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-display text-xl font-semibold text-slate-900">FileFollowup</p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em]">Stop chasing client documents.</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link className="font-bold hover:text-emerald-800" href="/privacy">Privacy</Link>
          <Link className="font-bold hover:text-emerald-800" href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
