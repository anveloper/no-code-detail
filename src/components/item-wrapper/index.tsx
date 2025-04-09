import styles from "@/components/item-wrapper/item-wrapper.module.css";
import { usePage, useRoot } from "@/lib";
import { CSSProperties, ReactNode, useRef, useState } from "react";

type ItemWrapperProps = {
  itemId: string;
  children: ReactNode;
};

const ItemWrapper = ({ itemId, children }: ItemWrapperProps) => {
  const { pageWidth, pageHeight } = useRoot();
  const { isEditing, isSelected, select, edit, notAllowDrag } = usePage();

  const [pos, setPos] = useState({ x: pageWidth / 2, y: pageHeight / 2 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (notAllowDrag()) return;

    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      isDragging.current = true;
    }

    if (notAllowDrag() || !isDragging.current) return;

    dragStart.current = { x: e.clientX, y: e.clientY };
    setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditing(itemId)) return;
    select(itemId);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    edit(itemId);
  };

  const handleBlur = () => {
    edit(null);
  };

  const style: CSSProperties = {
    borderRadius: "4px",
    padding: "4px",
    position: "absolute",
    top: `${pos.y}px`,
    left: `${pos.x}px`,
    transform: "translate(-50%, -50%)",
    width: "max-content",
    height: "max-content",
  };

  return (
    <div
      className={styles.wrapper}
      style={style}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      data-selected={isSelected(itemId)}
      data-editing={isEditing(itemId)}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default ItemWrapper;
