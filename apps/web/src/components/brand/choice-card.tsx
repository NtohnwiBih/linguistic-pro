import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ChoiceCardProps = {
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
};

export function ChoiceCard({
  selected,
  disabled,
  onClick,
  title,
  description,
  icon,
  badge,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={!!selected}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
        selected
          ? "animate-pop border-primary bg-primary-soft shadow-glow"
          : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/40",
        disabled && "cursor-not-allowed opacity-50 hover:translate-y-0 hover:border-border",
      )}
    >
      {icon && (
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-xl transition",
            selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        {description && <span className="block text-sm text-muted-foreground">{description}</span>}
      </span>
      {badge && (
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          {badge}
        </span>
      )}
      {selected && (
        <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-4" />
        </span>
      )}
    </button>
  );
}
