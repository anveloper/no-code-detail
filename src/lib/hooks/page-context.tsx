import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRoot } from "./root-context";

type PageContextType = {
  isEditing: (id: string) => boolean;
  edit: (id: string | null) => void;
  isSelected: (id: string) => boolean;
  toggle: (id: string, isPage?: boolean) => void;
  clear: () => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ pageId, children }: { pageId: string; children: ReactNode }) => {
  const { register, clearOthers } = useRoot();

  const [editingId, setEditingId] = useState<string | null>(null);
  const isEditing = useCallback((id: string) => editingId === id, [editingId]);
  const edit = useCallback(
    (id: string | null) => {
      clearOthers(pageId);
      setEditingId((p) => (p === id ? null : id));
    },
    [pageId, clearOthers]
  );

  const [selected, setSelected] = useState<string[]>([]);
  const isSelected = useCallback((id: string) => selected.includes(id), [selected]);
  const toggle = useCallback(
    (id: string, isPage = false) => {
      clearOthers(pageId);
      if (isPage) return;
      setSelected((p) => (p.includes(id) ? p.filter((uid) => uid !== id) : [...p, id]));
    },
    [pageId, clearOthers]
  );

  const clear = useCallback(() => {
    setEditingId(null);
    setSelected([]);
  }, []);

  const value = useMemo(() => ({ isEditing, edit, isSelected, toggle, clear }), [isEditing, edit, isSelected, toggle, clear]);

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
