import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import type { TimeRange, Todo } from '@/types/todo';

export function getDateRange(timeRange: TimeRange, baseDate: Date = new Date()) {
  switch (timeRange) {
    case 'week':
      return { start: startOfWeek(baseDate), end: endOfWeek(baseDate) };
    case 'nextWeek': {
      const nextWeekStart = new Date(baseDate);
      nextWeekStart.setDate(baseDate.getDate() + 7);
      return { start: startOfWeek(nextWeekStart), end: endOfWeek(nextWeekStart) };
    }
    case 'month':
      return { start: startOfMonth(baseDate), end: endOfMonth(baseDate) };
    case 'today':
    default:
      return { start: startOfDay(baseDate), end: endOfDay(baseDate) };
  }
}

export function filterAndSortTodos(
  todos: Todo[],
  timeRange: TimeRange,
  baseDate: Date = new Date()
) {
  const { start, end } = getDateRange(timeRange, baseDate);

  return todos
    .filter((todo) => {
      const todoDate = parseISO(todo.date);
      return todoDate >= start && todoDate <= end;
    })
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
