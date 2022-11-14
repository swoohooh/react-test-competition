import * as S from './styles';

interface Props {
  totalNumber: number;
  completedTotalNumber: number;
}

const TodoHeader = ({ totalNumber, completedTotalNumber }: Props) => {
  return (
    <S.TodoHeader>
      <h1 data-testid='title'>Todo App</h1>
      <p data-testid='count'>
        총 {totalNumber}개 중 {completedTotalNumber}개 완료
      </p>
    </S.TodoHeader>
  );
};

export default TodoHeader;
