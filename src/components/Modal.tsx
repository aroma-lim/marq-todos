import { FC } from "react";
import { TODO } from "../type/types";

interface Props {
  todo: TODO;
}

const Modal: FC<Props> = (props: Props) => {
  const { todo } = props;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {todo.title}
        <button>close</button>
      </div>
    </div>
  );
};

export default Modal;
