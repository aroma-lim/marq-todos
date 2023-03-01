import { FC, useState } from "react";
import { TODO } from "../type/types";
import { SlClose } from "react-icons/sl";

interface Props {
  todo: TODO;
  setModalOpen: (value: boolean) => void;
}

const Modal: FC<Props> = (props: Props) => {
  const { todo, setModalOpen } = props;
  const [title, setTitle] = useState<string>(todo.title);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-close">
          <SlClose
            className="modal-close-icon"
            onClick={() => setModalOpen(false)}
          />
        </div>
        <div className="modal-title">일정 이름</div>
        <input
          className="modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <button>close</button>
      </div>
    </div>
  );
};

export default Modal;
