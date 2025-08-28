import { create } from "zustand";

import { persist } from "zustand/middleware";
import { normalize } from "@/utils/validations";

import { TaskCardProps } from "@/components/KanbanCard";

type ApprovedTaskStore = {
  approvedtasks: TaskCardProps[];
  loading: boolean;
  error: string | null;
  fetchApprovedTasks: () => Promise<void>;
  approvedUpdate: (item: TaskCardProps) => void;
  removeApprovedTaskByIndex: (index: number) => void;
  filterApprovedTasks: (query: string) => void;
};

export const useApprovedTaskStore = create<ApprovedTaskStore>()(
  persist(
    (set, get) => ({
      approvedtasks: [],
      loading: false,
      error: null,
      approvedUpdate: (item) =>
        set((state) => ({
          approvedtasks: [...state.approvedtasks, item],
        })),
      fetchApprovedTasks: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/data/approved.json");
          const data = await res.json();
          set({ approvedtasks: data });
        } catch (err) {
          set({ error: "Failed to load tasks" });
        } finally {
          set({ loading: false });
        }
      },
      removeApprovedTaskByIndex: (index: number) =>
        set((state) => {
          if (index < 0 || index >= state.approvedtasks.length) {
            return {};
          }
          const newTasks = [...state.approvedtasks];
          newTasks.splice(index, 1);
          return { approvedtasks: newTasks };
        }),
      filterApprovedTasks: async (query) => {
        const normalizedQuery = normalize(query);
        const res = await fetch("/data/approved.json");
        const allTasks = await res.json();
        const filtered = allTasks.filter((task: any) =>
          normalize(task.title).includes(normalizedQuery)
        );
        set({ approvedtasks: filtered });

      },
    }),
    {
      name: "approvedtasks", // key in localStorage
      partialize: (state) => ({ approvedtasks: state.approvedtasks }),
      onRehydrateStorage: () => (state) => {
        if (state && state.approvedtasks.length === 0) {
          state.fetchApprovedTasks();
        }
      },
    }
  )
);
