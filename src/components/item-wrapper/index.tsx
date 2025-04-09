import styles from "@/components/item-wrapper/item-wrapper.module.css";
import { usePage } from "@/lib";
import { CSSProperties, ReactNode, useRef, useState } from "react";
type ItemWrapperProps = {
  itemId: string;
  children: ReactNode;
  x: number;
  y: number;
};
const ItemWrapper = ({ itemId, children, x, y }: ItemWrapperProps) => {
  const { toggle, isSelected } = usePage();

  const [pos, setPos] = useState({ x, y });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isSelected(itemId)) return;

    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };

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
    toggle(itemId);
  };

  const style: CSSProperties = {
    padding: "4px",
    position: "absolute",
    top: `${pos.y}px`,
    left: `${pos.x}px`,
    transform: "translate(-50%, -50%)",
    width: "max-content",
    height: "max-content",
  };
  return (
    <div className={styles.wrapper} onClick={handleClick} onMouseDown={handleMouseDown} style={style} data-selected={isSelected(itemId)}>
      {children}
    </div>
  );
};

export default ItemWrapper;
