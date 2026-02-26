import { atom } from 'jotai';
import { Todo, ViewMode, TimeRange } from '@/types/todo';
import { loadTodos, saveTodos } from '@/utils/storage';

// atom 생성 시 초기값으로 localStorage의 데이터 사용
export const todosAtom = atom<Todo[]>(loadTodos());

// atom에 저장 시 localStorage에도 저장하도록 수정
export const todosAtomWithStorage = atom(
  (get) => get(todosAtom),
  (get, set, newTodos: Todo[]) => {
    set(todosAtom, newTodos);
    saveTodos(newTodos);
  }
);

export const viewModeAtom = atom<ViewMode>('list');
export const timeRangeAtom = atom<TimeRange>('today');
export const isModalOpenAtom = atom<boolean>(false);
export const editingTodoAtom = atom<Todo | null>(null);