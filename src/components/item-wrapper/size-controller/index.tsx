import { usePage } from "@/lib";
import { Point } from "./size-point";

type SizeControllerProps = {
  itemId: string;
};

const SizeController = ({ itemId }: SizeControllerProps) => {
  const { isSelected, isResizing } = usePage();
  const selected = isSelected(itemId) || isResizing(itemId);

  return (
    <>
      <Point itemId={itemId} v={"top"} h={"left"} selected={selected} />
      <Point itemId={itemId} v={"top"} h={"right"} selected={selected} />
      <Point itemId={itemId} v={"bottom"} h={"left"} selected={selected} />
      <Point itemId={itemId} v={"bottom"} h={"right"} selected={selected} />
    </>
  );
};

export default SizeController;
