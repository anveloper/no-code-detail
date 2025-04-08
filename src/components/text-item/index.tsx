import { usePage } from "@/lib";
import { DPNode } from "@/types/dp-node";
import ItemWrapper from "../item-wrapper";

const TextItem = ({ pageId, item, x, y }: { pageId: string; item: DPNode; x: number; y: number }) => {
  const { selected } = usePage();
  return (
    <ItemWrapper itemId={item.id} x={x} y={y}>
      <span contentEditable={selected.includes(item.id)}></span>
    </ItemWrapper>
  );
};

export default TextItem;
