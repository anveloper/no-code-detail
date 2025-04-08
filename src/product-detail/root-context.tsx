import { createContext, useContext, useRef } from "react";

type ClearFn = () => void;

const RootContext = createContext<{
  register: (pageUid: string, clearFn: ClearFn) => void;
  clearOthers: (except: string) => void;
} | null>(null);

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const registry = useRef<Map<string, ClearFn>>(new Map());

  const register = (uid: string, fn: ClearFn) => {
    registry.current.set(uid, fn);
  };

  const clearOthers = (except: string) => {
    registry.current.forEach((fn, uid) => {
      if (uid !== except) fn();
    });
  };

  return <RootContext.Provider value={{ register, clearOthers }}>{children}</RootContext.Provider>;
};

export const useRoot = () => {
  const ctx = useContext(RootContext);
  if (!ctx) throw new Error("useSelectedRoot must be inside SelectedRootProvider");
  return ctx;
};
