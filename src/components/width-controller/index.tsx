import styles from "@/components/width-controller/width-controller.module.css";
import { PAGE_WIDTH_LABEL, PageWidthType, pageWidthValues } from "@/config/constants/page-width";
import { useRoot } from "@/lib";
import { ChangeEvent } from "react";

const WidthController = () => {
  const { pageWidth, handlePageWidth } = useRoot();

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    handlePageWidth(Number(e.target.value || 0));
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value.replace(/\,/g, ""));
    if (isNaN(num)) return;
    handlePageWidth(num);
  };

  return (
    <div className={styles.selector}>
      <select value={pageWidthValues.includes(pageWidth) ? pageWidth : 0} onChange={handleSelect}>
        {pageWidthValues.map((value, idx) => {
          return (
            <option key={idx} value={value}>
              {PAGE_WIDTH_LABEL[value as PageWidthType]?.label || ""}
            </option>
          );
        })}
        <option value={1000}>{"직접입력"}</option>
      </select>
      <input type="text" value={pageWidth.toLocaleString()} onChange={handleInput} maxLength={4} />
    </div>
  );
};

export default WidthController;
