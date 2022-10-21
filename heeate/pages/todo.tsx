/* eslint-disable react/display-name */
import { useState, useId, useRef, forwardRef, createRef, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

type Todo = {
  idx: number;
  content: string;
};

type Props = {
  onSubmit: SubmitHandler<{ todo: string }>;
};

const TodoInputComponent = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<{ todo: string }>();

  return (
    <StyledInputForm onSubmit={handleSubmit(onSubmit)}>
      <input type="textarea" {...register("todo", { required: true })} />
      <button type="button">등록</button>
    </StyledInputForm>
  );
};

const StyledInputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 20px 0;

  input {
    width: 80%;
    padding: 1%;
    margin: 0 0 20px 0;
  }
`;

export default function App() {
  const id = useId();
  const idx = useRef(0);

  const [todoList, setTodoList] = useState<Todo[]>([]);

  // todo 추가
  const handleCreateTodo: SubmitHandler<{ todo: string }> = (data) => {
    const { todo } = data;

    const newTodo = { idx: ++idx.current, content: todo };
    setTodoList(todoList.concat(newTodo));
  };

  // todo 삭제
  const handleDeleteTodo = (idx: number) => {
    const filterTodos = todoList.filter((todo) => todo.idx !== idx);
    setTodoList(filterTodos);
  };

  return (
    <Wrapper>
      <h1>Todo</h1>
      <StyledBody>
        <TodoInputComponent onSubmit={handleCreateTodo} />
        <StyledTodoContent>
          {todoList &&
            todoList?.map((list: Todo) => (
              <li key={`${id}+${list.idx}`}>
                <p>{list.content}</p>
                <div>
                  <button onClick={() => handleDeleteTodo(list.idx)}>delete</button>
                </div>
              </li>
            ))}
        </StyledTodoContent>
      </StyledBody>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px red solid;
  width: 400px;
  height: 400px;
  max-height: 400px;
  overflow: scroll;
  margin: 0 auto;

  h1 {
    text-align: center;
  }
`;

const StyledBody = styled.div`
  border: 1px red solid;
  padding: 10px 20px;
`;

const StyledTodoContent = styled.div`
  border: 1px red solid;

  li {
    list-style: none;
    display: flex;
    align-items: center;

    div {
      // 버튼 그룹
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }

    button {
      margin: 0 5px;
      height: 10px;
    }
  }
`;
