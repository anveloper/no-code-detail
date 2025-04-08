import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type ClearFn = () => void;

const RootContext = createContext<{
  pageWidth: number;
  handlePageWidth: (width: number) => void;
  register: (pageUid: string, clearFn: ClearFn) => void;
  clearOthers: (except: string) => void;
} | null>(null);

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageWidth, setPageWidth] = useState(1280);
  const registry = useRef<Map<string, ClearFn>>(new Map());

  const register = (uid: string, fn: ClearFn) => {
    registry.current.set(uid, fn);
  };

  const clearOthers = (except: string) => {
    registry.current.forEach((fn, uid) => {
      if (uid !== except) fn();
    });
  };

  const handlePageWidth = useCallback((width: number) => {
    setPageWidth(width);
  }, []);

  const value = useMemo(() => ({ pageWidth, handlePageWidth, register, clearOthers }), [pageWidth, handlePageWidth, register, clearOthers]);
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRoot = () => {
  const ctx = useContext(RootContext);
  if (!ctx) throw new Error("useRoot must be inside RootProvider");
  return ctx;
};
