import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import type { TodoHeaderProps } from './index';
import TodoHeader from './index';

const renderTodoHeader = (props: TodoHeaderProps) => {
  const result = render(<TodoHeader {...props} />);

  const Heading = () => result.getByRole('heading', { level: 1 });

  const Content = () => result.getByText(/개 중/);

  return {
    result,
    Heading,
    Content,
  };
};

describe('TodoHeader', () => {
  const initialProps = { totalNumber: 10, completedTotalNumber: 3 };

  test('should render Heading when page is opened.', () => {
    const { Heading } = renderTodoHeader(initialProps);

    expect(Heading()).toBeInTheDocument();
    expect(Heading().innerHTML).toBe('Todo App');
  });

  test('should contain total number in content when page is opened.', () => {
    const { Content } = renderTodoHeader(initialProps);

    expect(Content()).toBeInTheDocument();

    expect(Content()).toHaveTextContent(initialProps.totalNumber.toString());
    expect(Content()).toHaveTextContent(initialProps.completedTotalNumber.toString());
  });
});
