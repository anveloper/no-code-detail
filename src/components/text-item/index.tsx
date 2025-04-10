import { usePage, useRoot } from "@/lib";
import { DPNode } from "@/types/dp-node";
import { CSSProperties, useEffect, useRef, useState } from "react";
import ItemWrapper from "../item-wrapper";

type AlignType = "flex-start" | "center" | "flex-end";

const TEXT_ALIGN = {
  "flex-start": "left",
  center: "center",
  "flex-end": "right",
} as const;

const TextItem = ({ pageId, item }: { pageId: string; item: DPNode }) => {
  const { setWrapSelectedItem } = useRoot();
  const { select, isSelected, isEditing, getItemContent, updateItemSize, updateItemContent } = usePage();
  const ref = useRef<HTMLDivElement>(null);

  const [align, setAlign] = useState<{ h: AlignType; v: AlignType }>({
    h: "center",
    v: "center",
  });

  const selected = isSelected(item.id);
  const editing = isEditing(item.id);

  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    textAlign: TEXT_ALIGN[align.h],
    alignItems: align.h,
    justifyContent: align.v,
    overflow: "visible",
    width: "100%",
    height: "100%",
    whiteSpace: "break-spaces",
    userSelect: editing ? "text" : "none",
    cursor: !editing && isSelected(item.id) ? "move" : "default",
    ...item.style,
  };

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
    }
  }, [editing]);

  const handleBlur = () => {
    select(item.id);
    if (!ref.current) return;
    const newText = ref.current.innerText.trim();
    updateItemContent(item.id, newText || ""); // 상태 업데이트
    // 이후 서버 저장 등도 가능
  };

  const handleHeight = () => {
    if (!ref.current) return;

    const newHeight = ref.current.scrollHeight;

    updateItemSize(item.id, {
      w: item.size?.w ?? ref.current.offsetWidth,
      h: newHeight,
    });
  };

  useEffect(() => {
    if (!selected) return;
    setWrapSelectedItem((style: CSSProperties) => {
      if (!ref.current) return;
      Object.assign(ref.current.style, style);
    });
  }, [selected, setWrapSelectedItem]);

  const content = getItemContent(item.id);
  return (
    <ItemWrapper itemId={item.id}>
      <div //
        ref={ref}
        contentEditable={editing}
        suppressContentEditableWarning
        onBlur={handleBlur}
        onInput={handleHeight}
        tabIndex={0}
        style={style}
        data-type={item.type}
        data-page-id={pageId}
        data-item-id={item.id}
      >
        {content}
      </div>
    </ItemWrapper>
  );
};

export default TextItem;
