import { BaseSyntheticEvent, KeyboardEvent, useCallback, useState } from 'react';

export type TodoInputProps = {
  addTodo: (content: string) => void;
};

const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [content, setContent] = useState<string>('');

  const changeContent = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault();

      setContent(e.target.value);
    },
    [setContent],
  );

  const pressEnter = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key == 'Enter' && content != '') {
        e.preventDefault();
        addTodo(content);
        setContent('');
        return;
      }
    },
    [addTodo, setContent, content],
  );

  return (
    <div className="w-90 flex h-14 rounded-xl border-2 pl-4 pr-5">
      <input
        type="text"
        placeholder="Please enter your todo!"
        value={content}
        className="w-full border-0 text-xl outline-none"
        onChange={changeContent}
        onKeyPress={pressEnter}
      />
    </div>
  );
};

export default TodoInput;
