import type { NextPage } from 'next';
import { BaseSyntheticEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';

export type TodoInputProps = {
  handleAdd: (content: string) => void;
};

const TodoInput = ({ handleAdd }: TodoInputProps) => {
  const [content, setContent] = useState<string>('');

  const onChangeContent = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault();

      setContent(e.target.value);
    },
    [setContent],
  );

  const onPressEnter = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key == 'Enter' && content != '') {
        e.preventDefault();
        handleAdd(content);
        setContent('');
        return;
      }
    },
    [handleAdd, setContent, content],
  );

  return (
    <div className="flex border-2 rounded-xl w-90 h-14 pl-4 pr-5">
      <input
        type="text"
        placeholder="Please enter your todo!"
        value={content}
        className="border-0 outline-none text-xl w-full"
        onChange={onChangeContent}
        onKeyPress={onPressEnter}
      />
    </div>
  );
};

export default TodoInput;
