export const STRAP_VIEWBOX_WIDTH = 1440;
export const STRAP_VIEWBOX_HEIGHT = 120;
export const STRAP_REST_POSITION = 0.68;

const STRAP_OVERHANG = 20;
const STRAP_START = { x: -STRAP_OVERHANG, y: 14 };
const STRAP_END = { x: STRAP_VIEWBOX_WIDTH + STRAP_OVERHANG, y: 14 };
const STRAP_CONTROL_Y = 190;
const MIN_POSITION = 0.1;
const MAX_POSITION = 0.9;
const POSITION_STEPS = 200;

// Both anchors sit at the same height, so the lowest point of the curve is its middle.
const CURVE_MIDDLE = 0.5;

export interface StrapPoint {
  x: number;
  y: number;
}

interface BezierWeights {
  start: number;
  control: number;
  end: number;
}

function quadraticBezierWeights(curveParameter: number): BezierWeights {
  const remaining = 1 - curveParameter;
  return {
    start: remaining * remaining,
    control: 2 * remaining * curveParameter,
    end: curveParameter * curveParameter,
  };
}

const MIDDLE_WEIGHTS = quadraticBezierWeights(CURVE_MIDDLE);

function controlXPuttingLowestPointAt(lowestX: number): number {
  const anchorsShare =
    MIDDLE_WEIGHTS.start * STRAP_START.x + MIDDLE_WEIGHTS.end * STRAP_END.x;
  return Math.round((lowestX - anchorsShare) / MIDDLE_WEIGHTS.control);
}

export function clampPosition(position: number): number {
  const bounded = Math.min(MAX_POSITION, Math.max(MIN_POSITION, position));
  return Math.round(bounded * POSITION_STEPS) / POSITION_STEPS;
}

export function sagPath(position: number): string {
  const controlX = controlXPuttingLowestPointAt(position * STRAP_VIEWBOX_WIDTH);
  return `M${STRAP_START.x} ${STRAP_START.y} Q${controlX} ${STRAP_CONTROL_Y} ${STRAP_END.x} ${STRAP_END.y}`;
}

export function lowestPoint(position: number): StrapPoint {
  const y =
    MIDDLE_WEIGHTS.start * STRAP_START.y +
    MIDDLE_WEIGHTS.control * STRAP_CONTROL_Y +
    MIDDLE_WEIGHTS.end * STRAP_END.y;
  return { x: position * STRAP_VIEWBOX_WIDTH, y };
}

export function positionFromPointer(
  pointerX: number,
  areaLeft: number,
  areaWidth: number,
): number {
  return clampPosition((pointerX - areaLeft) / areaWidth);
}
