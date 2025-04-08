import DetailPage from "@/components/detail-page";
import { PageProvider, RootProvider } from "@/lib";
import styles from "@/product-detail/product-detail.module.css";
import { PageDPNode } from "@/types/dp-node";
import { getUuid } from "@/utils/hash";
import { useCallback, useState } from "react";

const ProductDetail = () => {
  const [pages, setPages] = useState<PageDPNode[]>(() => [
    { id: getUuid(), order: 0 },
    { id: getUuid(), order: 1 },
  ]);

  const addPage = useCallback((order = 0) => {
    setPages((p) => [...p, { id: getUuid(), order }]);
  }, []);

  const renderPages = useCallback(() => {
    const sorted = [...pages].sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.id.localeCompare(b.id);
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
    </RootProvider>
  );
};

export default ProductDetail;
