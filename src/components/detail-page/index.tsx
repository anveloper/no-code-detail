import styles from "@/components/detail-page/detail-page.module.css";
import { useRoot } from "@/lib";
import { PageDPNode } from "@/types/dp-node";
import { ITEM_TYPE } from "@/types/item-type";
import { memo } from "react";
import ImageItem from "../image-item";
import TextItem from "../text-item";

type DetailPageProps = { page: PageDPNode };

const DetailPage = memo(({ page }: DetailPageProps) => {
  const { pageWidth, pageHeight, selectedPage, selectPage } = useRoot();
  return (
    <div //
      className={styles.page}
      data-page-id={page.id}
      style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}
      onClick={() => selectPage(page.id)}
      data-selected={page.id === selectedPage}
      data-order={page.order}
    >
      {page.items?.map((item) => {
        if (item.type === ITEM_TYPE.IMAGE) return <ImageItem key={item.id} pageId={page.id} item={item} />;
        else return <TextItem key={item.id} pageId={page.id} item={item} />;
      })}
    </div>
  );
});

export default DetailPage;
