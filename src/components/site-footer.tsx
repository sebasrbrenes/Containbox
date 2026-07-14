import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 py-8 text-sm text-slate-500 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>ContaInbox · client documents without the email and text chaos.</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link className="hover:text-slate-950 dark:hover:text-white" href="/privacy">Privacy</Link>
          <Link className="hover:text-slate-950 dark:hover:text-white" href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
