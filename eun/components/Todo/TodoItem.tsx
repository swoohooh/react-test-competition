import { BaseSyntheticEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';
import { DeleteIcon } from '../Icon/DeleteIcon';
import { EditIcon } from '../Icon/EditIcon';

export interface ITodoItem {
  id: number;
  content: string;
  completed: boolean;
}

export type TodoItemProps = {
  todo: ITodoItem;
  completeTodo: (id: number) => void;
  editTodo: (id: number, content: string) => void;
  deleteTodo: (id: number) => void;
};

const TodoItem = ({ todo, completeTodo, editTodo, deleteTodo }: TodoItemProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(todo?.content);

  const inputRef = useRef<HTMLInputElement>(null);

  const clickEdit = useCallback(() => {
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

  const pressEnter = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter') {
        setEdit(false);
        editTodo(todo?.id, newContent);
      }
    },
    [setEdit, editTodo, todo, newContent],
  );

  return (
    <div className="mx-2 mt-2 grid grid-cols-12 items-center gap-1">
      <div className="col-span-1">
        <input
          type="checkbox"
          className="mr-5 h-4 w-4"
          onChange={() => completeTodo(todo?.id)}
          checked={todo?.completed}
        />
      </div>

      <div className="col-span-9 flex justify-start overflow-x-scroll ">
        {edit ? (
          <input
            type="text"
            ref={inputRef}
            autoFocus={true}
            value={newContent}
            className="w-full rounded-lg border-2 p-1"
            onKeyDown={pressEnter}
            onChange={onChangeContent}
            onBlur={() => {
              setEdit(false);
              setNewContent(todo.content);
            }}
          />
        ) : (
          todo?.content
        )}
      </div>
      <div className="col-span-2 flex justify-end gap-2">
        <div onClick={clickEdit}>
          <EditIcon className="h-4 w-4 cursor-pointer" />
        </div>
        <div onClick={() => deleteTodo(todo?.id)}>
          <DeleteIcon className="h-4 w-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
