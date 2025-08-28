import { create } from "zustand";

import { persist } from "zustand/middleware";
import { normalize } from "@/utils/validations";

import { KanbanCardProps } from "@/components/KanbanCard";

type RejectTaskStore = {
  rejectTasks: KanbanCardProps[];
  loading: boolean;
  error: string | null;
  fetchRejectTasks: () => Promise<void>;
  rejectUpdate: (item: KanbanCardProps) => void;
  removeRejectTaskByIndex: (index: number) => void;
  filterRejectTasks: (query: string) => void;
};

export const useRejectTaskStore = create<RejectTaskStore>()(
  persist(
    (set, get) => ({
      rejectTasks: [],
      loading: false,
      error: null,
      rejectUpdate: (item) =>
        set((state) => ({
          rejectTasks: [...state.rejectTasks, item],
        })),
      fetchRejectTasks: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/data/reject.json");
          const data = await res.json();
          set({ rejectTasks: data });
        } catch (err) {
          set({ error: "Failed to load tasks" });
        } finally {
          set({ loading: false });
        }
      },
      removeRejectTaskByIndex: (index: number) =>
        set((state) => {
          if (index < 0 || index >= state.rejectTasks.length) {
            // invalid index, return unchanged
            return {};
          }
          const newTasks = [...state.rejectTasks];
          newTasks.splice(index, 1);
          return { rejectTasks: newTasks };
        }),
      filterRejectTasks: async (query) => {
        const normalizedQuery = normalize(query);
        const res = await fetch("/data/reject.json");
        const allTasks = await res.json();
        const filtered = allTasks.filter((task: any) =>
          normalize(task.title).includes(normalizedQuery)
        );
        set({ rejectTasks: filtered });
      },
    }),
    {
      name: "rejectTasks", // key in localStorage
      partialize: (state) => ({ rejectTasks: state.rejectTasks }),
      onRehydrateStorage: () => (state) => {
        if (state && state.rejectTasks.length === 0) {
          state.fetchRejectTasks();
        }
      },
    }
  )
);
