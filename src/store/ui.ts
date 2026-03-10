import { atom } from 'jotai';
import type { Todo, TimeRange, ViewMode } from '@/types/todo';

// 뷰 모드 및 기간 선택 상태
export const viewModeAtom = atom<ViewMode>('list');
export const timeRangeAtom = atom<TimeRange>('today');

// 모달 및 편집 중인 Todo 상태
export const isModalOpenAtom = atom<boolean>(false);
export const editingTodoAtom = atom<Todo | null>(null);

// 토스트 알림 상태
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

export const toastsAtom = atom<Toast[]>([]);

