"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { BrandButton } from "@/components/brand/brand-button";
import { RevealText } from "@/components/brand/reveal-text";
import { cn } from "@/lib/utils";
import type { Moment, MomentImage } from "@/lib/moments";

const MOMENT_IMAGES: Record<MomentImage, string> = {
  academic: "/images/moment-academic.png",
  goal: "/images/moment-goal.png",
  climb: "/images/moment-climb.png",
  journey: "/images/moment-journey.png",
};

const EXIT_MS = 380;

export function PersonalMoment({ moment, onContinue }: { moment: Moment; onContinue: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();

  const close = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    exitTimerRef.current = setTimeout(onContinue, EXIT_MS);
  }, [onContinue]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(
    () => () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    },
    [],
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        "animate-moment-backdrop fixed inset-0 z-50 overflow-y-auto bg-glow px-6 py-8 text-foreground",
        leaving && "animate-moment-backdrop-out",
      )}
    >
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <span className="animate-orb absolute -left-28 top-[8%] size-80 rounded-full bg-mint/25 blur-3xl" />
        <span
          className="animate-orb absolute -right-32 bottom-[4%] size-96 rounded-full bg-highlight/15 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <span className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />
        <span className="absolute left-1/2 top-1/2 size-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-md flex-col items-center justify-center text-center">
        <div className="animate-moment-art relative mb-6 grid size-52 place-items-center sm:size-60">
          <span
            aria-hidden
            className="animate-moment-halo absolute inset-6 rounded-full bg-primary-soft"
          />
          <span
            aria-hidden
            className="animate-moment-orbit absolute inset-0 rounded-full border border-primary/15"
          >
            <span className="absolute left-[12%] top-[8%] size-2.5 rounded-full bg-highlight shadow-glow" />
            <span className="absolute bottom-[13%] right-[7%] size-2 rounded-full bg-primary" />
          </span>
          <span
            aria-hidden
            className="animate-moment-orbit-reverse absolute inset-3 rounded-full border border-dashed border-primary/20"
          />
          <Sparkles
            aria-hidden
            className="animate-moment-spark absolute right-2 top-4 size-6 text-highlight"
          />
          <Image
            src={MOMENT_IMAGES[moment.image]}
            alt=""
            width={816}
            height={816}
            sizes="(min-width: 640px) 13rem, 11rem"
            className="relative size-44 object-contain drop-shadow-xl sm:size-52"
          />
        </div>

        <p
          className="animate-rise mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
          style={{ animationDelay: "420ms" }}
        >
          <Sparkles className="size-3.5" />
          {moment.kicker}
        </p>

        <h2
          id={titleId}
          className="font-display text-[2rem] font-semibold leading-[1.16] tracking-tight sm:text-4xl"
        >
          <RevealText text={moment.text} delay={500} />
        </h2>

        <div className="animate-rise mt-10 w-full" style={{ animationDelay: "1050ms" }}>
          <BrandButton onClick={close} autoFocus>
            Continue <ArrowRight />
          </BrandButton>
        </div>

        <p
          className="animate-rise mt-5 flex items-center gap-2 text-xs font-medium text-muted-foreground"
          style={{ animationDelay: "1200ms" }}
        >
          <Sparkles className="size-3.5 text-primary" />
          Personalised from your answers
        </p>
      </div>
    </div>
  );
}
