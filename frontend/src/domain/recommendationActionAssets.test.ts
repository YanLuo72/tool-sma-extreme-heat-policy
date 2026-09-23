import { describe, expect, it } from "vitest";
import { RECOMMENDATION_ACTION_IMAGE_CONFIG } from "@/config/responsiveImages";
import { RECOMMENDATION_ACTION_ASSETS } from "@/domain/recommendationActionAssets";

const ACTION_KEYS = [
  "hydration",
  "clothing",
  "pause",
  "cooling",
  "stop",
] as const;

describe("RECOMMENDATION_ACTION_ASSETS", () => {
  it.each(ACTION_KEYS)("provides responsive WebP metadata for %s", (key) => {
    expect(RECOMMENDATION_ACTION_ASSETS[key]).toEqual({
      src: `/actions/${key}-192.webp`,
      srcSet: `/actions/${key}-48.webp 48w, /actions/${key}-96.webp 96w, /actions/${key}-192.webp 192w`,
      sizes: RECOMMENDATION_ACTION_IMAGE_CONFIG.sizes,
    });
  });
});
