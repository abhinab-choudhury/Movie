import { createContext, useContext, useState, type ReactNode } from 'react';

interface SearchContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <SearchContext.Provider value={{ open, setOpen }}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used within SearchProvider');
  return ctx;
}
