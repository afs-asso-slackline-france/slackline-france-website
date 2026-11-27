export const STRAP_VIEWBOX_WIDTH = 1440;
export const STRAP_REST_POSITION = 0.68;

const STRAP_OVERHANG = 20;
const STRAP_START_X = -STRAP_OVERHANG;
const STRAP_END_X = STRAP_VIEWBOX_WIDTH + STRAP_OVERHANG;
const MIN_POSITION = 0.1;
const MAX_POSITION = 0.9;
const POSITION_STEPS = 200;

// Both anchors sit at the same height, so the lowest point of the curve is its middle.
const CURVE_MIDDLE = 0.5;

export interface StrapGeometry {
  viewBoxHeight: number;
  anchorY: number;
  controlY: number;
}

export const STRAP_GEOMETRIES = {
  headLine: { viewBoxHeight: 120, anchorY: 14, controlY: 190 },
  cutPhoto: { viewBoxHeight: 120, anchorY: 20, controlY: 200 },
  cardRow: { viewBoxHeight: 150, anchorY: 10, controlY: 150 },
} as const satisfies Record<string, StrapGeometry>;

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
    MIDDLE_WEIGHTS.start * STRAP_START_X + MIDDLE_WEIGHTS.end * STRAP_END_X;
  return Math.round((lowestX - anchorsShare) / MIDDLE_WEIGHTS.control);
}

export function strapViewBox(geometry: StrapGeometry): string {
  return `0 0 ${STRAP_VIEWBOX_WIDTH} ${geometry.viewBoxHeight}`;
}

export function clampPosition(position: number): number {
  const bounded = Math.min(MAX_POSITION, Math.max(MIN_POSITION, position));
  return Math.round(bounded * POSITION_STEPS) / POSITION_STEPS;
}

export function sagPath(
  position: number,
  geometry: StrapGeometry = STRAP_GEOMETRIES.headLine,
): string {
  const controlX = controlXPuttingLowestPointAt(position * STRAP_VIEWBOX_WIDTH);
  const { anchorY, controlY } = geometry;
  return `M${STRAP_START_X} ${anchorY} Q${controlX} ${controlY} ${STRAP_END_X} ${anchorY}`;
}

export function areaBelowSagPath(
  position: number,
  geometry: StrapGeometry,
): string {
  const bottomY = geometry.viewBoxHeight + STRAP_OVERHANG;
  return `${sagPath(position, geometry)} L${STRAP_END_X} ${bottomY} L${STRAP_START_X} ${bottomY} Z`;
}

export function lowestPoint(
  position: number,
  geometry: StrapGeometry = STRAP_GEOMETRIES.headLine,
): StrapPoint {
  const y =
    (MIDDLE_WEIGHTS.start + MIDDLE_WEIGHTS.end) * geometry.anchorY +
    MIDDLE_WEIGHTS.control * geometry.controlY;
  return { x: position * STRAP_VIEWBOX_WIDTH, y };
}

export function positionFromPointer(
  pointerX: number,
  areaLeft: number,
  areaWidth: number,
): number {
  return clampPosition((pointerX - areaLeft) / areaWidth);
}
