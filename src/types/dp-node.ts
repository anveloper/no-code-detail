import { ItemType } from "./item-type";

export type DPNode = {
  id: string;
  type: ItemType;
  props?: { [key: string]: string | number | boolean };
  order?: number;
  content?: string;
  size?: { w: number; h: number };
  pos?: { x: number; y: number };
  items?: DPNode[];
};

export type PageDPNode = DPNode & {
  order: number;
  timestamp: number;
};

export type UpdaterType<T> = (p: T) => T;
export type PageUpdater = PageDPNode | UpdaterType<PageDPNode>;
