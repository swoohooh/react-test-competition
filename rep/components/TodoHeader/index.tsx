import * as S from './styles';

interface Props {
  totalNumber: number;
  completedTotalNumber: number;
}

const Header = ({ totalNumber, completedTotalNumber }: Props) => {
  return (
    <S.TodoHeader>
      <h1>Todo App</h1>
      <p>
        총 {totalNumber}개 중 {completedTotalNumber}개 완료
      </p>
    </S.TodoHeader>
  );
};

export type { Props as TodoHeaderProps };

export default Header;
