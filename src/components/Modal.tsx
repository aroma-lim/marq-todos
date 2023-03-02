import { FC, useEffect, useRef, useState } from "react";
import { TODO } from "../type/types";
import { SlClose, SlArrowDown, SlArrowUp } from "react-icons/sl";
import { CgClose } from "react-icons/cg";
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
  const [refer, setRefer] = useState<TODO[]>(todo.refer);
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
      refer: refer,
      disabled: todo.disabled,
      done: todo.done,
      createdDate: todo.createdDate,
      editedDate: new Date().toLocaleDateString(),
    };

    try {
      const res = await callApiWithData({
        url: "/todo",
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

  const handleSelect = (target: TODO) => {
    setRefer([...refer, target]);
    setDropdownMenu((prev) => {
      const newMenu = prev?.filter((t: TODO) => t.id !== target.id);
      return newMenu;
    });
    setDropdownOpen(false);
  };

  const handleDeselect = (target: TODO) => {
    setDropdownMenu((prev) => {
      const newMenu = prev
        ? todos
            .filter(
              (t: TODO) =>
                prev.findIndex((p: TODO) => p.id === t.id) >= 0 ||
                t.id === target.id
            )
            .filter((t: TODO) => t.id !== todo.id)
        : todos.filter((t: TODO) => t.id !== todo.id);
      return newMenu;
    });
    setRefer((prev) => {
      const newMenu = prev?.filter((t: TODO) => t.id !== target.id);
      return newMenu;
    });
  };

  useEffect(() => {
    const newMenu = todos
      .filter(
        (t: TODO) =>
          todo.refer.findIndex((refer: TODO) => refer.id === t.id) < 0
      )
      .filter((t: TODO) => t.id !== todo.id);
    setDropdownMenu(newMenu);
  }, [todos, todo.id, todo.refer]);

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
            className={`dropdown-button ${
              dropdownMenu?.length ? "" : "disabled"
            }`}
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
                  onClick={() => handleSelect(menu)}
                >
                  {menu.title}
                </div>
              ))}
            </div>
          )}
          {refer && (
            <div className="refer-container">
              {refer.map((r: TODO) => (
                <div key={r.id} className="refer">
                  {r.title} &nbsp;{" "}
                  <CgClose
                    style={{ width: "10px", cursor: "pointer" }}
                    onClick={() => handleDeselect(r)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className={`modal-button ${
            title === todo.title && refer === todo.refer ? "disabled" : ""
          }`}
          onClick={handleEdit}
          disabled={title === todo.title && refer === todo.refer}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Modal;
