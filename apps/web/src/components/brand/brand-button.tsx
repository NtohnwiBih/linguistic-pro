import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function BrandButton({ children, className, ...rest }: ComponentProps<"button">) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-glow transition hover:brightness-105 active:scale-[0.98] disabled:opacity-40 disabled:shadow-none [&_svg]:size-5",
        className,
      )}
    >
      {children}
    </button>
  );
}
