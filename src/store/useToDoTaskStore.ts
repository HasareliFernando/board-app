import { create } from "zustand";

import { persist } from "zustand/middleware";

import { KanbanCardProps } from "@/components/KanbanCard";
import { normalize } from "@/utils/validations";

type ToDoTaskStore = {
  todoTasks: KanbanCardProps[];
  loading: boolean;
  error: string | null;
  fetchToDoTasks: () => Promise<void>;
  todoUpdate: (item: KanbanCardProps) => void;
  removeToDoTaskByIndex: (index: number) => void;
  filterTodoTasks: (query: string) => void;
};

export const useToDoTaskStore = create<ToDoTaskStore>()(
  persist(
    (set, get) => ({
      todoTasks: [],
      loading: false,
      error: null,
      todoUpdate: (item) =>
        set((state) => ({
          todoTasks: [...state.todoTasks, item],
        })),
      fetchToDoTasks: async () => {
        set({ loading: true, error: null });
        try {
          const res = await fetch("/data/todo.json");
          const data = await res.json();
          set({ todoTasks: data });
        } catch (err) {
          set({ error: "Failed to load tasks" });
        } finally {
          set({ loading: false });
        }
      },
      removeToDoTaskByIndex: (index: number) =>
        set((state) => {
          if (index < 0 || index >= state.todoTasks.length) {
            return {};
          }
          const newTasks = [...state.todoTasks];
          newTasks.splice(index, 1);
          return { todoTasks: newTasks };
        }),
      filterTodoTasks: async (query) => {
        const normalizedQuery = normalize(query);
        const res = await fetch("/data/todo.json");
        const allTasks = await res.json();
        const filtered = allTasks.filter((task: any) =>
          normalize(task.title).includes(normalizedQuery)
        );
        set({ todoTasks: filtered });
      },
    }),
    {
      name: "todoTasks",
      partialize: (state) => ({ todoTasks: state.todoTasks }),
      onRehydrateStorage: () => (state) => {
        if (state && state.todoTasks.length === 0) {
          state.fetchToDoTasks();
        }
      },
    }
  )
);
