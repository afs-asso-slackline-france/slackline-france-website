export interface ImagePreset {
  width: number;
  widths: number[];
  sizes: string;
}

const THUMBNAIL_WIDTHS = { small: 320, medium: 480, large: 640 };

export const IMAGE_PRESETS = {
  creditsThumbnail: {
    width: THUMBNAIL_WIDTHS.large,
    widths: Object.values(THUMBNAIL_WIDTHS),
    sizes: "(min-width: 70rem) 18rem, (min-width: 40rem) 45vw, 100vw",
  },
} as const satisfies Record<string, ImagePreset>;

export const LOGO_HEIGHT = 44;

const PIXEL_DENSITIES = { standard: 1, retina: 2 };

export const LOGO_DENSITIES = Object.values(PIXEL_DENSITIES);
