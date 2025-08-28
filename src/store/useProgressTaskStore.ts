import { create } from "zustand";

import { persist } from "zustand/middleware";
import { normalize } from "@/utils/validations";

import { TaskCardProps } from "@/components/KanbanCard";

type ProgressTaskStore = {
  progresstasks: TaskCardProps[];
  loading: boolean;
  error: string | null;
  fetchProgressTasks: () => Promise<void>;
  progressUpdate: (item: TaskCardProps) => void;
  removeProgressTaskByIndex: (index: number) => void;
  filterProgressTasks: (query: string) => void;
};

export const useProgressTaskStore = create<ProgressTaskStore>()(
  persist(
    (set, get) => ({
      progresstasks: [],
      loading: false,
      error: null,
      progressUpdate: (item) =>
        set((state) => ({
          progresstasks: [...state.progresstasks, item],
        })),
      fetchProgressTasks: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/data/progress.json");
          const data = await res.json();
          set({ progresstasks: data });
        } catch (err) {
          set({ error: "Failed to load tasks" });
        } finally {
          set({ loading: false });
        }
      },
      removeProgressTaskByIndex: (index: number) =>
        set((state) => {
          if (index < 0 || index >= state.progresstasks.length) {
            return {};
          }
          const newTasks = [...state.progresstasks];
          newTasks.splice(index, 1);
          return { progresstasks: newTasks };
        }),
      filterProgressTasks: async  (query) => {
        const normalizedQuery = normalize(query);
        const res = await fetch("/data/progress.json");
        const allTasks = await res.json();
        const filtered = allTasks.filter((task: any) =>
          normalize(task.title).includes(normalizedQuery)
        );
        set({ progresstasks: filtered });
      },
    }),
    {
      name: "progresstasks", // key in localStorage
      partialize: (state) => ({ progresstasks: state.progresstasks }),
      onRehydrateStorage: () => (state) => {
        if (state && state.progresstasks.length === 0) {
          state.fetchProgressTasks();
        }
      },
    }
  )
);
