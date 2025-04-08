export const PAGE_WIDTH = {
  WEB: 1040,
  PC: 1280,
  TABLET: 768,
  MOBILE: 480,
  PC_WIDE: 1440,
} as const;

export const pageWidthValues: number[] = Object.values(PAGE_WIDTH);
export const pageWidthKeyValues = Object.entries(PAGE_WIDTH);
export type PageWidthType = (typeof PAGE_WIDTH)[keyof typeof PAGE_WIDTH];

export const PAGE_WIDTH_LABEL: { [key in PageWidthType]: { label: string } } = {
  [PAGE_WIDTH.WEB]: { label: "WEB" },
  [PAGE_WIDTH.PC]: { label: "PC" },
  [PAGE_WIDTH.TABLET]: { label: "TABLET" },
  [PAGE_WIDTH.MOBILE]: { label: "MOBILE" },
  [PAGE_WIDTH.PC_WIDE]: { label: "PC(WIDE)" },
} as const;
