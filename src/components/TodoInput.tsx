import { useState } from "react";
import uuid from "react-uuid";
import { useAppDispatch } from "../hook/hooks";
import { setTodo } from "../store/todosSlice";
import { TODO } from "../type/types";
import { callApiWithData } from "../util/api";

export default function TodoInput() {
  const dispatch = useAppDispatch();

  const [todoValue, setTodoValue] = useState<string>("");

  const handleAddTodo = async () => {
    try {
      const newTodo: TODO = {
        id: uuid(),
        title: todoValue,
        refer: [],
        disabled: false,
        done: false,
        createdDate: new Date().toLocaleDateString(),
        editedDate: new Date().toLocaleDateString(),
      };
      const res = await callApiWithData({
        url: "/todo",
        method: "post",
        data: newTodo,
      });

      if (res.status === 200) {
        dispatch(setTodo(newTodo));
        setTodoValue("");
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <div className="todo-input-container">
      <input
        className="todo-input"
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
      />
      <button
        className={`todo-input-button ${todoValue === "" ? "disabled" : ""}`}
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
    </div>
  );
}
