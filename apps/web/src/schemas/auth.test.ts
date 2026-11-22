import { forgotPasswordSchema, signInSchema, signUpSchema } from "./auth";

const messages = (result: { success: boolean; error?: { issues: { message: string }[] } }) =>
  result.error?.issues.map((i) => i.message) ?? [];

describe("auth schemas", () => {
  it("validates sign-in", () => {
    expect(signInSchema.safeParse({ email: "a@b.co", password: "123456" }).success).toBe(true);
    expect(messages(signInSchema.safeParse({ email: "nope", password: "123" }))).toEqual([
      "emailInvalid",
      "passwordMin6",
    ]);
  });

  it("validates sign-up and mismatched passwords", () => {
    const base = {
      name: "Amara",
      email: "a@b.co",
      password: "Abcdef1!",
      confirmPassword: "Abcdef1!",
      agree: true,
    };
    expect(signUpSchema.safeParse(base).success).toBe(true);
    expect(messages(signUpSchema.safeParse({ ...base, confirmPassword: "x" }))).toContain(
      "passwordsMismatch",
    );
    expect(messages(signUpSchema.safeParse({ ...base, agree: false }))).toContain("termsRequired");
  });

  it("validates forgot-password", () => {
    expect(forgotPasswordSchema.safeParse({ email: "x" }).success).toBe(false);
  });
});
