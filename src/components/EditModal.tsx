import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { todosAtomWithStorage, isModalOpenAtom, editingTodoAtom } from '@/store/todo';
import { Todo } from '@/types/todo';

export default function EditModal() {
  const [todos, setTodos] = useAtom(todosAtomWithStorage);
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [editingTodo, setEditingTodo] = useAtom(editingTodoAtom);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      setDate(editingTodo.date);
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTodo) return;

    setTodos(
      todos.map((todo) =>
        todo.id === editingTodo.id
          ? { ...todo, text: text.trim(), date }
          : todo
      )
    );

    handleClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
    setText('');
    setDate('');
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 modal">
        <h2 className="text-xl font-bold mb-4">할 일 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">날짜</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">할 일</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded hover:bg-gray-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 