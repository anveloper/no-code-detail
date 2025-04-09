import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRoot } from "./root-context";

type PageContextType = {
  isEditing: (id: string) => boolean;
  notAllowDrag: () => boolean;
  edit: (id: string | null) => void;
  isSelected: (id: string) => boolean;
  select: (id: string) => void;
  clear: () => void;
};

type Mode = { type: "none" } | { type: "select"; id: string } | { type: "edit"; id: string };

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ pageId, children }: { pageId: string; children: ReactNode }) => {
  const { register, selectPage } = useRoot();
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
      selectPage(pageId);
      setMode({ type: "select", id });
    },
    [pageId]
  );

  const value = useMemo(
    //
    () => ({ isEditing, notAllowDrag, edit, isSelected, select, clear }),
    [isEditing, notAllowDrag, edit, isSelected, select, clear]
  );

  useEffect(() => {
    register(pageId, clear);
  }, [pageId]);

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePage = () => {
  const ctx = useContext(PageContext);
  if (!ctx) throw new Error("usePage must be used within a PageProvider");
  return ctx;
};
