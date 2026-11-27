import { describe, expect, it } from "vitest";
import { countWithNoun } from "../../src/i18n/plural";

const forms = { one: "photo", other: "photos" };

describe("countWithNoun", () => {
  it("follows the French rule where zero and one are singular", () => {
    expect(countWithNoun(0, "fr", forms)).toBe("0 photo");
    expect(countWithNoun(1, "fr", forms)).toBe("1 photo");
    expect(countWithNoun(15, "fr", forms)).toBe("15 photos");
  });

  it("follows the English rule where only one is singular", () => {
    expect(countWithNoun(0, "en", forms)).toBe("0 photos");
    expect(countWithNoun(1, "en", forms)).toBe("1 photo");
  });
});
