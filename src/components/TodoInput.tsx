import { useState } from "react";
import uuid from "react-uuid";
import { useAppDispatch } from "../hook/hooks";
import { setTodo } from "../store/todosSlice";
import { TODO } from "../type/types";
import { callApiWithData } from "../util/api";

export default function TodoInput() {
  const dispatch = useAppDispatch();

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
            const res = await callApiWithData({
              url: "/test",
              method: "post",
              data: newTodo,
            });

            if (res.status === 200) {
              dispatch(setTodo(newTodo));
            }
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
