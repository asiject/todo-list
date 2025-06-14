import { useAtom } from 'jotai';
import { todosAtomWithStorage, isModalOpenAtom, editingTodoAtom } from '@/store/todo';
import { Todo } from '@/types/todo';
import { format, parseISO } from 'date-fns';

interface TodoListProps {
  date: string;
}

export default function TodoList({ date }: TodoListProps) {
  const [todos, setTodos] = useAtom(todosAtomWithStorage);
  const [, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [, setEditingTodo] = useAtom(editingTodoAtom);

  const filteredTodos = todos.filter((todo) => todo.date === date);

  const handleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className={`flex items-center justify-between p-3 rounded todo-list ${
            todo.completed ? 'bg-background-tertiary' : 'bg-background-secondary'
          }`}
        >
          <span className={`${todo.completed ? 'line-through text-text-tertiary' : 'text-text-primary'}`}>
            [{format(parseISO(todo.date), 'yyyy년 MM월 dd일')}] {todo.text}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleComplete(todo.id)}
              className={`px-2 py-1 text-sm rounded ${
                todo.completed 
                  ? 'bg-yellow-500 hover:bg-yellow-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {todo.completed ? '취소' : '완료'}
            </button>
            <button
              onClick={() => handleEdit(todo)}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              수정
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
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