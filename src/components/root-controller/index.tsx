import styles from "@/components/root-controller/root-controller.module.css";
import { useRoot } from "@/lib";
import { ITEM_TYPE, ItemType } from "@/types/item-type";
import { BiPlus } from "react-icons/bi";
import { BsCardImage, BsType } from "react-icons/bs";

type RootControllerProps = { addPage: (selectedPage?: string) => void; addItem: (pageId: string, type: ItemType) => void };

const RootController = ({ addPage, addItem }: RootControllerProps) => {
  const { selectedPage } = useRoot();

  return (
    <div className={styles.controller}>
      <span onClick={() => addItem(selectedPage, ITEM_TYPE.IMAGE)}>
        <BsCardImage />
      </span>
      <span onClick={() => addItem(selectedPage, ITEM_TYPE.TEXT)}>
        <BsType />
      </span>
      <span onClick={() => addPage(selectedPage)}>
        <BiPlus />
      </span>
    </div>
  );
};

export default RootController;
