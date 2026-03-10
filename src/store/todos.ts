import { atomWithStorage } from 'jotai/utils';
import type { Todo } from '@/types/todo';

// 로컬 스토리지와 동기화되는 Todo 도메인 상태
export const todosAtom = atomWithStorage<Todo[]>('todos', []);

// 쓰기 가능한 atom 별칭 (기존 todosAtomWithStorage 대체)
export const todosAtomWithStorage = todosAtom;

