import { useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import TodoHeader from '../components/TodoHeader';
import TodoAddForm from '../components/TodoAddForm';
import TodoItem from '../components/TodoItem';

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

const TodoList: NextPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (todo: ITodo) => setTodos([todo, ...todos]);

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
      <TodoHeader totalNumber={todos.length} completedTotalNumber={todos.filter((item) => item.completed).length} />

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

export default TodoList;
