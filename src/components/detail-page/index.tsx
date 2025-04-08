import styles from "@/components/detail-page/detail-page.module.css";
import { usePage, useRoot } from "@/lib";
import { PageDPNode } from "@/types/dp-node";

type DetailPageProps = { page: PageDPNode };

const DetailPage = ({ page }: DetailPageProps) => {
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
    ></div>
  );
};

export default DetailPage;
