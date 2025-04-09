import { PageDPNode } from "@/types/dp-node";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRoot } from "./root-context";

type PageContextType = {
  getItemPos: (id: string) => { x: number; y: number };
  updateItemPos: (id: string, pos: { x: number; y: number }) => void;
  isEditing: (id: string) => boolean;
  notAllowDrag: () => boolean;
  edit: (id: string | null) => void;
  isSelected: (id: string) => boolean;
  select: (id: string) => void;
  clear: () => void;
};

type Mode = { type: "none" } | { type: "select"; id: string } | { type: "edit"; id: string };

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ page: origin, children }: { page: PageDPNode; children: ReactNode }) => {
  const { register, selectPage, pageWidth, pageHeight } = useRoot();
  const [page, setPage] = useState<PageDPNode>(origin);

  const getItemPos = (itemId: string) => {
    const pos = page.items?.find(({ id }) => id === itemId)?.pos;
    return pos || { x: pageWidth / 2, y: pageHeight / 2 };
  };

  const updateItemPos = useCallback((id: string, pos: { x: number; y: number }) => {
    setPage((p) => ({ ...p, items: p.items?.map((item) => (item.id === id ? { ...item, pos } : item)) }));
  }, []);

  const [mode, setMode] = useState<Mode>({ type: "none" });

  const isSelected = (id: string) => mode.type === "select" && mode.id === id;
  const isEditing = (id: string) => mode.type === "edit" && mode.id === id;
  const notAllowDrag = () => mode.type === "edit";

  const clear = useCallback(() => {
    setMode({ type: "none" });
  }, []);

  const edit = useCallback((id: string | null) => {
    setMode(id ? { type: "edit", id } : { type: "none" });
  }, []);

  const select = useCallback(
    (id: string) => {
      selectPage(page.id);
      setMode({ type: "select", id });
    },
    [page.id]
  );

  const value = useMemo(
    //
    () => ({ getItemPos, updateItemPos, isEditing, notAllowDrag, edit, isSelected, select, clear }),
    [getItemPos, updateItemPos, isEditing, notAllowDrag, edit, isSelected, select, clear]
  );

  useEffect(() => {
    register(page.id, clear);
  }, [page.id]);

  useEffect(() => {
    setPage(origin);
  }, [origin]);

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePage = () => {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePage must be used within a PageProvider");
  return ctx;
};
