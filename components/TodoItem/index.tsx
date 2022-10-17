import { ChangeEvent, FormEvent, useState } from 'react';
import { ITodo } from '../../pages';
import * as S from './styles';

interface Props {
  todo: ITodo;
  todoToggle: (idx: ITodo['idx']) => void;
  todoUpdate: (idx: ITodo['idx'], task: ITodo['task']) => void;
  todoRemove: (idx: ITodo['idx']) => void;
}
const TodoItem = ({ todo: { idx, task, completed }, todoToggle, todoUpdate, todoRemove }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState(task);

  const handleUpdateTask = (e: ChangeEvent<HTMLInputElement>) => setUpdateTask(e.target.value);
  const handleEditStatus = () => setIsEdit(!isEdit);
  const handleToggle = () => todoToggle(idx);
  const handleRemove = () => todoRemove(idx);
  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    todoUpdate(idx, updateTask);
    handleEditStatus();
  };

  return isEdit ? (
    <S.EditTodo isCompleted={completed}>
      <form onSubmit={handleUpdate}>
        <input type='text' value={updateTask} onChange={handleUpdateTask} />
        <button>save</button>
      </form>
    </S.EditTodo>
  ) : (
    <S.ViewTodo isCompleted={completed}>
      <i className={completed ? 'xi-check-square' : 'xi-checkbox-blank'} />
      <p onClick={handleToggle}>{task}</p>
      <button type='button' onClick={handleEditStatus}>
        <i className='xi-pen' />
      </button>
      <button type='button' onClick={handleRemove}>
        <i className='xi-trash' />
      </button>
    </S.ViewTodo>
  );
};

export default TodoItem;
