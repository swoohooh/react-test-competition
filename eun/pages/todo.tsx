import type { NextPage } from 'next';
import { BaseSyntheticEvent, useCallback, useMemo, useState } from 'react';
import { createBrotliDecompress } from 'zlib';
import TodoInput from '../components/Todo/TodoInput';
import TodoItem, { ITodoItem } from '../components/Todo/TodoItem';
import TodoPagination from '../components/Todo/TodoPagination';
import Layout from '../layout/Layout';

const Todo: NextPage = () => {
  const pageLimit = 5;

  const [todoList, setTodoList] = useState<ITodoItem[]>([]);
  const [page, setPage] = useState<number>(1);

  const totalPage = useMemo(() => (todoList.length == 0 ? 1 : Math.ceil(todoList.length / pageLimit)), [todoList]);
  const currentTodoList = useMemo(() => {
    const reverseList = [...todoList].reverse();
    return reverseList.slice(pageLimit * (page - 1), pageLimit * page);
  }, [todoList, page]);

  const clickPage = useCallback(
    (page: number) => {
      setPage(page);
    },
    [setPage],
  );

  const addTodo = useCallback(
    (content: string) => {
      setTodoList(
        todoList.concat({
          id: todoList.length + 1,
          content,
          completed: false,
        }),
      );
    },
    [setTodoList, todoList],
  );

  const completeTodo = useCallback(
    (id: number) => {
      setTodoList(
        todoList.map((todo: ITodoItem) => {
          return id == todo.id ? Object.assign(todo, { completed: !todo.completed }) : todo;
        }),
      );
    },
    [setTodoList, todoList],
  );

  const editTodo = useCallback(
    (id: number, content: string) => {
      setTodoList(
        todoList.map((todo: ITodoItem) => {
          return id == todo.id ? Object.assign(todo, { content }) : todo;
        }),
      );
    },
    [setTodoList, todoList],
  );

  const deleteTodo = useCallback(
    (id: number) => {
      setTodoList(todoList.filter((todo: ITodoItem) => todo.id !== id));
    },
    [setTodoList, todoList],
  );

  return (
    <Layout>
      <div className="m-auto h-auto w-1/2 bg-white p-2">
        <TodoInput addTodo={addTodo} />

        <hr className="my-4" />

        <div className="h-56 p-5">
          {currentTodoList.map((todo: ITodoItem, index: number) => {
            return (
              <TodoItem
                key={index}
                todo={todo}
                completeTodo={completeTodo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </div>
        <TodoPagination totalPage={totalPage} currentPage={page} pageLimit={pageLimit} clickPage={clickPage} />
      </div>
    </Layout>
  );
};

export default Todo;
