export interface ResponsiveImageConfig {
  readonly widths: readonly number[];
  readonly sizes: string;
}

export interface ResponsiveSquareImageConfig extends ResponsiveImageConfig {
  readonly renderedSize: string;
}

const RECOMMENDATION_ACTION_RENDERED_SIZE = "2.5rem";

export const RECOMMENDATION_ACTION_IMAGE_CONFIG = {
  widths: [48, 96, 192],
  sizes: RECOMMENDATION_ACTION_RENDERED_SIZE,
  renderedSize: RECOMMENDATION_ACTION_RENDERED_SIZE,
} satisfies ResponsiveSquareImageConfig;
