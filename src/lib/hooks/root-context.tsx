import { PAGE_WIDTH } from "@/config/constants/page-width";
import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type ClearFn = () => void;

const RootContext = createContext<{
  pageWidth: number;
  pageHeight: number;
  selectedPage: string;
  handlePageWidth: (width: number) => void;
  register: (pageUid: string, clearFn: ClearFn) => void;
  clearOthers: (except: string) => void;
} | null>(null);

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageWidth, setPageWidth] = useState<number>(PAGE_WIDTH.WEB);
  const [pageHeight] = useState(780);
  const [selectedPage, setSelectedPage] = useState("");
  const registry = useRef<Map<string, ClearFn>>(new Map());

  const register = (uid: string, fn: ClearFn) => {
    registry.current.set(uid, fn);
  };

  const clearOthers = (except: string) => {
    registry.current.forEach((fn, uid) => {
      if (uid !== except) fn();
    });
    setSelectedPage(except);
  };

  const handlePageWidth = useCallback((width: number) => {
    setPageWidth(width);
  }, []);

  const value = useMemo(
    () => ({
      pageWidth,
      pageHeight,
      selectedPage,
      handlePageWidth,
      register,
      clearOthers,
    }),
    [pageWidth, pageHeight, selectedPage, handlePageWidth, register, clearOthers]
  );
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRoot = () => {
  const ctx = useContext(RootContext);
  if (!ctx) throw new Error("useRoot must be inside RootProvider");
  return ctx;
};
