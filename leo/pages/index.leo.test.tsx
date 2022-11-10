import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TodoList from './index';

export function renderTodoList() {
  const ENTER_KEY = '[Enter]';
  const TEXT_ARRAY = ['Send Email', 'Bake Cake', 'Checked TodoList'];

  const result = render(<TodoList />);

  const Title = () => result.getByTestId('title');
  const Count = () => result.getByTestId('count');
  const AddInput = () => result.getByTestId('addInput');
  const AddButton = () => result.getByTestId('addButton');
  const Todos = () => result.queryAllByTestId('todo');
  const EditTodos = () => result.queryAllByTestId('todoEdit');

  const Todo = (todoIndex: number) => Todos()[todoIndex].children[1];
  const EditTodo = (todoIndex: number) => EditTodos()[todoIndex];
  const TodoDeleteButton = (todoIndex: number) => Todos()[todoIndex].children[3];
  const TodoEditButton = (todoIndex: number) => Todos()[todoIndex].children[2];
  const TodoIcon = (todoIndex: number) => Todos()[todoIndex].children[0];
  const TodoEditInput = (todoIndex: number) => EditTodos()[todoIndex].children[0].children[0];
  const TodoEditSaveButton = (todoIndex: number) => EditTodos()[todoIndex].children[0].children[1];

  async function changeAddInput(text: string) {
    await userEvent.type(AddInput(), text);
  }
  async function clickAddButton() {
    await userEvent.click(AddButton());
  }
  async function addTodos(array: string[]) {
    for (const value of array) {
      await changeAddInput(value);

      if (value === array[0]) await changeAddInput(ENTER_KEY);
      else await clickAddButton();
    }
  }
  async function clickTodo(todoIndex: number) {
    await userEvent.click(Todo(todoIndex));
  }
  async function clickTodoDeleteButton(todoIndex: number) {
    await userEvent.click(TodoDeleteButton(todoIndex));
  }
  async function clickTodoEditButton(todoIndex: number) {
    await userEvent.click(TodoEditButton(todoIndex));
  }
  async function clearTodoEditInput(todoIndex: number) {
    await userEvent.clear(TodoEditInput(todoIndex));
  }
  async function changeTodoEditInput(todoIndex: number, text: string) {
    await userEvent.type(TodoEditInput(todoIndex), text);
  }
  async function clickTodoEditSaveButton(todoIndex: number) {
    await userEvent.click(TodoEditSaveButton(todoIndex));
  }

  const getCountText = (total: number, completed: number) => `총 ${total}개 중 ${completed}개 완료`;
  const getTodoText = (todoIndex: number) => [...TEXT_ARRAY].reverse()[todoIndex];

  return {
    TEXT_ARRAY,
    result,
    Title,
    Count,
    AddInput,
    AddButton,
    Todos,
    EditTodos,
    Todo,
    EditTodo,
    TodoDeleteButton,
    TodoEditInput,
    TodoIcon,
    getCountText,
    getTodoText,
    addTodos,
    clickTodo,
    clickTodoDeleteButton,
    clickTodoEditButton,
    clearTodoEditInput,
    changeTodoEditInput,
    clickTodoEditSaveButton,
  }
}

describe('TodoList를 처음 렌더링했을 때 화면이 올바르게 노출된다.', () => {
  test('Render TodoList', () => {
    const { Title, Count, AddInput, AddButton, Todos, getCountText } = renderTodoList();

    expect(Title()).toBeInTheDocument();
    expect(Count()).toHaveTextContent(getCountText(0,0));
    expect(AddInput()).toHaveValue('');
    expect(AddButton()).toBeInTheDocument();
    expect(Todos().length).toBe(0);
  });

  test('Add Input을 통해 새로운 Todo를 추가했을 때 TodoList가 갱신된다.', async () => {
    const { TEXT_ARRAY, addTodos, Count, AddInput, Todos, Todo, getCountText, getTodoText } = renderTodoList();
    const newTodoIndex = 0;

    await addTodos(TEXT_ARRAY);

    expect(Count()).toHaveTextContent(getCountText(TEXT_ARRAY.length, 0));
    expect(AddInput()).toHaveValue('');
    expect(Todos().length).toBe(TEXT_ARRAY.length);
    expect(Todo(newTodoIndex)).toHaveTextContent(getTodoText(newTodoIndex));
  });

  test('Todo의 삭제 버튼을 클릭했을 때 해당 Todo가 TodoList에서 제거된다.', async () => {
    const { TEXT_ARRAY, addTodos, clickTodoDeleteButton, Count, Todos, getCountText, getTodoText } = renderTodoList();
    const targetTodoIndex = 0;
    const remainTodoLength = TEXT_ARRAY.length - 1;

    await addTodos(TEXT_ARRAY);
    await clickTodoDeleteButton(targetTodoIndex);

    expect(Count()).toHaveTextContent(getCountText(remainTodoLength, 0));
    expect(Todos().length).toBe(remainTodoLength);
    for (const todo of Todos()) {
      expect(todo).not.toHaveTextContent(getTodoText(targetTodoIndex));
    }
  });

  test('Todo의 Edit 버튼을 클릭했을 때 해당 Todo를 수정할 수 있는 Input이 노출되고 텍스트를 수정할 수 있다.', async () => {
    const { TEXT_ARRAY, addTodos, clickTodoEditButton, EditTodo, changeTodoEditInput, clickTodoEditSaveButton, getTodoText, Todo, TodoEditInput, clearTodoEditInput } = renderTodoList();
    const targetTodoIndex = 0;
    const changeText = 'Learn jest';

    await addTodos(TEXT_ARRAY);
    await clickTodoEditButton(targetTodoIndex);

    expect(EditTodo(targetTodoIndex)).toBeInTheDocument();
    expect(TodoEditInput(targetTodoIndex)).toHaveValue(getTodoText(targetTodoIndex));

    await clearTodoEditInput(targetTodoIndex);
    await changeTodoEditInput(targetTodoIndex, changeText);
    await clickTodoEditSaveButton(targetTodoIndex);

    expect(EditTodo(targetTodoIndex)).toBeUndefined();
    expect(Todo(targetTodoIndex)).toHaveTextContent(changeText);
  });

  test('Todo를 클릭했을 때 해당 Todo의 completed 상태 값이 변경된다.', async () => {
    const { TEXT_ARRAY, addTodos, clickTodo, getCountText, Count, TodoIcon } = renderTodoList();
    const targetTodoIndex = 0;
    const completeIcon = 'xi-check-square';
    const incompleteIcon = 'xi-checkbox-blank';

    await addTodos(TEXT_ARRAY);
    await clickTodo(targetTodoIndex);

    expect(Count()).toHaveTextContent(getCountText(TEXT_ARRAY.length, 1));
    expect(TodoIcon(targetTodoIndex).className).toBe(completeIcon);


    await clickTodo(targetTodoIndex);

    expect(Count()).toHaveTextContent(getCountText(TEXT_ARRAY.length, 0));
    expect(TodoIcon(targetTodoIndex).className).toBe(incompleteIcon);
  });
});
