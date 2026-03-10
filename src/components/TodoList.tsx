import { useAtom } from 'jotai';
import { isModalOpenAtom, editingTodoAtom } from '@/store/ui';
import { useTodos } from '@/hooks/useTodos';
import type { Todo } from '@/types/todo';
import TodoListView from '@/components/TodoListView';
import { useToast } from '@/hooks/useToast';

interface TodoListProps {
  date: string;
  hideCompleted?: boolean;
}

export default function TodoList({ date, hideCompleted = false }: TodoListProps) {
  const { todos, toggleComplete, removeTodo } = useTodos();
  const [, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [, setEditingTodo] = useAtom(editingTodoAtom);
  const { showToast } = useToast();

  const filteredTodos = todos
    .filter((todo) => todo.date === date)
    .filter((todo) => !hideCompleted || !todo.completed);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleComplete = (id: string) => {
    toggleComplete(id);
    showToast('할 일 상태가 변경되었습니다.', 'success');
  };

  const handleDelete = (id: string) => {
    removeTodo(id);
    showToast('할 일이 삭제되었습니다.', 'info');
  };

  return (
    <TodoListView
      todos={filteredTodos}
      onComplete={handleComplete}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
} 