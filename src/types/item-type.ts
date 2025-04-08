export const ITEM_TYPE = {
  PAGE: "page",
  IMAGE: "image",
  TEXT: "text",
} as const;

export type ItemType = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE];
