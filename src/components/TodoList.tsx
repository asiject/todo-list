import { useAtom } from 'jotai';
import { isModalOpenAtom, editingTodoAtom } from '@/store/todo';
import { useTodos } from '@/hooks/useTodos';
import type { Todo } from '@/types/todo';
import TodoListView from '@/components/TodoListView';

interface TodoListProps {
  date: string;
}

export default function TodoList({ date }: TodoListProps) {
  const { todos, toggleComplete, removeTodo } = useTodos();
  const [, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [, setEditingTodo] = useAtom(editingTodoAtom);

  const filteredTodos = todos.filter((todo) => todo.date === date);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <TodoListView
      todos={filteredTodos}
      onComplete={toggleComplete}
      onEdit={handleEdit}
      onDelete={removeTodo}
    />
  );
} 