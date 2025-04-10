import { PAGE_WIDTH } from "@/config/constants/page-width";
import { CSSProperties, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ClearFn = () => void;

const RootContext = createContext<{
  pageWidth: number;
  pageHeight: number;
  selectedPage: string;
  selectedItem: string;
  handlePageWidth: (width: number) => void;
  register: (pageUid: string, clearFn: ClearFn) => void;
  selectPage: (except: string) => void;
  selectItem: (itemId: string) => void;
  wrapSelectedItem: (style: CSSProperties) => void;
  setWrapSelectedItem: (fn: (style: CSSProperties) => void) => void;
  clearItem: () => void;
} | null>(null);

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageWidth, setPageWidth] = useState<number>(PAGE_WIDTH.WEB);
  const [pageHeight] = useState(780);
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [wrapFn, setWrapFn] = useState<(style: CSSProperties) => void>(() => () => {});
  const registry = useRef<Map<string, ClearFn>>(new Map());

  const register = (uid: string, fn: ClearFn) => {
    registry.current.set(uid, fn);
  };

  const selectPage = (except: string) => {
    registry.current.forEach((fn, uid) => {
      if (uid !== except) fn();
    });
    setSelectedItem("");
    setSelectedPage(except);
  };

  const handlePageWidth = useCallback((width: number) => {
    setPageWidth(width);
  }, []);

  const selectItem = useCallback((textId: string) => {
    setSelectedItem(textId);
  }, []);

  const clearItem = useCallback(() => {
    setSelectedItem("");
  }, []);

  const setWrapSelectedItem = useCallback((fn: (style: CSSProperties) => void) => {
    setWrapFn(() => fn);
  }, []);

  useEffect(() => {
    if (selectedPage || !registry.current.entries().next().value) return;
    setSelectedPage(registry.current.keys().next().value);
  }, [selectedPage]);

  const value = useMemo(
    () => ({ pageWidth, pageHeight, selectedPage, selectedItem, handlePageWidth, register, selectPage, selectItem, clearItem, wrapSelectedItem: wrapFn, setWrapSelectedItem }),
    [pageWidth, pageHeight, selectedPage, selectedItem, handlePageWidth, register, selectPage, selectItem, clearItem, wrapFn, setWrapSelectedItem]
  );
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRoot = () => {
  const ctx = useContext(RootContext);
  if (!ctx) throw new Error("useRoot must be inside RootProvider");
  return ctx;
};
