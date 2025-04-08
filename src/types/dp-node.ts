import { ItemType } from "./item-type";

export type DPNode = {
  id: string;
  type: ItemType;
  props?: { [key: string]: string | number | boolean };
  children?: DPNode[];
  order?: number;
};

export type PageDPNode = DPNode & {
  order: number;
  timestamp: number;
};
