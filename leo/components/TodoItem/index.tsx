import { ChangeEvent, FormEvent, useState } from 'react';
import type { ITodo } from '../../pages';
import * as S from './styles';

interface Props {
  data: ITodo;
  toggleTodo: (idx: ITodo['idx']) => void;
  updateTodo: (idx: ITodo['idx'], task: ITodo['task']) => void;
  deleteTodo: (idx: ITodo['idx']) => void;
}
const TodoItem = ({ data: { idx, task, completed }, toggleTodo, updateTodo, deleteTodo }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState(task);

  const handleUpdateTask = (e: ChangeEvent<HTMLInputElement>) => setUpdateTask(e.target.value);
  const handleEditStatus = () => setIsEdit(!isEdit);
  const handleToggle = () => toggleTodo(idx);
  const handleRemove = () => deleteTodo(idx);
  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateTodo(idx, updateTask);
    handleEditStatus();
  };

  return isEdit ? (
    <S.EditTodo data-testid='todoEdit' isCompleted={completed}>
      <form onSubmit={handleUpdate}>
        <input data-testid='todoEditInput' type='text' value={updateTask} onChange={handleUpdateTask} />
        <button data-testid='todoEditSaveButton'>save</button>
      </form>
    </S.EditTodo>
  ) : (
    <S.ViewTodo data-testid='todo' isCompleted={completed}>
      <i data-testid='todoIcon' className={completed ? 'xi-check-square' : 'xi-checkbox-blank'} />
      <p data-testid='todoText' onClick={handleToggle}>{task}</p>
      <button data-testid='todoEditButton' type='button' onClick={handleEditStatus}>
        <i className='xi-pen' />
      </button>
      <button data-testid='todoDeleteButton' type='button' onClick={handleRemove}>
        <i className='xi-trash' />
      </button>
    </S.ViewTodo>
  );
};

export default TodoItem;
