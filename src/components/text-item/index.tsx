import { usePage } from "@/lib";
import { DPNode } from "@/types/dp-node";
import { useRef } from "react";
import ItemWrapper from "../item-wrapper";

const TextItem = ({ pageId, item, x, y }: { pageId: string; item: DPNode; x: number; y: number }) => {
  const { selected } = usePage();
  const ref = useRef<HTMLSpanElement>(null);
  const handleBlur = () => {
    if (ref.current) {
      console.log("입력값:", ref.current.innerText);
    }
  };
  return (
    <ItemWrapper itemId={item.id} x={x} y={y}>
      <span ref={ref} contentEditable={selected.includes(item.id)} suppressContentEditableWarning onBlur={handleBlur} data-page-id={pageId} data-item-id={item.id}>
        {item.content || "텍스트를 입력하세요"}
      </span>
    </ItemWrapper>
  );
};

export default TextItem;
