import { Profile } from "@/lib/skills";
import { create } from "zustand";

export const INITIAL_PROFILE: Profile = {
  ieltsType: null,
  targetBand: null,
  currentLevel: null,
  testDate: null,
  minutesPerDay: 30,
  days: ["Mon", "Wed", "Fri"],
  focus: [],
  country: null,
};

type OnboardingState = {
  // TODO: replace with the signed-in learner once auth is connected.
  user: { name: string };
  profile: Profile;
  setProfile: (update: Partial<Profile>) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  user: { name: "Amara Ndi" },
  profile: INITIAL_PROFILE,
  setProfile: (update) => set((state) => ({ profile: { ...state.profile, ...update } })),
  reset: () => set({ profile: INITIAL_PROFILE }),
}));
