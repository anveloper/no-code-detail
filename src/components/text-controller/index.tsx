import { FONTS } from "@/config/fonts";
import { useRoot } from "@/lib";
import { CSSProperties, useEffect, useState } from "react";
import styles from "./text-controller.module.css";
const TextController = () => {
  const { selectedItem, wrapSelectedItem } = useRoot();
  const [font, setFont] = useState<string>(FONTS[0].value);

  const handleChangeFont = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value;
    setFont(selectedFont);
    if (!wrapSelectedItem) return;
    const style: CSSProperties = { fontFamily: selectedFont };
    wrapSelectedItem(style);
  };

  useEffect(() => {
    const el = document.querySelector(`[data-type=text][data-item-id="${selectedItem}"]`);
    if (el instanceof HTMLElement) {
      const font = el.style.fontFamily;
      if (font) setFont(font);
    } else setFont(FONTS[0].value);
  }, [selectedItem]);

  return (
    <div className={styles.styler}>
      <select value={font || FONTS[0].value} onChange={handleChangeFont}>
        {FONTS.map(({ label, value }, key) => {
          return (
            <option key={key} value={value} style={{ fontFamily: value }}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TextController;
