import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook/hooks";
import { deleteTodo, selectTodos, updateTodo } from "../store/todosSlice";
import { TODO } from "../type/types";
import { callApiWithData } from "../util/api";
import Modal from "./Modal";

interface Props {
  todo: TODO;
}

const TodoItem: FC<Props> = (props: Props) => {
  const { todo } = props;

  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const verifyDisabled = (todo: TODO) => {
    const temp = todos.filter((t: TODO) => {
      return todo.refer.includes(t.id);
    });
    if (temp.findIndex((t: TODO) => t.done === false) >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const findTitleWithId = (id: string) => {
    const title = todos.find((todo: TODO) => todo.id === id);
    return title?.title;
  };

  const handleCheck = async () => {
    if (!todo.done && verifyDisabled(todo)) {
      window.alert("참조한 할 일을 먼저 끝낸 후에 체크하십시오");
      return;
    }
    const newTodo: TODO = {
      id: todo.id,
      title: todo.title,
      refer: todo.refer,
      done: !todo.done,
      createdDate: todo.createdDate,
      editedDate: todo.editedDate,
    };

    try {
      const res = await callApiWithData({
        url: "/todo",
        method: "put",
        data: newTodo,
      });

      if (res.status === 200) {
        dispatch(updateTodo(newTodo));
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await callApiWithData({
        url: "/todo",
        method: "delete",
        data: todo,
      });

      if (res.status === 200) {
        dispatch(deleteTodo(todo));
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <div className="todo-item-wrapper">
      <div className="todo-item-container">
        <div className="todo-item-info">
          <input type="checkbox" checked={todo.done} onChange={handleCheck} />
          <div className={`todo-item-title ${todo.done ? "checked" : ""}`}>
            {todo.title}
          </div>
          <div className="todo-item-date">작성일: {todo.createdDate}</div>
          <div className="todo-item-date">수정일: {todo.editedDate}</div>
        </div>
        <div>
          <button
            className="todo-item-button"
            onClick={() => setModalOpen(true)}
          >
            Edit
          </button>
          <button className="todo-item-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      {todo.refer ? (
        <div className="todo-item-reference">
          {todo.refer.map((r: string) => (
            <div key={r} className="todo-item-refer">
              @{findTitleWithId(r)}
            </div>
          ))}
        </div>
      ) : null}
      {modalOpen && <Modal todo={todo} setModalOpen={setModalOpen} />}
    </div>
  );
};

export default TodoItem;
