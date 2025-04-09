import { ItemType } from "./item-type";

export type DPNode = {
  id: string;
  type: ItemType;
  props?: { [key: string]: string | number | boolean };
  order?: number;
  content?: string;
  pos?: { x: number; y: number };
  items?: DPNode[];
};

export type PageDPNode = DPNode & {
  order: number;
  timestamp: number;
};
