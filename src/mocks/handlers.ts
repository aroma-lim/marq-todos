import { rest } from "msw";
import { TODO } from "../type/types";

export const handlers = [
  rest.get("/test", (req, res, ctx) => {
    const todoList = localStorage.getItem("todoList");
    return res(ctx.status(200), ctx.json(todoList));
  }),

  rest.post("/test", (req, res, ctx) => {
    const todoList = localStorage.getItem("todoList") ?? "[]";

    req.json().then((newTodo: TODO) => {
      const totalTodo = [...JSON.parse(todoList), newTodo];
      localStorage.setItem("todoList", JSON.stringify(totalTodo));
    });

    return res(ctx.status(200));
  }),

  rest.put("/test", (req, res, ctx) => {
    const todoList = localStorage.getItem("todoList") ?? "[]";

    req.json().then((editedTodo: TODO) => {
      const newTodoList = JSON.parse(todoList).map((todo: TODO) =>
        todo.id === editedTodo.id ? editedTodo : todo
      );
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
    });

    return res(ctx.status(200));
  }),

  rest.delete("/test", (req, res, ctx) => {
    const todoList = localStorage.getItem("todoList") ?? "[]";

    req.json().then((deletedTodo: TODO) => {
      const newTodoList = JSON.parse(todoList).filter(
        (todo: TODO) => todo.id !== deletedTodo.id
      );
      localStorage.setItem("todoList", JSON.stringify(newTodoList));
    });

    return res(ctx.status(200));
  }),
];
