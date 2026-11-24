import { Check, Clock, Globe2, PartyPopper, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/brand/logo-mark";
import { RevealText } from "@/components/brand/reveal-text";
import { daysUntil } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { COUNTRIES, buildOffer, formatPrice } from "@/lib/pricing";
import { Step, type StepProps } from "../step-layout";

export function CountryStep({ profile, setProfile, first }: StepProps & { first: string }) {
  return (
    <Step
      title={
        <>
          Last thing, {first}: where are you{" "}
          <span className="italic text-primary">studying from?</span>
        </>
      }
      sub="We'll show your plan in your local currency."
    >
      <div className="grid grid-cols-2 gap-3">
        {COUNTRIES.map((country) => {
          const selected = profile.country === country.code;
          return (
            <button
              key={country.code}
              type="button"
              aria-pressed={selected}
              onClick={() => setProfile({ country: country.code })}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-4 text-left transition-all",
                selected
                  ? "animate-pop border-primary bg-primary-soft shadow-glow"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              <span className="text-2xl" aria-hidden>
                {country.flag}
              </span>
              <span className="text-sm font-semibold leading-tight">
                {country.name}
                <span className="block text-xs font-medium text-muted-foreground">
                  {country.currency}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Globe2 className="size-4" /> Prices shown are illustrative.
      </p>
    </Step>
  );
}

const CONFETTI_PIECES = Array.from({ length: 18 }, (_, i) => i);
const confettiColour = (i: number) =>
  i % 3 === 0 ? "bg-highlight" : i % 3 === 1 ? "bg-mint" : "bg-primary";

export function OfferStep({ profile, first }: { profile: StepProps["profile"]; first: string }) {
  const country = COUNTRIES.find((c) => c.code === profile.country);
  if (!country) return null;

  const offer = buildOffer(profile, country, daysUntil(profile.testDate));
  const renewDate = new Date();
  renewDate.setMonth(renewDate.getMonth() + (offer.interval === "3 months" ? 3 : 1));

  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 h-0">
        {CONFETTI_PIECES.map((i) => (
          <span
            key={i}
            className={cn("animate-confetti absolute top-0 size-2 rounded-sm", confettiColour(i))}
            style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 6) * 120}ms` }}
          />
        ))}
      </div>

      <p className="animate-word text-xs font-bold uppercase tracking-[0.2em] text-highlight">
        Your journey, designed for you
      </p>
      <h1 className="mt-3 font-display text-[2.1rem] font-semibold leading-[1.1]">
        <RevealText
          text={`${first}, your road to *Band ${profile.targetBand?.toFixed(1)}* is ready.`}
          delay={150}
        />
      </h1>

      <div
        className="mt-7 overflow-hidden rounded-3xl bg-reveal p-6 text-primary-foreground dark:text-background shadow-glow animate-rise"
        style={{ animationDelay: "700ms" }}
      >
        <p className="text-sm font-semibold text-highlight">{offer.name}</p>
        <div className="mt-4 flex items-end gap-2">
          <span className="font-display text-4xl font-semibold whitespace-nowrap sm:text-5xl">
            {formatPrice(offer)}
          </span>
          <span className="pb-2 text-sm opacity-80">/ {offer.interval}</span>
        </div>
        {offer.interval === "3 months" && (
          <p className="mt-1 text-sm opacity-80">
            That&apos;s {formatPrice(offer, offer.perMonth)} a month · save 15%
          </p>
        )}
        <ul className="mt-6 space-y-3">
          {offer.features.map((feature, i) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-[15px] animate-rise"
              style={{ animationDelay: `${1000 + i * 120}ms` }}
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-primary-foreground dark:text-background">
                <Check className="size-3.5" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <p
        className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground animate-rise"
        style={{ animationDelay: "1600ms" }}
      >
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        Billed {formatPrice(offer)} {offer.currency} today, then every {offer.interval} on the same
        date (next:{" "}
        {renewDate.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
        ) until you cancel. Cancel anytime in settings before renewal.
      </p>
    </div>
  );
}

export function DoneStep({ profile, first }: { profile: StepProps["profile"]; first: string }) {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
      <div className="relative">
        <LogoMark className="size-20" />
        <span className="absolute -right-3 -top-3 grid size-10 place-items-center rounded-full bg-accent text-accent-foreground">
          <PartyPopper className="size-5" />
        </span>
      </div>
      <h1 className="mt-8 font-display text-4xl font-semibold leading-tight">
        You&apos;re all set,
        <br />
        <span className="italic text-primary">{first}.</span>
      </h1>
      <p className="mt-4 max-w-xs text-muted-foreground">
        Your plan to Band {profile.targetBand?.toFixed(1)} is ready. Your first session takes about{" "}
        {profile.minutesPerDay} minutes.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
        <Clock className="size-4" /> Today&apos;s session is waiting
      </div>
    </div>
  );
}
