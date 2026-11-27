export interface ImagePreset {
  width: number;
  widths: number[];
  sizes: string;
}

const WIDTH_STEPS = {
  tiny: 320,
  small: 480,
  medium: 640,
  large: 960,
  wide: 1280,
  full: 1920,
};

export const IMAGE_PRESETS = {
  creditsThumbnail: {
    width: WIDTH_STEPS.medium,
    widths: [WIDTH_STEPS.tiny, WIDTH_STEPS.small, WIDTH_STEPS.medium],
    sizes: "(min-width: 70rem) 18rem, (min-width: 40rem) 45vw, 100vw",
  },
  heroMain: {
    width: WIDTH_STEPS.large,
    widths: [WIDTH_STEPS.small, WIDTH_STEPS.medium, WIDTH_STEPS.large],
    sizes: "(min-width: 60rem) 36vw, (min-width: 40rem) 64vw, 100vw",
  },
  heroSide: {
    width: WIDTH_STEPS.small,
    widths: [WIDTH_STEPS.tiny, WIDTH_STEPS.small],
    sizes: "(min-width: 60rem) 18vw, (min-width: 40rem) 32vw, 50vw",
  },
  card: {
    width: WIDTH_STEPS.medium,
    widths: [WIDTH_STEPS.tiny, WIDTH_STEPS.small, WIDTH_STEPS.medium],
    sizes: "(min-width: 70rem) 26rem, (min-width: 40rem) 32vw, 100vw",
  },
  column: {
    width: WIDTH_STEPS.large,
    widths: [WIDTH_STEPS.small, WIDTH_STEPS.medium, WIDTH_STEPS.large],
    sizes: "(min-width: 60rem) 36rem, 100vw",
  },
  fullWidth: {
    width: WIDTH_STEPS.full,
    widths: [
      WIDTH_STEPS.medium,
      WIDTH_STEPS.large,
      WIDTH_STEPS.wide,
      WIDTH_STEPS.full,
    ],
    sizes: "100vw",
  },
} as const satisfies Record<string, ImagePreset>;

export type ImagePresetName = keyof typeof IMAGE_PRESETS;

export const LOGO_HEIGHT = 44;

export const HEADING_MARK_HEIGHT = 64;

const PIXEL_DENSITIES = { standard: 1, retina: 2 };

export const LOGO_DENSITIES = Object.values(PIXEL_DENSITIES);
