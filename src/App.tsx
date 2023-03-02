import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import { useAppDispatch, useAppSelector } from "./hook/hooks";
import { selectTodos, setTodos } from "./store/todosSlice";
import { TODO } from "./type/types";

function App() {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(selectTodos);

  const [filteredTodos, setFilteredTodos] = useState<TODO[]>(todos);

  const onFilter = useCallback(
    (filter: string) => {
      const tempTodos = todos.filter((todo: TODO) => {
        if (filter === "Active") {
          return !todo.done;
        } else if (filter === "Completed") {
          return todo.done;
        }
        return true;
      });
      setFilteredTodos(tempTodos);
    },
    [todos]
  );

  useEffect(() => {
    const data = localStorage.getItem("todoList") ?? "[]";
    const json: TODO[] = JSON.parse(data);

    dispatch(setTodos(json));
  }, [dispatch]);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <div className="container">
      <h1>Marq-TODO</h1>
      <TodoInput />
      <Filter count={filteredTodos.length} onFilter={onFilter} />
      {filteredTodos.length
        ? filteredTodos.map((todo: TODO) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        : null}
    </div>
  );
}

export default App;
