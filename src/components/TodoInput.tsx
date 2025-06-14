import { useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { todosAtomWithStorage } from '@/store/todo';
import { Todo } from '@/types/todo';
import { format } from 'date-fns';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function TodoInput() {
  const [text, setText] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [todos, setTodos] = useAtom(todosAtomWithStorage);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const selectedDate = date || format(new Date(), 'yyyy-MM-dd');
    const newTodo: Todo = {
      id: generateId(),
      text: text.trim(),
      date: selectedDate,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setText('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border rounded bg-background-secondary text-text-primary"
      />
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="flex-1 p-2 border rounded bg-background-secondary text-text-primary"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-accent-primary text-primary rounded hover:bg-accent-hover"
      >
        추가
      </button>
    </form>
  );
} 