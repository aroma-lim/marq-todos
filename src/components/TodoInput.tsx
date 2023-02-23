import { useState } from "react";
import uuid from "react-uuid";
import { TODO } from "../type/types";
import { callApiWithData } from "../util/api";

export default function TodoInput() {
  const [todoValue, setTodoValue] = useState<string>("");

  return (
    <div className="todo-input-container">
      <input
        className="todo-input"
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
      />
      <button
        className="todo-input-button"
        onClick={async () => {
          try {
            const newTodo: TODO = {
              id: uuid(),
              title: todoValue,
              refer: [],
              done: false,
              createdDate: new Date().toLocaleDateString(),
              editedDate: new Date().toLocaleDateString(),
            };
            await callApiWithData({
              url: "/test",
              method: "post",
              data: newTodo,
            });
          } catch (e) {
            console.log("e", e);
          }
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
