import { usePage } from "@/lib";
import { DPNode } from "@/types/dp-node";
import { useRef } from "react";
import ItemWrapper from "../item-wrapper";

const ImageItem = ({ pageId, item }: { pageId: string; item: DPNode }) => {
  const { isSelected } = usePage();
  const imageRef = useRef("");

  return (
    <ItemWrapper itemId={item.id}>
      <span //
        data-page-id={pageId}
        data-item-id={item.id}
        data-selected={isSelected(item.id)}
      >
        {imageRef.current ? <img src={imageRef.current} /> : <span>{"이미지"}</span>}
      </span>
    </ItemWrapper>
  );
};

export default ImageItem;
