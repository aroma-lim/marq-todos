import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { TODO } from "../type/types";

interface TodosState {
  todos: TODO[];
}

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<TODO>) => {
      state.todos = [...state.todos, action.payload];
    },
    setTodos: (state, action: PayloadAction<TODO[]>) => {
      state.todos = action.payload;
    },
    deleteTodo: (state, action: PayloadAction<TODO>) => {
      const newTodos = state.todos.filter(
        (todo: TODO) => todo.id !== action.payload.id
      );
      state.todos = [...newTodos];
    },
    updateTodo: (state, action: PayloadAction<TODO>) => {
      const newTodos = state.todos.map((todo: TODO) => {
        if (todo.id !== action.payload.id) {
          return todo;
        } else {
          return action.payload;
        }
      });
      state.todos = [...newTodos];
    },
  },
});

export const { setTodo, setTodos, deleteTodo, updateTodo } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todosSlice.reducer;
