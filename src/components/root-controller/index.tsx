import styles from "@/components/root-controller/root-controller.module.css";
import { PAGE_WIDTH_LABEL, PageWidthType, pageWidthValues } from "@/config/constants/page-width";
import { useRoot } from "@/lib";
import { ChangeEvent } from "react";
import { BiPlus } from "react-icons/bi";
import { BsCardImage, BsType } from "react-icons/bs";

type RootControllerProps = { addPage: (order?: number) => void };

const RootController = ({ addPage }: RootControllerProps) => {
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
    <div className={styles.controller}>
      <span>
        <BsCardImage />
      </span>
      <span>
        <BsType />
      </span>
      <span onClick={() => addPage()}>
        <BiPlus />
      </span>
      <div className={styles.selector}>
        <select value={pageWidthValues.includes(pageWidth) ? pageWidth : 0} onChange={handleSelect}>
          {pageWidthValues.map((value, idx) => {
            return (
              <option key={idx} value={value}>
                {PAGE_WIDTH_LABEL[value as PageWidthType]?.label || ""}
              </option>
            );
          })}
          <option value={0}>{"직접입력"}</option>
        </select>
        <input type="text" value={pageWidth.toLocaleString()} onChange={handleInput} maxLength={4} />
      </div>
    </div>
  );
};

export default RootController;
