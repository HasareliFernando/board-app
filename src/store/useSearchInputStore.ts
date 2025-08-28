import { create } from "zustand";
import { persist } from "zustand/middleware";

type SearchInputStore = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useSearchInputStore = create<SearchInputStore>()(
  persist(
    (set) => ({
      searchTerm: "",
      setSearchTerm: (term) => set({ searchTerm: term }),
      clearSearchTerm: () => set({ searchTerm: "" }),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "search-term",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
