import styles from "@/components/detail-page/detail-page.module.css";
import { usePage, useRoot } from "@/lib";
import { PageDPNode } from "@/types/dp-node";
import { ITEM_TYPE } from "@/types/item-type";
import { memo } from "react";
import ImageItem from "../image-item";
import TextItem from "../text-item";

type DetailPageProps = { page: PageDPNode };

const DetailPage = memo(({ page }: DetailPageProps) => {
  const { pageWidth, pageHeight, selectedPage } = useRoot();
  const { toggle } = usePage();
  return (
    <div //
      className={styles.page}
      data-page-id={page.id}
      style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}
      onClick={() => toggle(page.id, true)}
      data-selected={page.id === selectedPage}
      data-order={page.order}
    >
      {page.items?.map((item) => {
        if (item.type === ITEM_TYPE.IMAGE) return <ImageItem key={item.id} pageId={page.id} item={item} x={pageWidth / 2} y={pageHeight / 2} />;
        else return <TextItem key={item.id} pageId={page.id} item={item} x={pageWidth / 2} y={pageHeight / 2} />;
      })}
    </div>
  );
});

export default DetailPage;
