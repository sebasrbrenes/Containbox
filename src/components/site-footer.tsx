import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-400 bg-[#eee5d5] py-10 text-sm text-slate-600">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold text-slate-900">FileFollowup</p>
          <p className="mt-2 max-w-md text-xs leading-5">A deliberately small tool for collecting the documents that make monthly bookkeeping possible.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
          <Link className="font-semibold hover:text-emerald-800" href="/demo">Demo</Link>
          <Link className="font-semibold hover:text-emerald-800" href="/login">Sign in</Link>
          <Link className="font-semibold hover:text-emerald-800" href="/privacy">Privacy</Link>
          <Link className="font-semibold hover:text-emerald-800" href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
