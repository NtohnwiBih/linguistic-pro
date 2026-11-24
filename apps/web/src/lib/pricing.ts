import { Profile } from "./skills";


export type Country = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  monthly: { focused: number; intensive: number };
};

// Configurable country-based pricing (monthly base prices, local currency).
export const COUNTRIES: Country[] = [
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    symbol: "£",
    monthly: { focused: 12.99, intensive: 19.99 },
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: "USD",
    symbol: "$",
    monthly: { focused: 14.99, intensive: 22.99 },
  },
  {
    code: "CM",
    name: "Cameroon",
    flag: "🇨🇲",
    currency: "XAF",
    symbol: "FCFA ",
    monthly: { focused: 3500, intensive: 5500 },
  },
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    currency: "NGN",
    symbol: "₦",
    monthly: { focused: 6500, intensive: 9900 },
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    currency: "INR",
    symbol: "₹",
    monthly: { focused: 499, intensive: 799 },
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    symbol: "CA$",
    monthly: { focused: 18.99, intensive: 27.99 },
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    symbol: "A$",
    monthly: { focused: 19.99, intensive: 29.99 },
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    currency: "EUR",
    symbol: "€",
    monthly: { focused: 13.99, intensive: 20.99 },
  },
];

export type Offer = {
  name: string;
  track: "focused" | "intensive";
  interval: "month" | "3 months";
  price: number;
  perMonth: number;
  currency: string;
  symbol: string;
  features: string[];
};

/** Intensive when the band gap is ≥1.5 or weekly study ≥ 4h. Quarterly (15% off) when the test is 90+ days away or unbooked. */
export function buildOffer(p: Profile, country: Country, daysToTest: number | null): Offer {
  const gap = (p.targetBand ?? 6.5) - (p.currentLevel ?? 5.5);
  const weeklyMin = p.minutesPerDay * p.days.length;
  const track = gap >= 1.5 || weeklyMin >= 240 ? "intensive" : "focused";
  const quarterly = daysToTest === null || daysToTest >= 90;
  const base = country.monthly[track];
  const round = (n: number) =>
    country.currency === "XAF" || country.currency === "NGN" || country.currency === "INR"
      ? Math.round(n / 100) * 100
      : Math.round(n * 100) / 100;
  const price = quarterly ? round(base * 3 * 0.85) : base;
  const type = p.ieltsType === "general" ? "General Training" : "Academic";
  const focusNames = p.focus.map((f) => f.charAt(0).toUpperCase() + f.slice(1));
  return {
    name: `IELTS ${type} · Band ${(p.targetBand ?? 7).toFixed(1)} ${track === "intensive" ? "Intensive" : "Focused"} Plan`,
    track,
    interval: quarterly ? "3 months" : "month",
    price,
    perMonth: quarterly ? round(price / 3) : price,
    currency: country.currency,
    symbol: country.symbol,
    features: [
      `Daily ${p.minutesPerDay}-minute sessions on ${p.days.length} day${p.days.length === 1 ? "" : "s"} a week`,
      focusNames.length
        ? `Priority drills for ${focusNames.join(", ")}`
        : "Balanced practice across all four skills",
      track === "intensive"
        ? "Unlimited AI-marked Writing & Speaking feedback"
        : "10 AI-marked Writing & Speaking reviews a month",
      `Full ${type} mock tests with band estimates`,
      daysToTest !== null
        ? `A plan paced to your test in ${daysToTest} days`
        : "A flexible plan that adapts when you book",
    ],
  };
}

export function formatPrice(o: { price: number; symbol: string; currency: string }, n = o.price) {
  const whole = Number.isInteger(n);
  return `${o.symbol}${n.toLocaleString("en", { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 })}`;
}
