import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TodoItem from './index';

export function renderTodoItem() {
  const completeIcon = 'xi-check-square';
  const incompleteIcon = 'xi-checkbox-blank';
  const todoData = { idx: 'one', task: 'Study JS', completed: false };

  const onDelete = jest.fn();
  const onToggle = jest.fn();
  const onUpdate = jest.fn();

  const result = render(<TodoItem data={todoData} deleteTodo={onDelete} toggleTodo={onToggle} updateTodo={onUpdate} />);

  const Todo = () => result.getByTestId('todo');
  const TodoIcon = () => result.getByTestId('todoIcon');
  const TodoText = () => result.getByTestId('todoText');
  const TodoEditButton = () => result.getByTestId('todoEditButton');
  const TodoDeleteButton = () => result.getByTestId('todoDeleteButton');

  const TodoEdit = () => result.getByTestId('todoEdit');
  const TodoEditInput = () => result.getByTestId('todoEditInput');
  const TodoEditSaveButton = () => result.getByTestId('todoEditSaveButton');

  async function clickTodoEditButton() {
    await userEvent.click(TodoEditButton());
  }
  async function clearTodoEditInput() {
    await userEvent.clear(TodoEditInput());
  }
  async function changeTodoEditInput(text: string) {
    await userEvent.type(TodoEditInput(), text);
  }
  async function clickTodoEditSaveButton() {
    await userEvent.click(TodoEditSaveButton());
  }
  async function clickTodoDeleteButton() {
    await userEvent.click(TodoDeleteButton());
  }
  async function clickTodo() {
    await userEvent.click(TodoText());
  }

  return {
    completeIcon,
    incompleteIcon,
    todoData,
    onDelete,
    onToggle,
    onUpdate,
    result,
    Todo,
    TodoIcon,
    TodoText,
    TodoEditButton,
    TodoDeleteButton,
    TodoEdit,
    TodoEditInput,
    TodoEditSaveButton,
    clickTodoEditButton,
    clearTodoEditInput,
    changeTodoEditInput,
    clickTodoEditSaveButton,
    clickTodoDeleteButton,
    clickTodo,
  }
}

describe('<TodoItem />', () => {
  test('초기 렌더링 시 화면에 올바르게 노출된다.', () => {
    const { Todo, TodoIcon, TodoText, incompleteIcon, todoData } = renderTodoItem();

    expect(Todo()).toBeInTheDocument();
    expect(TodoIcon().className).toBe(incompleteIcon);
    expect(TodoText()).toHaveTextContent(todoData.task);
  });

  test('Edit 버튼을 클릭하면 Edit Todo가 노출된다.', async () => {
    const {clickTodoEditButton, TodoEdit, TodoEditInput, TodoEditSaveButton, todoData } = renderTodoItem();

    await clickTodoEditButton();

    expect(TodoEdit()).toBeInTheDocument();
    expect(TodoEditInput()).toHaveValue(todoData.task);
    expect(TodoEditSaveButton()).toBeInTheDocument();
  });

  test('Edit Input의 값을 수정하고 Save 버튼을 클릭 시 Update 이벤트가 호출된다.', async () => {
    const {
      clickTodoEditButton,
      Todo,
      todoData,
      clearTodoEditInput,
      changeTodoEditInput,
      clickTodoEditSaveButton,
      onUpdate
    } = renderTodoItem();
    const newText = 'Study React';

    await clickTodoEditButton();
    await clearTodoEditInput();
    await changeTodoEditInput(newText);
    await clickTodoEditSaveButton();

    expect(onUpdate).toHaveBeenCalledWith(todoData.idx, newText);
    expect(Todo()).toBeInTheDocument();
  });

  test('Delete 버튼 클릭 시 Delete 이벤트가 호출된다.', async () => {
    const { clickTodoDeleteButton, onDelete, todoData } = renderTodoItem();

    await clickTodoDeleteButton();

    expect(onDelete).toHaveBeenCalledWith(todoData.idx);
  });


  test('Todo 클릭 시 상태 Toggle 이벤트가 호출된다.', async () => {
    const { clickTodo, onToggle, todoData } = renderTodoItem();

    await clickTodo();

    expect(onToggle).toHaveBeenCalledWith(todoData.idx);
  });
});
