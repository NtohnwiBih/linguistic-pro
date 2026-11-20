/**
 * Single source of truth for application paths (locale prefix excluded;
 * the locale-aware `Link` / `useRouter` from `@/i18n/navigation` add it).
 */
export const ROUTES = {
  root: "/",
  welcome: "/welcome",
  signIn: "/sign-in",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",
  pricing: "/pricing",
  onboarding: "/onboarding",
  home: "/home",
  practice: "/practice",
  review: "/review",
  progress: "/progress",
  studyPlan: "/study-plan",
  mockTests: "/mock-tests",
  savedQuestions: "/saved-questions",
  notifications: "/notifications",
  settings: "/settings",
  reading: "/reading",
  listening: "/listening",
  writing: "/writing",
  speaking: "/speaking",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
