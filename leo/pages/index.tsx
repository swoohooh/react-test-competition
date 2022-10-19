import { useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import TodoHeader from '../components/TodoHeader';
import TodoItem from '../components/TodoItem';
import TodoAddForm from '../components/TodoAddForm';

const TodoContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;

  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);

  & > div,
  & > ul {
    padding-left: 25px;
    padding-right: 25px;
  }

  & > ul {
    padding-bottom: 25px;
  }
`;

export type ITodo = { idx: string; task: string; completed: boolean };

const Home: NextPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (todo: ITodo) => setTodos([...todos, todo]);

  const deleteTodo = (idx: string) => setTodos(todos.filter((item) => item.idx !== idx));

  const toggleTodo = (idx: string) => {
    const updateTodo = todos.map((todo) => {
      if (todo.idx === idx) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updateTodo);
  };

  const updateTodo = (idx: string, task: string) => {
    const updateTodo = todos.map((todo) => {
      if (todo.idx === idx) {
        return { ...todo, task: task };
      }
      return todo;
    });
    setTodos(updateTodo);
  };

  return (
    <TodoContainer>
      <TodoHeader todoLength={todos.length} completedTodoLength={todos.filter((item) => item.completed).length} />

      <TodoAddForm addTodo={addTodo} />

      <ul>
        {todos?.map((todo) => (
          <TodoItem
            key={todo.idx}
            data={todo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </TodoContainer>
  );
};

export default Home;
