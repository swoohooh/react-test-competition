import type { NextPage } from 'next';
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import { createBrotliDecompress } from 'zlib';
import TodoInput from '../components/Todo/TodoInput';
import TodoItem, { ITodoItem } from '../components/Todo/TodoItem';
import Layout from '../layout/Layout';

const Todo: NextPage = () => {
  const [todoList, setTodoList] = useState<ITodoItem[]>([]);

  const handleAdd = useCallback(
    (content: string) => {
      const newList = todoList.concat({
        id: todoList.length,
        content,
        completed: false,
      });

      setTodoList(newList);
    },
    [setTodoList, todoList],
  );

  const handleComplete = useCallback(
    (id: number) => {
      setTodoList(
        todoList.map((todo: ITodoItem) => {
          return id == todo.id ? Object.assign(todo, { complete: !todo.completed }) : todo;
        }),
      );
    },
    [setTodoList, todoList],
  );

  const handleEdit = useCallback(
    (id: number, content: string) => {
      setTodoList(
        todoList.map((todo: ITodoItem) => {
          return id == todo.id ? Object.assign(todo, { content }) : todo;
        }),
      );
    },
    [setTodoList, todoList],
  );

  const handleDelete = useCallback(
    (id: number) => {
      setTodoList(todoList.filter((todo: ITodoItem) => todo.id !== id));
    },
    [setTodoList, todoList],
  );

  return (
    <Layout>
      <div className="bg-white w-1/2 h-auto m-auto p-2">
        <TodoInput handleAdd={handleAdd} />

        <hr className="my-1" />

        {todoList.map((todo: ITodoItem, index: number) => {
          return (
            <TodoItem
              key={index}
              todo={todo}
              handleComplete={handleComplete}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Todo;
