import { describe, expect, it } from "vitest";
import {
  franceOutlinePath,
  pinPositionRules,
  placePins,
  projectCoordinates,
} from "../../src/lib/france-map";

describe("projectCoordinates", () => {
  it("places Lyon where the design drew its pin", () => {
    const lyon = projectCoordinates([4.84, 45.76]);
    expect(lyon.x).toBeCloseTo(497.15, 1);
    expect(lyon.y).toBeCloseTo(393.12, 1);
  });
});

describe("franceOutlinePath", () => {
  it("draws one closed smooth curve", () => {
    const path = franceOutlinePath();
    expect(path.startsWith("M")).toBe(true);
    expect(path.endsWith("Z")).toBe(true);
    expect(path).toContain("C");
  });
});

describe("placePins", () => {
  it("gives associations of the same place one shared number", () => {
    const pins = placePins([
      { place: "paris", coordinates: [2.35, 48.86] },
      { place: "lyon", coordinates: [4.84, 45.76] },
      { place: "paris", coordinates: [2.35, 48.86] },
    ]);
    expect(pins.map((pin) => [pin.place, pin.number])).toEqual([
      ["paris", 1],
      ["lyon", 2],
    ]);
  });
});

describe("pinPositionRules", () => {
  it("positions each pin by its place attribute", () => {
    const [lyon] = placePins([{ place: "lyon", coordinates: [4.84, 45.76] }]);
    expect(lyon && pinPositionRules([lyon])).toBe(
      '[data-pin="lyon"]{left:71.02%;top:59.56%}',
    );
  });
});
