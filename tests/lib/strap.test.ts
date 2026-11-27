import { describe, expect, it } from "vitest";
import {
  STRAP_REST_POSITION,
  STRAP_VIEWBOX_WIDTH,
  clampPosition,
  lowestPoint,
  positionFromPointer,
  sagPath,
} from "../../src/lib/strap";

function controlXOf(path: string): number {
  const controlMatch = path.match(/Q(-?\d+)/);
  if (!controlMatch?.[1]) throw new Error(`No control point in "${path}".`);
  return Number(controlMatch[1]);
}

describe("sagPath", () => {
  it("draws one curve from edge to edge with the sag in the middle", () => {
    expect(sagPath(0.5)).toBe("M-20 14 Q720 190 1460 14");
  });

  it("moves the control point so the lowest point follows the position", () => {
    const lowestX = STRAP_REST_POSITION * STRAP_VIEWBOX_WIDTH;
    const curveLowestX =
      (-20 + 2 * controlXOf(sagPath(STRAP_REST_POSITION)) + 1460) / 4;
    expect(Math.abs(curveLowestX - lowestX)).toBeLessThan(1);
  });
});

describe("lowestPoint", () => {
  it("sits on the curve at the requested position", () => {
    expect(lowestPoint(0.25)).toEqual({ x: 360, y: 102 });
  });
});

describe("clampPosition", () => {
  it("keeps the sag away from the anchors", () => {
    expect(clampPosition(0)).toBe(0.1);
    expect(clampPosition(1)).toBe(0.9);
  });

  it("rounds to steps of half a percent", () => {
    expect(clampPosition(0.4321)).toBe(0.43);
  });
});

describe("positionFromPointer", () => {
  it("measures the pointer relative to the area", () => {
    expect(positionFromPointer(150, 100, 200)).toBe(0.25);
  });
});
