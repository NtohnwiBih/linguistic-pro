import type { ReactNode } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Profile } from "@/lib/skills";

export type StepProps = {
  profile: Profile;
  setProfile: (update: Partial<Profile>) => void;
};

export function Step({
  title,
  sub,
  children,
}: {
  title: ReactNode;
  sub?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-[1.85rem] leading-[1.15] font-semibold animate-rise">
        {title}
      </h1>
      {sub && (
        <p
          style={{ animationDelay: "120ms" }}
          className="animate-rise mt-2 text-[15px] text-muted-foreground"
        >
          {sub}
        </p>
      )}
      <div className="mt-8 animate-rise" style={{ animationDelay: "220ms" }}>
        {children}
      </div>
    </div>
  );
}

export function Pill({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "h-12 rounded-full border px-5 text-sm font-semibold transition active:scale-95",
        on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card",
      )}
    >
      {children}
    </button>
  );
}

export function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onEdit}
        className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-muted"
      >
        <span className="flex-1">
          <span className="block text-xs text-muted-foreground">{label}</span>
          <span className="font-semibold">{value}</span>
        </span>
        <Pencil className="size-4 text-muted-foreground" />
      </button>
    </li>
  );
}
