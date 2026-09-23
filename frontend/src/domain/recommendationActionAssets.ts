import { RECOMMENDATION_ACTION_IMAGE_CONFIG } from "@/config/responsiveImages";
import {
  createResponsiveImageAsset,
  type ResponsiveImageAsset,
} from "@/lib/responsiveImage";

const { sizes, widths } = RECOMMENDATION_ACTION_IMAGE_CONFIG;

export const RECOMMENDATION_ACTION_ASSETS = {
  hydration: createResponsiveImageAsset({
    assetPath: "actions/hydration",
    widths,
    sizes,
  }),
  clothing: createResponsiveImageAsset({
    assetPath: "actions/clothing",
    widths,
    sizes,
  }),
  pause: createResponsiveImageAsset({
    assetPath: "actions/pause",
    widths,
    sizes,
  }),
  cooling: createResponsiveImageAsset({
    assetPath: "actions/cooling",
    widths,
    sizes,
  }),
  stop: createResponsiveImageAsset({
    assetPath: "actions/stop",
    widths,
    sizes,
  }),
} satisfies Record<string, ResponsiveImageAsset | null>;

export type RecommendationActionAssetKey =
  keyof typeof RECOMMENDATION_ACTION_ASSETS;
