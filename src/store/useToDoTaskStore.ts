import { create } from "zustand";

import { persist } from "zustand/middleware";

import { TaskCardProps } from "@/components/KanbanCard";
import { normalize } from "@/utils/validations";

type ToDoTaskStore = {
  todotasks: TaskCardProps[];
  loading: boolean;
  error: string | null;
  fetchToDoTasks: () => Promise<void>;
  todoUpdate: (item: TaskCardProps) => void;
  removeToDoTaskByIndex: (index: number) => void;
  filterTodoTasks: (query: string) => void;
};

export const useToDoTaskStore = create<ToDoTaskStore>()(
  persist(
    (set, get) => ({
      todotasks: [],
      loading: false,
      error: null,
      todoUpdate: (item) =>
        set((state) => ({
          todotasks: [...state.todotasks, item],
        })),
      fetchToDoTasks: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/data/todo.json");
          const data = await res.json();
          set({ todotasks: data });
        } catch (err) {
          set({ error: "Failed to load tasks" });
        } finally {
          set({ loading: false });
        }
      },
      removeToDoTaskByIndex: (index: number) =>
        set((state) => {
          if (index < 0 || index >= state.todotasks.length) {
            return {};
          }
          const newTasks = [...state.todotasks];
          newTasks.splice(index, 1);
          return { todotasks: newTasks };
        }),
      filterTodoTasks: async (query) => {
        const normalizedQuery = normalize(query);
        const res = await fetch("/data/todo.json");
        const allTasks = await res.json();
        const filtered = allTasks.filter((task:any) =>
          normalize(task.title).includes(normalizedQuery)
        );
        set({ todotasks: filtered });
      },
    }),
    {
      name: "todotasks",
      partialize: (state) => ({ todotasks: state.todotasks }),
      onRehydrateStorage: () => (state) => {
        if (state && state.todotasks.length === 0) {
          state.fetchToDoTasks();
        }
      },
    }
  )
);
