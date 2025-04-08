import DetailPage from "@/components/detail-page";
import RootController from "@/components/root-controller";
import WidthController from "@/components/width-controller";
import { PageProvider, RootProvider } from "@/lib";
import styles from "@/product-detail/product-detail.module.css";
import { PageDPNode } from "@/types/dp-node";
import { ITEM_TYPE, ItemType } from "@/types/item-type";
import { getUuid } from "@/utils/hash";
import { useCallback, useState } from "react";

const ProductDetail = () => {
  const [pages, setPages] = useState<PageDPNode[]>(() => [
    { id: getUuid(), type: ITEM_TYPE.PAGE, order: 0, timestamp: new Date().getTime() },
    { id: getUuid(), type: ITEM_TYPE.PAGE, order: 1, timestamp: new Date().getTime() + 1 },
  ]);

  const addPage = useCallback((selectedPage = "") => {
    setPages((p) => {
      let order = 0;
      const targetIdx = p.sort((a, b) => (a.order !== b.order ? a.order - b.order : b.timestamp - a.timestamp)).findIndex(({ id }) => id === selectedPage);
      const target = p[targetIdx];
      const next = p[targetIdx + 1];
      if (target && next) order = (target.order + next.order) / 2;
      else if (target) order = target.order + 1;
      return [...p, { id: getUuid(), type: ITEM_TYPE.PAGE, order, timestamp: new Date().getTime() }];
    });
  }, []);

  const addItem = useCallback((pageId: string, type: ItemType) => {}, []);

  const renderPages = useCallback(() => {
    return [...pages]
      .sort((a, b) => (a.order !== b.order ? a.order - b.order : b.timestamp - a.timestamp))
      .map((page) => (
        <PageProvider key={page.id} pageId={page.id}>
          <DetailPage page={page} />
        </PageProvider>
      ));
  }, [pages]);

  return (
    <RootProvider>
      <div className={styles.container} data-template-id={getUuid()}>
        {renderPages()}
      </div>
      <RootController addPage={addPage} addItem={addItem} />
      <WidthController />
    </RootProvider>
  );
};

export default ProductDetail;
