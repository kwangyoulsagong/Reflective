import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Todo = () => {
  const [todo, setTodo] = useLocalStorage("todos", []);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodo([...todo, newTodo]);
      setNewTodo("");
    }
  };

  const removeTodo = (index: any) => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="새로운 투두를 입력해주세요"
            className="p-2 border rounded-l-md w-full"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white p-2 rounded-r-md"
          >
            추가
          </button>
        </div>
        <ul className="space-y-2">
          {todo.map((todo: any, index: any) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-200 p-2 rounded"
            >
              <span>{todo}</span>
              <button
                onClick={() => removeTodo(index)}
                className="text-red-500 hover:text-red-700"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
