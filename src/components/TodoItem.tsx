import { FC } from "react";
import { useAppDispatch } from "../hook/hooks";
import { deleteTodo } from "../store/todosSlice";
import { TODO } from "../type/types";
import { callApiWithData } from "../util/api";

interface Props {
  todo: TODO;
}

const TodoItem: FC<Props> = (props: Props) => {
  const { todo } = props;

  const dispatch = useAppDispatch();

  return (
    <div className="todo-item-container">
      <div className="todo-item-info">
        <div className="todo-item-title">{todo.title}</div>
        <div className="todo-item-date">작성일: {todo.createdDate}</div>
        <div className="todo-item-date">수정일: {todo.editedDate}</div>
      </div>
      <div>
        <button className="todo-item-button">Edit</button>
        <button
          className="todo-item-button"
          onClick={async () => {
            try {
              const res = await callApiWithData({
                url: "/test",
                method: "delete",
                data: todo,
              });

              if (res.status === 200) {
                dispatch(deleteTodo(todo));
              }
            } catch (e) {
              console.log("e", e);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
