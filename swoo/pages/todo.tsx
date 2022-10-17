import type { NextPage } from "next";
import Head from "next/head";
import react, { useState, useEffect } from "react";

const Todo: NextPage = () => {
  const [item, setItem] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  const handleAdd = () => {
    setTodos([item, ...todos]);
    setItem("");
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div>
      <Head>
        <title>ToDo</title>
        <meta name="description" content="ToDo" />
      </Head>

      <main>
        <h1>Todo list!</h1>

        <form>
          <input type="text" value={item} onChange={handleInput} />
          <button type="button" onClick={handleAdd}>
            Add
          </button>
        </form>

        <ul>
          {todos.map((todo, i) => (
            <li key={i}>{todo}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Todo;
