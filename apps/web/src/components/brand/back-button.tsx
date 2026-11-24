import { ArrowLeft } from "lucide-react";

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="grid size-11 place-items-center rounded-full border border-border bg-card transition hover:bg-muted active:scale-95"
    >
      <ArrowLeft className="size-5" />
    </button>
  );
}
