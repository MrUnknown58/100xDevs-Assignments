import { atom, selector } from "recoil";

export const countAtom = atom({
  key: "countAtom",
  default: 0,
});

export const evenSelector = selector({
  key: "evenSelector",
  get: ({ get }) => {
    const count = get(countAtom);
    return count % 2;
  },
});

// Todo creation application with filtering logic
// todos, filter

export const todoAtom = atom({
  key: "todoAtom",
  default: [],
});
export const filterTodoAtom = atom({
  key: "filterTodoAtom",
  default: "",
});

export const filteredTodoSelector = selector({
  key: "filteredTodoSelector",
  get: ({ get }) => {
    const todos = get(todoAtom);
    const filter = get(filterTodoAtom);
    return todos.filter(
      (todo) => todo.title.includes(filter) || todo.description.includes(filter)
    );
  },
});
