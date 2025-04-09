import { usePage } from "@/lib";
import { DPNode } from "@/types/dp-node";
import { CSSProperties, useEffect, useRef, useState } from "react";
import ItemWrapper from "../item-wrapper";

type AlignType = "flex-start" | "center" | "flex-end";

const TextItem = ({ pageId, item }: { pageId: string; item: DPNode }) => {
  const { select, isSelected, isEditing } = usePage();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 200, h: 80 });
  const [align, setAlign] = useState<{ h: AlignType; v: AlignType }>({
    h: "center",
    v: "center",
  });

  const editing = isEditing(item.id);
  const style: CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: align.h,
    justifyContent: align.v,
    padding: "8px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflow: "visible",
    userSelect: editing ? "text" : "none",
    cursor: !editing && isSelected(item.id) ? "move" : "default",
  };

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
    }
  }, [editing]);

  return (
    <ItemWrapper itemId={item.id}>
      <div
        ref={ref}
        contentEditable={editing}
        suppressContentEditableWarning
        onBlur={() => {
          select(item.id);
          if (ref.current) console.log(ref.current.textContent);
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
        tabIndex={0}
        style={style}
      >
        {item.content || "텍스트를 입력하세요."}
      </div>
    </ItemWrapper>
  );
};

export default TextItem;
