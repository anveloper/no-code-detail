import { PageDPNode, PageUpdater } from "@/types/dp-node";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRoot } from "./root-context";

type PageContextType = {
  getItemPos: (id: string) => { x: number; y: number };
  updateItemPos: (id: string, pos: { x: number; y: number }) => void;
  getItemSize: (id: string) => { w: number; h: number };
  updateItemSize: (id: string, size: { w: number; h: number }) => void;
  getItemContent: (id: string) => string;
  updateItemContent: (id: string, content: string) => void;
  isEditing: (id: string) => boolean;
  notAllowDrag: () => boolean;
  edit: (id: string | null) => void;
  isSelected: (id: string) => boolean;
  select: (id: string) => void;
  isResizing: (id: string) => boolean;
  resize: (id: string) => void;
  clear: () => void;
};

type Mode = { type: "none" } | { type: "select"; id: string } | { type: "edit"; id: string } | { type: "resize"; id: string };

const PageContext = createContext<PageContextType | undefined>(undefined);

type PageProviderProps = {
  page: PageDPNode;
  updatePage: (updater: PageUpdater) => void;
  children: ReactNode;
};

export const PageProvider = ({ page, updatePage, children }: PageProviderProps) => {
  const { register, selectPage, pageWidth, pageHeight } = useRoot();

  const getItemPos = (itemId: string) => {
    const pos = page.items?.find(({ id }) => id === itemId)?.pos;
    return pos || { x: pageWidth / 2, y: pageHeight / 2 };
  };

  const updateItemPos = useCallback((id: string, pos: { x: number; y: number }) => {
    updatePage((p) => ({ ...p, items: p.items?.map((item) => (item.id === id ? { ...item, pos } : item)) }));
  }, []);

  const getItemSize = (itemId: string) => {
    const size = page.items?.find(({ id }) => id === itemId)?.size;
    return size || { w: 160, h: 80 };
  };

  const updateItemSize = useCallback((id: string, size: { w: number; h: number }) => {
    updatePage((p) => ({ ...p, items: p.items?.map((item) => (item.id === id ? { ...item, size } : item)) }));
  }, []);

  const getItemContent = (itemId: string) => {
    const content = page.items?.find(({ id }) => id === itemId)?.content;
    return content || "내용을 입력해주세요.";
  };

  const updateItemContent = useCallback((id: string, content: string) => {
    updatePage((p) => ({ ...p, items: p.items?.map((item) => (item.id === id ? { ...item, content } : item)) }));
  }, []);

  const [mode, setMode] = useState<Mode>({ type: "none" });

  const isEditing = (id: string) => mode.type === "edit" && mode.id === id;
  const isSelected = (id: string) => mode.type === "select" && mode.id === id;
  const isResizing = (id: string) => mode.type === "resize" && mode.id === id;
  const notAllowDrag = () => mode.type === "edit";

  const clear = useCallback(() => {
    setMode({ type: "none" });
  }, []);

  const edit = useCallback(
    (id: string | null) => {
      selectPage(page.id);
      setMode(id ? { type: "edit", id } : { type: "none" });
    },
    [page.id]
  );

  const select = useCallback(
    (id: string) => {
      selectPage(page.id);
      setMode({ type: "select", id });
    },
    [page.id]
  );
  const resize = useCallback(
    (id: string) => {
      setMode({ type: "resize", id });
    },
    [page.id]
  );

  const value = useMemo(
    //
    () => ({ getItemPos, updateItemPos, getItemSize, updateItemSize, getItemContent, updateItemContent, isEditing, notAllowDrag, edit, isSelected, select, isResizing, resize, clear }),
    [getItemPos, updateItemPos, getItemSize, updateItemSize, getItemContent, updateItemContent, isEditing, notAllowDrag, edit, isSelected, select, isResizing, resize, clear]
  );

  useEffect(() => {
    register(page.id, clear);
  }, [page.id]);

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePage = () => {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePage must be used within a PageProvider");
  return ctx;
};
