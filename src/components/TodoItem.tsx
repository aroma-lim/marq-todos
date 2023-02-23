import { FC } from "react";
import { TODO } from "../type/types";

interface Props {
  todo: TODO;
}

const TodoItem: FC<Props> = (props: Props) => {
  const { todo } = props;

  return (
    <div className="todo-item-container">
      <div className="todo-item-info">{todo.title}</div>
    </div>
  );
};

export default TodoItem;
