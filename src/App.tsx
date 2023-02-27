import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import { useAppDispatch, useAppSelector } from "./hook/hooks";
import { selectTodos, setTodos } from "./store/todosSlice";
import { TODO } from "./type/types";

function App() {
  const dispatch = useAppDispatch();

  const data = localStorage.getItem("todoList") ?? "[]";
  const json: TODO[] = JSON.parse(data);
  dispatch(setTodos(json));

  const todos = useAppSelector(selectTodos);

  return (
    <div className="container">
      <h1>Marq-TODO</h1>
      <TodoInput />
      {todos.length
        ? todos.map((todo: TODO) => <TodoItem key={todo.id} todo={todo} />)
        : json.map((todo: TODO) => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}

export default App;
