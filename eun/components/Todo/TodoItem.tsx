import { setEngine } from 'crypto';
import type { NextPage } from 'next';
import { BaseSyntheticEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DeleteIcon } from '../Icon/DeleteIcon';
import { EditIcon } from '../Icon/EditIcon';

export interface ITodoItem {
  id: number;
  content: string;
  completed: boolean;
}

export type TodoItemProps = {
  todo: ITodoItem;
  handleComplete: (id: number) => void;
  handleEdit: (id: number, content: string) => void;
  handleDelete: (id: number) => void;
};

const TodoItem = ({ todo, handleComplete, handleEdit, handleDelete }: TodoItemProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(todo?.content);

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickEdit = useCallback(() => {
    setEdit(true);
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [setEdit, inputRef]);

  const onChangeContent = useCallback(
    (e: BaseSyntheticEvent) => {
      setNewContent(e.target.value);
    },
    [setNewContent],
  );

  const onPressEnter = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
        setEdit(false);
        handleEdit(todo?.id, newContent);
      }
    },
    [setEdit, handleEdit, todo, newContent],
  );

  return (
    <div className="grid grid-cols-12 gap-1 items-center mt-2 mx-2">
      <div className="col-span-1">
        <input type="checkbox" className="mr-5 w-4 h-4" onChange={() => handleComplete(todo?.id)} />
      </div>

      <div className="col-span-9 flex justify-start overflow-x-scroll ">
        {edit ? (
          <input
            type="text"
            ref={inputRef}
            autoFocus={true}
            value={newContent}
            className="border-2 rounded-lg p-1 w-full"
            onKeyDown={onPressEnter}
            onChange={onChangeContent}
            onBlur={() => setEdit(false)}
          />
        ) : (
          todo?.content
        )}
      </div>
      <div className="col-span-2 flex gap-2 justify-end">
        <div onClick={onClickEdit}>
          <EditIcon className="w-4 h-4 cursor-pointer" />
        </div>
        <div onClick={() => handleDelete(todo?.id)}>
          <DeleteIcon className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
