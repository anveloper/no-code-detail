import { usePage } from "@/lib";
import { DPNode } from "@/types/dp-node";
import ItemWrapper from "../item-wrapper";

const ImageItem = ({ pageId, item, x, y }: { pageId: string; item: DPNode; x: number; y: number }) => {
  const { selected } = usePage();
  return (
    <ItemWrapper itemId={item.id} x={x} y={y}>
      <span data-page-id={pageId} data-item-id={item.id}>
        ImageItem
      </span>
    </ItemWrapper>
  );
};

export default ImageItem;
