import { ReactNode } from "react";

type ItemWrapperProps = {
  pageUid: string;
  children: ReactNode;
  x: number;
  y: number;
};
const ItemWrapper = ({ pageUid, children }: ItemWrapperProps) => {
  return <div>{children}</div>;
};

export default ItemWrapper;
