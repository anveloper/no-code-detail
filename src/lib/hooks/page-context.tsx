import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRoot } from "./root-context";

type PageContextType = {
  selected: string[];
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  clear: () => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ pageId, children }: { pageId: string; children: ReactNode }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const { register, clearOthers } = useRoot();

  const clear = () => setSelected([]);
  const isSelected = (id: string) => selected.includes(id);
  const toggle = (id: string) => {
    clearOthers(pageId);
    setSelected((p) => (p.includes(id) ? p.filter((uid) => uid !== id) : [...p, id]));
  };

  const value = useMemo(() => ({ selected, isSelected, toggle, clear }), [selected, isSelected, toggle, clear]);

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
