import styles from "@/components/item-wrapper/size-controller/size-controller.module.css";
import { usePage } from "@/lib";
import { useRef } from "react";

type PointProps = {
  v: "top" | "bottom";
  h: "left" | "right";
  selected: boolean;
  itemId: string;
};

export const Point = ({ v, h, selected, itemId }: PointProps) => {
  const { getItemSize, updateItemSize, resize, select } = usePage();
  const startRef = useRef<{ w: number; h: number; x: number; y: number } | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    resize(itemId);
    const size = getItemSize(itemId);
    startRef.current = {
      w: size?.w ?? 150,
      h: size?.h ?? 100,
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!startRef.current) return;
    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    let newWidth = startRef.current.w;
    let newHeight = startRef.current.h;

    if (h === "right") newWidth = Math.max(30, startRef.current.w + dx);
    if (h === "left") newWidth = Math.max(30, startRef.current.w - dx);
    if (v === "bottom") newHeight = Math.max(30, startRef.current.h + dy);
    if (v === "top") newHeight = Math.max(30, startRef.current.h - dy);

    updateItemSize(itemId, { w: newWidth, h: newHeight });
  };

  const onMouseUp = () => {
    startRef.current = null;
    select(itemId);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return <span className={styles.point} data-v={v} data-h={h} data-selected={selected} onMouseDown={onMouseDown} />;
};
