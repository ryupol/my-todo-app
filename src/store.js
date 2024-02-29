import { create } from "zustand";

function todoStore(set) {
  return {
    search: "",
    setSearch: (value) => {
      set({ search: value });
    },
    todoFilter: "All",
    setTodoFilter: (value) => {
      set({ todoFilter: value });
    },
    isDark: false,
    setIsDark: () => {
      set((state) => !state.isDark);
    },
    addTodo: (title) => {
      const newTodo = { id: uuidv4(), title: title, completed: false };
      set((state) => ({ todos: [...state.todos, newTodo] }));
    },
  };
}
export const useTodosStore = create(todoStore);
