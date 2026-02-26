import { TimeRange } from '@/types/todo';
import TodoList from './TodoList';

interface ListViewProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  filteredTodos: Array<{ id: string; date: string }>;
}

export default function ListView({
  timeRange,
  onTimeRangeChange,
  filteredTodos,
}: ListViewProps) {
  const uniqueDates = Array.from(new Set(filteredTodos.map((t) => t.date))).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
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
      </div>
      <div className="mt-4">
        {uniqueDates.map((date) => (
          <TodoList key={date} date={date} />
        ))}
      </div>
    </div>
  );
} 