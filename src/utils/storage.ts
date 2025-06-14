import { Todo } from '@/types/todo';

const STORAGE_KEY = 'todos';

export const saveTodos = (todos: Todo[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

export const loadTodos = (): Todo[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}; 