import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TodoAddForm from './index';

export function renderTodoAddForm() {
  const ENTER_KEY = '[Enter]';
  const onSubmit = jest.fn();

  const result = render(<TodoAddForm addTodo={onSubmit} />);

  const AddInput = () => result.getByTestId('addInput');
  const AddButton = () => result.getByTestId('addButton');

  async function changeAddInput(text: string) {
    await userEvent.type(AddInput(), text);
  }
  async function clickAddButton() {
    await userEvent.click(AddButton());
  }

  return {
    ENTER_KEY,
    onSubmit,
    result,
    AddInput,
    AddButton,
    changeAddInput,
    clickAddButton
  }
}

describe('<TodoAddForm />', () => {
  test('초기 렌더링 시 화면에 올바르게 노출된다.', () => {
    const { AddInput, AddButton } = renderTodoAddForm();

    expect(AddInput()).toHaveValue('');
    expect(AddButton()).toBeInTheDocument();
  });

  test('Add Input에 값을 입력하고 Add 버튼 클릭 시 이벤트가 호출된다.', async () => {
    const { AddInput, changeAddInput, clickAddButton, onSubmit } = renderTodoAddForm();
    const text = 'Study Next.js';

    await changeAddInput(text);
    await clickAddButton();

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      task: text,
      completed: false
    }));
    expect(AddInput()).toHaveValue('');
  });

  test('Add Input에 값을 입력하고 Enter 시 이벤트가 호출된다.', async () => {
    const { AddInput, changeAddInput, onSubmit, ENTER_KEY } = renderTodoAddForm();
    const text = 'Study Next.js';

    await changeAddInput(text);
    await changeAddInput(ENTER_KEY);

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      task: text,
      completed: false
    }));
    expect(AddInput()).toHaveValue('');
  });
});
