import * as S from './styles';

interface Props {
  todoLength: number;
  completedTodoLength: number;
}

const Header = ({ todoLength, completedTodoLength }: Props) => {
  return (
    <S.TodoHeader>
      <h1>Todo App</h1>
      <p>
        총 {todoLength}개 중 {completedTodoLength}개 완료
      </p>
    </S.TodoHeader>
  );
};

export default Header;
