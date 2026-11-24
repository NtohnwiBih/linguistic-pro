const DAY_MS = 86_400_000;

/** Whole days from now until `date` (YYYY-MM-DD). Null when unset or already past. */
export function daysUntil(date: string | null): number | null {
  if (!date) return null;
  const days = Math.ceil((new Date(`${date}T00:00:00`).getTime() - Date.now()) / DAY_MS);
  return days >= 0 ? days : null;
}
