import { usePage } from "@/lib";
import { DPNode } from "@/types/dp-node";
import { CSSProperties, useRef, useState } from "react";
import ItemWrapper from "../item-wrapper";

type AlignType = "flex-start" | "center" | "flex-end";

const TextItem = ({ pageId, item }: { pageId: string; item: DPNode }) => {
  const { edit, select, isSelected, isEditing } = usePage();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 200, h: 80 });
  const [align, setAlign] = useState<{ h: AlignType; v: AlignType }>({ h: "center", v: "center" });

  const style: CSSProperties = {
    display: "inline-flex", // 💡 핵심
    flexDirection: "column",
    alignItems: align.h,
    justifyContent: align.v,
    padding: "8px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflow: "visible",
    userSelect: isEditing(item.id) ? "text" : "none",
    cursor: !isEditing(item.id) && isSelected(item.id) ? "move" : "default",
  };
  return (
    <ItemWrapper itemId={item.id}>
      <div //
        ref={ref}
        contentEditable={isEditing(item.id)}
        suppressContentEditableWarning
        onBlur={() => {
          edit(null);
          if (ref.current) console.log(ref.current.textContent);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (isEditing(item.id)) return;
          if (!isSelected(item.id)) select(item.id);
          else edit(item.id);
        }}
        onInput={() => {
          if (ref.current) {
            const w = ref.current.scrollWidth;
            const h = ref.current.scrollHeight;
            setSize({ w, h });
          }
        }}
        data-page-id={pageId}
        data-item-id={item.id}
        style={style}
      >
        {item.content || "텍스트를 입력하세요"}
      </div>
    </ItemWrapper>
  );
};

export default TextItem;
