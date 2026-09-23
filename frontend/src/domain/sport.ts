import {
  createResponsiveImageAsset,
  type ResponsiveImageAsset,
} from "@/lib/responsiveImage";

export const SportType = {
  Abseiling: "ABSEILING",
  Archery: "ARCHERY",
  AustralianFootball: "AUSTRALIAN_FOOTBALL",
  Baseball: "BASEBALL",
  Basketball: "BASKETBALL",
  Bowls: "BOWLS",
  Canoeing: "CANOEING",
  Cricket: "CRICKET",
  Croquet: "CROQUET",
  Cycling: "CYCLING",
  Equestrian: "EQUESTRIAN",
  FieldAthletics: "FIELD_ATHLETICS",
  FieldHockey: "FIELD_HOCKEY",
  Fishing: "FISHING",
  Golf: "GOLF",
  Horseback: "HORSEBACK",
  Kayaking: "KAYAKING",
  Running: "RUNNING",
  Mtb: "MTB",
  Netball: "NETBALL",
  Oztag: "OZTAG",
  Pickleball: "PICKLEBALL",
  Climbing: "CLIMBING",
  Rowing: "ROWING",
  RugbyLeague: "RUGBY_LEAGUE",
  RugbyUnion: "RUGBY_UNION",
  Sailing: "SAILING",
  Shooting: "SHOOTING",
  Soccer: "SOCCER",
  Softball: "SOFTBALL",
  Tennis: "TENNIS",
  Touch: "TOUCH",
  Volleyball: "VOLLEYBALL",
  Walking: "WALKING",
} as const;

export type SportType = (typeof SportType)[keyof typeof SportType];

export const DEFAULT_SPORT_TYPE = SportType.Soccer;

/**
 * Maps an enum value into an asset/translation-friendly name.
 */
function toSportAssetName(type: SportType): string {
  return type.toLowerCase();
}

export interface SportMeta {
  type: SportType;
  assetName: string;
  labelKey: string;
  image: ResponsiveImageAsset;
}

const STANDARD_SPORT_IMAGE_WIDTHS = [320, 640, 816] as const;

const SPORT_IMAGE_WIDTHS_BY_TYPE: Partial<
  Record<SportType, readonly number[]>
> = {
  // Soccer and Walking source images are 522px wide. Do not upscale them to
  // 640/816 candidates; use the available source width as the largest asset.
  [SportType.Soccer]: [320, 522],
  [SportType.Walking]: [320, 522],
} as const;

export const sports: readonly SportMeta[] = Object.values(SportType).map(
  (type) => {
    const assetName = toSportAssetName(type);

    return {
      type,
      assetName,
      labelKey: `sports.${assetName}`,
      image: createResponsiveImageAsset({
        assetPath: `sports/${assetName}`,
        widths: SPORT_IMAGE_WIDTHS_BY_TYPE[type] ?? STANDARD_SPORT_IMAGE_WIDTHS,
      }),
    };
  },
);

export const SPORT_TYPE_VALUES: SportType[] = sports.map((sport) => sport.type);

/**
 * Runtime guard to validate sport values coming from the URL/UI.
 */
export function isSportType(value: string): value is SportType {
  return SPORT_TYPE_VALUES.includes(value as SportType);
}
