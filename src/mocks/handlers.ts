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
    const todoList = localStorage.getItem("todoList");

    // if (todoList) {
    //   const newTodoList = JSON.parse(todoList).map((todo: TODO) => {
    //     if (todo.date === JSON.parse(req))
    //   });
    // }
    return res(ctx.status(200));
  }),

  rest.delete("/test", (req, res, ctx) => {
    localStorage.removeItem("todoList");

    return res(ctx.status(200));
  }),
];
