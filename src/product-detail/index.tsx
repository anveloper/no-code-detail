import DetailPage from "@/components/detail-page";
import RootController from "@/components/root-controller";
import { PageProvider, RootProvider } from "@/lib";
import styles from "@/product-detail/product-detail.module.css";
import { PageDPNode } from "@/types/dp-node";
import { getUuid } from "@/utils/hash";
import { useCallback, useState } from "react";

const ProductDetail = () => {
  const [pages, setPages] = useState<PageDPNode[]>(() => [
    { id: getUuid(), order: 0, timestamp: new Date().getTime() },
    { id: getUuid(), order: 1, timestamp: new Date().getTime() + 1 },
  ]);

  const addPage = useCallback((order = 0) => {
    setPages((p) => [...p, { id: getUuid(), order, timestamp: new Date().getTime() }]);
  }, []);

  const renderPages = useCallback(() => {
    const sorted = [...pages].sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.timestamp - b.timestamp;
    });

    return sorted.map((page) => (
      <PageProvider key={page.id} pageId={page.id}>
        <DetailPage pageId={page.id} />
      </PageProvider>
    ));
  }, [pages]);

  return (
    <RootProvider>
      <div className={styles.container} data-template-id={getUuid()}>
        {renderPages()}
      </div>
      <RootController addPage={addPage} />
    </RootProvider>
  );
};

export default ProductDetail;
