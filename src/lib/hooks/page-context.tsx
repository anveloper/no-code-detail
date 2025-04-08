import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRoot } from "./root-context";

type PageContextType = {
  selected: string[];
  isSelected: (id: string) => boolean;
  toggle: (id: string, isPage?: boolean) => void;
  toggleOne: (id: string) => void;
  clear: () => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider = ({ pageId, children }: { pageId: string; children: ReactNode }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const { register, clearOthers } = useRoot();

  const clear = () => setSelected([]);
  const isSelected = (id: string) => selected.includes(id);

  const toggle = useCallback(
    (id: string, isPage = false) => {
      clearOthers(pageId);
      if (isPage) return;
      setSelected((p) => (p.includes(id) ? p.filter((uid) => uid !== id) : [...p, id]));
    },
    [pageId, clearOthers]
  );
  const toggleOne = useCallback((id: string) => {
    setSelected((p) => (p.length !== 1 || !p.includes(id) ? [id] : []));
  }, []);

  const value = useMemo(
    () => ({
      selected,
      isSelected,
      toggle,
      toggleOne,
      clear,
    }),
    [selected, isSelected, toggle, toggleOne, clear]
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
