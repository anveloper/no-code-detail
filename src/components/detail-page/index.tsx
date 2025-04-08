import styles from "@/components/detail-page/detail-page.module.css";
import { usePage, useRoot } from "@/lib";

type DetailPageProps = { pageId: string };

const DetailPage = ({ pageId }: DetailPageProps) => {
  const { pageWidth, pageHeight } = useRoot();
  const {} = usePage();
  return (
    <div className={styles.page} data-page-id={pageId} style={{ width: `${pageWidth}px`, height: `${pageHeight}px` }}>
      {pageId}
    </div>
  );
};

export default DetailPage;
