import { FC, useState } from "react";
import { TODO } from "../type/types";
import { SlClose } from "react-icons/sl";
import { callApiWithData } from "../util/api";
import { useAppDispatch } from "../hook/hooks";
import { updateTodo } from "../store/todosSlice";

interface Props {
  todo: TODO;
  setModalOpen: (value: boolean) => void;
}

const Modal: FC<Props> = (props: Props) => {
  const { todo, setModalOpen } = props;

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>(todo.title);

  const handleEdit = async () => {
    const newTodo: TODO = {
      id: todo.id,
      title: title,
      refer: todo.refer,
      done: todo.done,
      createdDate: todo.createdDate,
      editedDate: new Date().toLocaleDateString(),
    };

    try {
      const res = await callApiWithData({
        url: "/test",
        method: "put",
        data: newTodo,
      });

      if (res.status === 200) {
        dispatch(updateTodo(newTodo));
        setModalOpen(false);
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
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
        </div>

        <button
          className={`modal-button ${title === todo.title ? "disabled" : ""}`}
          onClick={handleEdit}
          disabled={title === todo.title}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Modal;
