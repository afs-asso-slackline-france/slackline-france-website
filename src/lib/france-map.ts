import franceOutline from "./france-outline.json";

export const MAP_WIDTH = 700;
export const MAP_HEIGHT = 660;

// An equirectangular sketch tuned by eye on the design: the outline is a smoothed drawing, not a border.
const PROJECTION = {
  leftMargin: 46,
  westLongitude: -4.8,
  pixelsPerLongitudeDegree: 46.8,
  topMargin: 30,
  northLatitude: 51.1,
  pixelsPerLatitudeDegree: 68,
};
const SMOOTHING_DIVISOR = 6;
const PATH_DECIMALS = 1;
const PERCENT_DECIMALS = 2;
const PERCENT = 100;

export type Coordinates = readonly [longitude: number, latitude: number];

export interface MapPoint {
  x: number;
  y: number;
}

export interface PlacedPin<Place extends string = string> {
  place: Place;
  number: number;
  leftPercent: string;
  topPercent: string;
}

export function projectCoordinates([
  longitude,
  latitude,
]: Coordinates): MapPoint {
  return {
    x:
      PROJECTION.leftMargin +
      (longitude - PROJECTION.westLongitude) *
        PROJECTION.pixelsPerLongitudeDegree,
    y:
      PROJECTION.topMargin +
      (PROJECTION.northLatitude - latitude) *
        PROJECTION.pixelsPerLatitudeDegree,
  };
}

function formatPoint(point: MapPoint): string {
  return `${point.x.toFixed(PATH_DECIMALS)} ${point.y.toFixed(PATH_DECIMALS)}`;
}

function handleTowards(
  point: MapPoint,
  before: MapPoint,
  after: MapPoint,
  direction: 1 | -1,
): MapPoint {
  return {
    x: point.x + (direction * (after.x - before.x)) / SMOOTHING_DIVISOR,
    y: point.y + (direction * (after.y - before.y)) / SMOOTHING_DIVISOR,
  };
}

export function smoothClosedPath(points: MapPoint[]): string {
  const pointAt = (index: number): MapPoint => {
    const wrappedIndex = (index + points.length) % points.length;
    const point = points[wrappedIndex];
    if (!point) throw new Error(`No outline point at index ${wrappedIndex}.`);
    return point;
  };
  const curves = points.map((point, index) => {
    const next = pointAt(index + 1);
    const startHandle = handleTowards(point, pointAt(index - 1), next, 1);
    const endHandle = handleTowards(next, point, pointAt(index + 2), -1);
    return `C${formatPoint(startHandle)} ${formatPoint(endHandle)} ${formatPoint(next)}`;
  });
  return `M${formatPoint(pointAt(0))} ${curves.join(" ")} Z`;
}

export function franceOutlinePath(): string {
  const outline = franceOutline as unknown as Coordinates[];
  return smoothClosedPath(outline.map(projectCoordinates));
}

export function placePins<Place extends string>(
  places: { place: Place; coordinates: Coordinates }[],
): PlacedPin<Place>[] {
  const firstOccurrences = new Map<Place, Coordinates>();
  for (const { place, coordinates } of places) {
    if (!firstOccurrences.has(place)) firstOccurrences.set(place, coordinates);
  }
  return [...firstOccurrences].map(([place, coordinates], index) => {
    const point = projectCoordinates(coordinates);
    return {
      place,
      number: index + 1,
      leftPercent: `${((point.x / MAP_WIDTH) * PERCENT).toFixed(PERCENT_DECIMALS)}%`,
      topPercent: `${((point.y / MAP_HEIGHT) * PERCENT).toFixed(PERCENT_DECIMALS)}%`,
    };
  });
}

export function pinPositionRules(pins: PlacedPin[]): string {
  return pins
    .map(
      (pin) =>
        `[data-pin="${pin.place}"]{left:${pin.leftPercent};top:${pin.topPercent}}`,
    )
    .join("");
}
