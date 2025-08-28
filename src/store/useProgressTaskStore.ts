import { create } from "zustand";

import { persist } from "zustand/middleware";
import { normalize } from "@/utils/validations";

import { KanbanCardProps } from "@/components/KanbanCard";

type ProgressTaskStore = {
  progressTasks: KanbanCardProps[];
  loading: boolean;
  error: string | null;
  fetchProgressTasks: () => Promise<void>;
  progressUpdate: (item: KanbanCardProps) => void;
  removeProgressTaskByIndex: (index: number) => void;
  filterProgressTasks: (query: string) => void;
};

export const useProgressTaskStore = create<ProgressTaskStore>()(
  persist(
    (set, get) => ({
      progressTasks: [],
      loading: false,
      error: null,
      progressUpdate: (item) =>
        set((state) => ({
          progressTasks: [...state.progressTasks, item],
        })),
      fetchProgressTasks: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/data/progress.json");
          const data = await res.json();
          set({ progressTasks: data });
        } catch (err) {
          set({ error: "Failed to load tasks" });
        } finally {
          set({ loading: false });
        }
      },
      removeProgressTaskByIndex: (index: number) =>
        set((state) => {
          if (index < 0 || index >= state.progressTasks.length) {
            return {};
          }
          const newTasks = [...state.progressTasks];
          newTasks.splice(index, 1);
          return { progressTasks: newTasks };
        }),
      filterProgressTasks: async (query) => {
        const normalizedQuery = normalize(query);
        const res = await fetch("/data/progress.json");
        const allTasks = await res.json();
        const filtered = allTasks.filter((task: any) =>
          normalize(task.title).includes(normalizedQuery)
        );
        set({ progressTasks: filtered });
      },
    }),
    {
      name: "progressTasks", // key in localStorage
      partialize: (state) => ({ progressTasks: state.progressTasks }),
      onRehydrateStorage: () => (state) => {
        if (state && state.progressTasks.length === 0) {
          state.fetchProgressTasks();
        }
      },
    }
  )
);
