import styles from "@/components/item-wrapper/item-wrapper.module.css";
import { usePage, useRoot } from "@/lib";
import { CSSProperties, ReactNode, useRef, useState } from "react";
type ItemWrapperProps = {
  itemId: string;
  children: ReactNode;
};
const ItemWrapper = ({ itemId, children }: ItemWrapperProps) => {
  const { pageWidth, pageHeight } = useRoot();
  const { edit, clear, select, isEditing, isSelected, notAllowDrag } = usePage();

  const [pos, setPos] = useState({ x: pageWidth / 2, y: pageHeight / 2 });
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (notAllowDrag()) return;
    select(itemId);
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (notAllowDrag() || !isDragging.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    dragStart.current = { x: e.clientX, y: e.clientY };

    setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
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
    <div //
      ref={ref}
      className={styles.wrapper}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      style={style}
      data-selected={isSelected(itemId)}
      data-editing={isEditing(itemId)}
    >
      {children}
    </div>
  );
};

export default ItemWrapper;
