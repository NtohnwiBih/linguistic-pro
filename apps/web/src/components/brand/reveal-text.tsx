import { cn } from "@/lib/utils";

const EMPHASIS = /(\*[^*]+\*)/;

/** Cinematic word-by-word reveal. Wrap a phrase in *stars* to emphasise it. */
export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  let wordIndex = 0;
  return (
    <span className={className}>
      {text
        .split(EMPHASIS)
        .filter(Boolean)
        .flatMap((part, partIndex) => {
          const emphasised = part.startsWith("*");
          return part
            .replace(/\*/g, "")
            .split(/(\s+)/)
            .map((word, i) =>
              /^\s+$/.test(word) ? (
                word
              ) : (
                <span
                  key={`${partIndex}-${i}`}
                  className={cn("animate-word", emphasised && "text-shimmer italic")}
                  style={{ animationDelay: `${delay + wordIndex++ * 70}ms` }}
                >
                  {word}
                </span>
              ),
            );
        })}
    </span>
  );
}
