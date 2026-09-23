export interface ResponsiveImageConfig {
  readonly widths: readonly number[];
  readonly sizes: string;
}

export interface ResponsiveSquareImageConfig extends ResponsiveImageConfig {
  readonly renderedSize: string;
}

export interface FixedHeightResponsiveImageConfig extends ResponsiveImageConfig {
  readonly renderedHeight: string;
}

interface FixedHeightResponsiveImageConfigOptions {
  readonly widths: readonly number[];
  readonly sourceWidth: number;
  readonly sourceHeight: number;
  readonly renderedHeightPx: number;
}

const ROOT_FONT_SIZE_PX = 16;

function toRem(px: number): string {
  return `${Number((px / ROOT_FONT_SIZE_PX).toFixed(4))}rem`;
}

function createFixedHeightResponsiveImageConfig({
  widths,
  sourceWidth,
  sourceHeight,
  renderedHeightPx,
}: FixedHeightResponsiveImageConfigOptions): FixedHeightResponsiveImageConfig {
  return {
    widths,
    sizes: toRem((renderedHeightPx * sourceWidth) / sourceHeight),
    renderedHeight: toRem(renderedHeightPx),
  };
}

const RECOMMENDATION_ACTION_RENDERED_SIZE = "2.5rem";

export const RECOMMENDATION_ACTION_IMAGE_CONFIG = {
  widths: [48, 96, 192],
  sizes: RECOMMENDATION_ACTION_RENDERED_SIZE,
  renderedSize: RECOMMENDATION_ACTION_RENDERED_SIZE,
} satisfies ResponsiveSquareImageConfig;

// Mantine's size="sm" Container is a 45rem border box. SiteShell and
// SectionCard each add 0.75rem per side, leaving 42rem for the image once the
// container reaches its cap and viewport-minus-3rem below it.
const HOME_CONTAINER_MAX_WIDTH_REM = 45;
const HOME_IMAGE_INLINE_PADDING_REM = 3;
const SPORT_IMAGE_DESKTOP_WIDTH_REM =
  HOME_CONTAINER_MAX_WIDTH_REM - HOME_IMAGE_INLINE_PADDING_REM;
const SPORT_IMAGE_SIZES = `(max-width: ${HOME_CONTAINER_MAX_WIDTH_REM}rem) calc(100vw - ${HOME_IMAGE_INLINE_PADDING_REM}rem), ${SPORT_IMAGE_DESKTOP_WIDTH_REM}rem`;

export const DEFAULT_SPORT_IMAGE_CONFIG = {
  widths: [320, 640, 816],
  sizes: SPORT_IMAGE_SIZES,
} satisfies ResponsiveImageConfig;

export const SPORT_IMAGE_CONFIG_BY_ASSET_NAME = {
  // These source files are 522px wide, so their ladders stop at the native
  // width instead of inventing upscaled 640px and 816px candidates.
  soccer: {
    widths: [320, 522],
    sizes: SPORT_IMAGE_SIZES,
  },
  walking: {
    widths: [320, 522],
    sizes: SPORT_IMAGE_SIZES,
  },
} as const satisfies Record<string, ResponsiveImageConfig>;

export function getSportImageConfig(assetName: string): ResponsiveImageConfig {
  const configuredAssetName =
    assetName as keyof typeof SPORT_IMAGE_CONFIG_BY_ASSET_NAME;

  return (
    SPORT_IMAGE_CONFIG_BY_ASSET_NAME[configuredAssetName] ??
    DEFAULT_SPORT_IMAGE_CONFIG
  );
}

// Intrinsic dimensions come from the original 471x163 USYD and 1314x527 SMA
// logo files. Source sizes are rendered height multiplied by the source ratio.
export const BRANDING_IMAGE_CONFIG = {
  headerUsyd: createFixedHeightResponsiveImageConfig({
    widths: [160, 320],
    sourceWidth: 471,
    sourceHeight: 163,
    renderedHeightPx: 35,
  }),
  footerUsyd: createFixedHeightResponsiveImageConfig({
    widths: [160, 320, 471],
    sourceWidth: 471,
    sourceHeight: 163,
    renderedHeightPx: 50,
  }),
  footerSma: createFixedHeightResponsiveImageConfig({
    widths: [160, 320, 480],
    sourceWidth: 1314,
    sourceHeight: 527,
    renderedHeightPx: 50,
  }),
} as const satisfies Record<string, FixedHeightResponsiveImageConfig>;
