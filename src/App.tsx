import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import { TODO } from "./type/types";

function App() {
  const data = localStorage.getItem("todoList") ?? "[]";
  const json = JSON.parse(data);

  return (
    <div className="container">
      <h1>Marq-TODO</h1>
      <TodoInput />
      {json.map((todo: TODO) => (
        <TodoItem todo={todo} />
      ))}
    </div>
  );
}

export default App;
