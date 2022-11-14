import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TodoHeader from './index';

export function renderTodoHeader() {
  const totalNumber = 5;
  const completedTotalNumber = 3;
  const result = render(<TodoHeader totalNumber={totalNumber} completedTotalNumber={completedTotalNumber} />);

  const Title = () => result.getByTestId('title');
  const Count = () => result.getByTestId('count');
  const getCountText = (total: number, completed: number) => `총 ${total}개 중 ${completed}개 완료`;

  return {
    totalNumber,
    completedTotalNumber,
    result,
    Title,
    Count,
    getCountText,
  }
}

describe('<TodoHeader />', () => {
  test('초기 렌더링 시 화면에 올바르게 노출된다. ', () => {
    const { Title, Count, getCountText, totalNumber, completedTotalNumber } = renderTodoHeader();

    expect(Title()).toBeInTheDocument();
    expect(Count()).toHaveTextContent(getCountText(totalNumber,completedTotalNumber));
  });
});
