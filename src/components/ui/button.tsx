import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "border border-emerald-800 bg-emerald-800 text-white shadow-[3px_3px_0_#52271e] hover:-translate-y-px hover:bg-emerald-900",
  secondary: "border border-slate-500 bg-white text-slate-900 hover:-translate-y-px hover:border-emerald-700 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100 hover:text-emerald-800",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-[2px] px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: ButtonProps["variant"];
  className?: string;
};

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-[2px] px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-300",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
