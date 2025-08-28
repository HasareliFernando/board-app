import { create } from "zustand";

import { persist } from "zustand/middleware";
import { normalize } from "@/utils/validations";

import { TaskCardProps } from "@/components/KanbanCard";

type RejectTaskStore = {
  rejecttasks: TaskCardProps[];
  loading: boolean;
  error: string | null;
  fetchRejectTasks: () => Promise<void>;
  rejectUpdate: (item: TaskCardProps) => void;
  removeRejectTaskByIndex: (index: number) => void;
  filterRejectTasks: (query: string) => void;
};

export const useRejectTaskStore = create<RejectTaskStore>()(
  persist(
    (set, get) => ({
      rejecttasks: [],
      loading: false,
      error: null,
      rejectUpdate: (item) =>
        set((state) => ({
          rejecttasks: [...state.rejecttasks, item],
        })),
      fetchRejectTasks: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/data/reject.json");
          const data = await res.json();
          set({ rejecttasks: data });
        } catch (err) {
          set({ error: "Failed to load tasks" });
        } finally {
          set({ loading: false });
        }
      },
      removeRejectTaskByIndex: (index: number) =>
        set((state) => {
          if (index < 0 || index >= state.rejecttasks.length) {
            // invalid index, return unchanged
            return {};
          }
          const newTasks = [...state.rejecttasks];
          newTasks.splice(index, 1);
          return { rejecttasks: newTasks };
        }),
      filterRejectTasks: async (query) => {
        const normalizedQuery = normalize(query);
        const res = await fetch("/data/reject.json");
        const allTasks = await res.json();
        const filtered = allTasks.filter((task: any) =>
          normalize(task.title).includes(normalizedQuery)
        );
        set({ rejecttasks: filtered });
      },
    }),
    {
      name: "rejecttasks", // key in localStorage
      partialize: (state) => ({ rejecttasks: state.rejecttasks }),
      onRehydrateStorage: () => (state) => {
        if (state && state.rejecttasks.length === 0) {
          state.fetchRejectTasks();
        }
      },
    }
  )
);
