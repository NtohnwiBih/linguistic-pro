import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { LearnerProfile, LearnerUser } from "@/types/learner";

export const defaultProfile: LearnerProfile = {
  ieltsType: null,
  targetBand: null,
  currentLevel: null,
  testDate: null,
  minutesPerDay: 30,
  days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  focus: [],
};

interface LearnerState {
  user: LearnerUser | null;
  onboarded: boolean;
  profile: LearnerProfile;
  /** True once persisted state has been read from localStorage (client only). */
  hydrated: boolean;
}

interface LearnerActions {
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<LearnerProfile>) => void;
  completeOnboarding: () => void;
}

export type LearnerStore = LearnerState & LearnerActions;

export const LEARNER_STORAGE_KEY = "linguisticpro:learner";

const nameFromEmail = (email: string) => {
  const local = (email.split("@")[0] ?? email).replace(/[._-]+/g, " ");
  return local.charAt(0).toUpperCase() + local.slice(1);
};

/**
 * Prototype learner session and preferences, persisted in localStorage.
 *
 * Persistence is opt-in on the client (`skipHydration`) so server-rendered markup and
 * the first client render match. `StoreHydrator` rehydrates after mount.
 * Replace `signIn`/`signOut` with real API calls when the backend is connected.
 */
export const useLearnerStore = create<LearnerStore>()(
  persist(
    (set) => ({
      user: null,
      onboarded: false,
      profile: defaultProfile,
      hydrated: false,

      signIn: (email, name) => set({ user: { email, name: name?.trim() || nameFromEmail(email) } }),
      signOut: () => set({ user: null, onboarded: false, profile: defaultProfile }),
      updateProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),
      completeOnboarding: () => set({ onboarded: true }),
    }),
    {
      name: LEARNER_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: ({ user, onboarded, profile }) => ({ user, onboarded, profile }),
      // Merge the profile field-by-field so newly added fields get defaults.
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<LearnerState>;
        return { ...current, ...saved, profile: { ...current.profile, ...saved.profile } };
      },
    },
  ),
);

/** Reads persisted state, then flags the store as hydrated even if storage is unavailable. */
export async function hydrateLearnerStore() {
  try {
    await useLearnerStore.persist.rehydrate();
  } finally {
    useLearnerStore.setState({ hydrated: true });
  }
}
