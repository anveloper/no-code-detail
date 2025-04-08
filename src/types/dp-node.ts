export type DPNode = {
  id: string;
  props?: { [key: string]: string | number | boolean };
  children?: DPNode[];
  order?: number;
};

export type PageDPNode = DPNode & {
  order: number;
  timestamp: number;
};
