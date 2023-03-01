import { FC, useEffect, useRef, useState } from "react";
import { TODO } from "../type/types";
import { SlClose, SlArrowDown, SlArrowUp } from "react-icons/sl";
import { callApiWithData } from "../util/api";
import { useAppDispatch, useAppSelector } from "../hook/hooks";
import { selectTodos, updateTodo } from "../store/todosSlice";

interface Props {
  todo: TODO;
  setModalOpen: (value: boolean) => void;
}

const Modal: FC<Props> = (props: Props) => {
  const { todo, setModalOpen } = props;

  const dispatch = useAppDispatch();

  const todos = useAppSelector(selectTodos);

  const [title, setTitle] = useState<string>(todo.title);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownMenu, setDropdownMenu] = useState<TODO[]>();

  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backgroundRef.current) {
      setModalOpen(false);
    }
  };

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

  useEffect(() => {
    const newMenu = todos.filter((t: TODO) => t.id !== todo.id);
    setDropdownMenu(newMenu);
  }, [todos, todo.id]);

  return (
    <div
      className="modal-overlay"
      ref={backgroundRef}
      onClick={handleClickBackground}
    >
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
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <button
            className={`dropdown-button ${dropdownMenu ? "" : "disabled"}`}
            disabled={!dropdownMenu}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            참조할 TODO {dropdownOpen ? <SlArrowUp /> : <SlArrowDown />}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menus">
              {dropdownMenu?.map((menu: TODO) => (
                <div
                  key={menu.id}
                  className="dropdown-menu"
                  onClick={() => setDropdownOpen(false)}
                >
                  @ {menu.title}
                </div>
              ))}
            </div>
          )}
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
