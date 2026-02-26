import { format, parseISO } from 'date-fns';
import type { Todo } from '@/types/todo';

interface TodoListViewProps {
  todos: Todo[];
  onComplete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export default function TodoListView({
  todos,
  onComplete,
  onEdit,
  onDelete,
}: TodoListViewProps) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`flex items-center justify-between p-3 rounded todo-list ${
            todo.completed ? 'bg-background-tertiary' : 'bg-background-secondary'
          }`}
        >
          <span
            className={`${
              todo.completed ? 'line-through text-text-tertiary' : 'text-text-primary'
            }`}
          >
            [{format(parseISO(todo.date), 'yyyy년 MM월 dd일')}] {todo.text}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onComplete(todo.id)}
              className={`px-2 py-1 text-sm rounded ${
                todo.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {todo.completed ? '취소' : '완료'}
            </button>
            <button
              onClick={() => onEdit(todo)}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
