import { create } from "zustand";

import { persist } from "zustand/middleware";
import { normalize } from "@/utils/validations";

import { KanbanCardProps } from "@/components/KanbanCard";

type ApprovedTaskStore = {
  approvedTasks: KanbanCardProps[];
  loading: boolean;
  error: string | null;
  fetchApprovedTasks: () => Promise<void>;
  approvedUpdate: (item: KanbanCardProps) => void;
  removeApprovedTaskByIndex: (index: number) => void;
  filterApprovedTasks: (query: string) => void;
};

export const useApprovedTaskStore = create<ApprovedTaskStore>()(
  persist(
    (set, get) => ({
      approvedTasks: [],
      loading: false,
      error: null,
      approvedUpdate: (item) =>
        set((state) => ({
          approvedTasks: [...state.approvedTasks, item],
        })),
      fetchApprovedTasks: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/data/approved.json");
          const data = await res.json();
          set({ approvedTasks: data });
        } catch (err) {
          set({ error: "Failed to load tasks" });
        } finally {
          set({ loading: false });
        }
      },
      removeApprovedTaskByIndex: (index: number) =>
        set((state) => {
          if (index < 0 || index >= state.approvedTasks.length) {
            return {};
          }
          const newTasks = [...state.approvedTasks];
          newTasks.splice(index, 1);
          return { approvedTasks: newTasks };
        }),
      filterApprovedTasks: async (query) => {
        const normalizedQuery = normalize(query);
        const res = await fetch("/data/approved.json");
        const allTasks = await res.json();
        const filtered = allTasks.filter((task: any) =>
          normalize(task.title).includes(normalizedQuery)
        );
        set({ approvedTasks: filtered });
      },
    }),
    {
      name: "approvedTasks", // key in localStorage
      partialize: (state) => ({ approvedTasks: state.approvedTasks }),
      onRehydrateStorage: () => (state) => {
        if (state && state.approvedTasks.length === 0) {
          state.fetchApprovedTasks();
        }
      },
    }
  )
);
