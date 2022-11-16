import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { TodoAddFormProps } from './index';
import TodoAddForm from './index';

const renderTodoAddForm = (props?: Partial<TodoAddFormProps>) => {
  const onSubmit = jest.fn();
  const result = render(<TodoAddForm addTodo={onSubmit} {...props} />);

  const AddTodoInput = () => result.getByRole('textbox');
  const AddTodoButton = () => result.getByRole('button');

  const changeAddTodoInput = async (text: string) => {
    await userEvent.type(AddTodoInput(), text);
  };

  const clickAddTodoButton = async () => {
    await userEvent.click(AddTodoButton());
  };

  return {
    result,
    onSubmit,
    AddTodoInput,
    AddTodoButton,
    changeAddTodoInput,
    clickAddTodoButton,
  };
};

describe('TodoAddForm', () => {
  test('should render components when page is opened.', async () => {
    const { AddTodoInput, AddTodoButton } = renderTodoAddForm();

    expect(AddTodoInput()).toBeInTheDocument();
    expect(AddTodoInput()).toHaveValue('');

    expect(AddTodoButton()).toBeInTheDocument();
  });

  test('should be submitted with right todo values', async () => {
    const { onSubmit, changeAddTodoInput, clickAddTodoButton } = renderTodoAddForm();
    const text = 'I am so..........';

    await changeAddTodoInput(text);
    await clickAddTodoButton();

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ task: text, completed: false }));
  });

  test('should not be submitted with blank', async () => {
    const { onSubmit, changeAddTodoInput, clickAddTodoButton } = renderTodoAddForm();

    await clickAddTodoButton();

    expect(onSubmit).not.toBeCalled();
  });
});
