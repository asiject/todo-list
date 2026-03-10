import { useState } from 'react';
import { TimeRange, type Todo } from '@/types/todo';
import TodoList from './TodoList';

interface ListViewProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  filteredTodos: Todo[];
}

export default function ListView({
  timeRange,
  onTimeRangeChange,
  filteredTodos,
}: ListViewProps) {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [collapsedDates, setCollapsedDates] = useState<Record<string, boolean>>({});

  const todosToShow = hideCompleted ? filteredTodos.filter((t) => !t.completed) : filteredTodos;
  const uniqueDates = Array.from(new Set(todosToShow.map((t) => t.date))).sort((a, b) =>
    b.localeCompare(a)
  );

  const toggleDate = (date: string) => {
    setCollapsedDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
        >
          <option value="today">오늘</option>
          <option value="week">이번주</option>
          <option value="nextWeek">다음주</option>
          <option value="month">이번달</option>
        </select>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={hideCompleted}
            onChange={(e) => setHideCompleted(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600"
          />
          <span>완료된 항목 숨기기</span>
        </label>
      </div>
      <div className="mt-4">
        {todosToShow.length === 0 ? (
          <div className="text-center py-12 bg-background-secondary rounded-lg">
            <p className="mb-2 text-lg font-semibold">아직 등록된 할 일이 없습니다.</p>
            <p className="mb-4 text-text-secondary">
              상단 입력창에서 오늘 할 일을 추가해 보세요.
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-accent-primary text-primary rounded hover:bg-accent-hover"
              onClick={() => {
                if (typeof window === 'undefined') return;
                const input = document.querySelector<HTMLInputElement>('input[type="text"]');
                input?.focus();
              }}
            >
              할 일 추가하기
            </button>
          </div>
        ) : (
          uniqueDates.map((date) => (
            <section key={date} className="mb-4">
              <button
                type="button"
                onClick={() => toggleDate(date)}
                className="w-full flex items-center justify-between px-3 py-2 bg-background-secondary rounded-t-lg"
              >
                <span className="font-semibold">{date}</span>
                <span className="text-sm text-text-secondary">
                  {collapsedDates[date] ? '펼치기' : '접기'}
                </span>
              </button>
              {!collapsedDates[date] && (
                <div className="border border-t-0 border-border-primary rounded-b-lg p-3">
                  <TodoList date={date} hideCompleted={hideCompleted} />
                </div>
              )}
            </section>
          ))
        )}
      </div>
    </div>
  );
} 