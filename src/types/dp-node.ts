import { ItemType } from "./item-type";

export type DPNode = {
  id: string;
  type: ItemType;
  props?: { [key: string]: string | number | boolean };
  items?: DPNode[];
  order?: number;
  content?: string;
};

export type PageDPNode = DPNode & {
  order: number;
  timestamp: number;
};
