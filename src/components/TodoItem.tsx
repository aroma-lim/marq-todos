import { FC } from "react";
import { TODO } from "../type/types";

interface Props {
  todo: TODO;
}

const TodoItem: FC<Props> = (props: Props) => {
  const { todo } = props;

  return (
    <div className="todo-item-container">
      <div className="todo-item-info">
        <div className="todo-item-title">{todo.title}</div>
        <div className="todo-item-date">작성일: {todo.createdDate}</div>
        <div className="todo-item-date">수정일: {todo.editedDate}</div>
      </div>
      <div>
        <button className="todo-item-button">Edit</button>
        <button className="todo-item-button">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
