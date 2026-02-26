import { useAtom } from 'jotai';
import { todosAtomWithStorage } from '@/store/todo';
import type { Todo } from '@/types/todo';

export function useTodos() {
  const [todos, setTodos] = useAtom(todosAtomWithStorage);

  const addTodo = (todo: Todo) => setTodos([...todos, todo]);

  const updateTodo = (id: string, patch: Partial<Todo>) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const removeTodo = (id: string) => setTodos(todos.filter((t) => t.id !== id));

  const toggleComplete = (id: string) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  return { todos, addTodo, updateTodo, removeTodo, toggleComplete };
}
