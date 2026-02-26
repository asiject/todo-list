import { filterAndSortTodos, getDateRange } from '@/utils/todoFilter';
import type { Todo } from '@/types/todo';

describe('getDateRange', () => {
  it('today는 같은 날 범위를 반환한다', () => {
    const base = new Date(2024, 0, 15, 10, 0, 0);
    const { start, end } = getDateRange('today', base);

    expect(start.getDate()).toBe(15);
    expect(end.getDate()).toBe(15);
    expect(start.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  it('nextWeek는 base 기준 다음 주의 주간 범위를 반환한다', () => {
    const base = new Date(2024, 0, 15, 10, 0, 0);
    const { start, end } = getDateRange('nextWeek', base);

    expect(start.getTime()).toBeLessThan(end.getTime());
  });
});

describe('filterAndSortTodos', () => {
  const todos: Todo[] = [
    { id: '1', text: '오늘 할 일', date: '2024-01-15', completed: false },
    { id: '2', text: '지난달 할 일', date: '2023-12-10', completed: false },
    { id: '3', text: '오늘 완료된 일', date: '2024-01-15', completed: true },
  ];

  it('today 범위에서 오늘 todo만 필터링한다', () => {
    const base = new Date(2024, 0, 15, 10, 0, 0);
    const result = filterAndSortTodos(todos, 'today', base);

    expect(result.map((t) => t.id)).toEqual(['1', '3']);
  });

  it('같은 날짜에서는 미완료가 완료보다 먼저 온다', () => {
    const base = new Date(2024, 0, 15, 10, 0, 0);
    const result = filterAndSortTodos(todos, 'today', base);

    expect(result[0].completed).toBe(false);
    expect(result[1].completed).toBe(true);
  });
});

