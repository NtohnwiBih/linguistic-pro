import { defaultProfile, useLearnerStore } from "./learner-store";

beforeEach(() => {
  useLearnerStore.setState({ user: null, onboarded: false, profile: defaultProfile });
});

describe("learner store", () => {
  it("derives a display name from the email when none is given", () => {
    useLearnerStore.getState().signIn("amara.ndiaye@example.com");
    expect(useLearnerStore.getState().user).toEqual({
      email: "amara.ndiaye@example.com",
      name: "Amara ndiaye",
    });
  });

  it("merges profile patches and completes onboarding", () => {
    const { updateProfile, completeOnboarding } = useLearnerStore.getState();
    updateProfile({ targetBand: 7 });
    updateProfile({ minutesPerDay: 45 });
    completeOnboarding();
    const state = useLearnerStore.getState();
    expect(state.profile).toMatchObject({ targetBand: 7, minutesPerDay: 45 });
    expect(state.onboarded).toBe(true);
  });

  it("resets everything on sign-out", () => {
    const store = useLearnerStore.getState();
    store.signIn("a@b.co", "Ada");
    store.updateProfile({ targetBand: 8 });
    store.signOut();
    expect(useLearnerStore.getState()).toMatchObject({
      user: null,
      onboarded: false,
      profile: defaultProfile,
    });
  });
});
