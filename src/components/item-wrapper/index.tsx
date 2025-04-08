import styles from "@/components/item-wrapper/item-wrapper.module.css";
import { usePage } from "@/lib";
import { ReactNode, useRef, useState } from "react";
type ItemWrapperProps = {
  itemId: string;
  children: ReactNode;
  x: number;
  y: number;
};
const ItemWrapper = ({ itemId, children, x, y }: ItemWrapperProps) => {
  const { toggle, toggleOne, selected } = usePage();

  const [pos, setPos] = useState({ x, y });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selected) return; // 선택된 아이템만 드래그 가능

    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

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
    if (e.ctrlKey || e.metaKey) toggle(itemId);
    else toggleOne(itemId);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      style={{ position: "absolute", top: `${pos.y}px`, left: `${pos.x}px`, transform: "translate(-50%, -50%)" }}
      data-selected={selected.includes(itemId)}
    >
      {children}
    </div>
  );
};

export default ItemWrapper;
