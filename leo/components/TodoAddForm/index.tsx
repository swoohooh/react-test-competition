import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { ITodo } from '../../pages';
import * as S from './styles';

interface Props {
  todoAdd: (todo: ITodo) => void;
}

const TodoAddForm = ({ todoAdd }: Props) => {
  const [addTask, setAddTask] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => setAddTask(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (addTask) {
      todoAdd({ idx: uuid(), task: addTask, completed: false });
      setAddTask('');
    }
  };

  return (
    <S.AddTodoForm>
      <form onSubmit={handleSubmit}>
        <input type='text' value={addTask} onChange={handleInput} placeholder='New Todo' />
        <button>Add Todo</button>
      </form>
    </S.AddTodoForm>
  );
};

export default TodoAddForm;
