import type { NextPage } from "next";
import Head from "next/head";
import react, { useState, useEffect } from "react";

interface TodoItem {
  name: string;
  isDone: boolean;
}

const Todo: NextPage = () => {
  const [item, setItem] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  const handleAdd = () => {
    if (!item) {
      return;
    }

    setTodos([{ name: item, isDone: false }, ...todos]);
    setItem("");
  };

  const removeTodo = (index: number) => {
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  const toggleTodo = (index: number) => {
    todos[index].isDone = !todos[index].isDone;
    setTodos([...todos]);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div>
      <Head>
        <title>To-Do</title>
        <meta name="description" content="ToDo" />
      </Head>

      <main>
        <h1>To-Do List!</h1>

        <div>
          <input type="text" value={item} onChange={handleInput} />
          <button type="button" onClick={handleAdd}>
            Add
          </button>
        </div>

        <ul>
          {todos.map((todo, i) => (
            <li key={i}>
              <input
                type="checkbox"
                checked={todo.isDone}
                onClick={() => toggleTodo(i)}
              />
              {todo.isDone ? <s>{todo.name}</s> : <i>{todo.name}</i>}{" "}
              <button type="button" onClick={() => removeTodo(i)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Todo;
