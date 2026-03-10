import { useAtom } from 'jotai';
import Calendar from 'react-calendar';
import { todosAtom } from '@/store/todos';
import { format } from 'date-fns';
import { Value } from 'react-calendar/dist/shared/types.js';
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
  onSelectDate: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TodoCalendar({ onSelectDate }: CalendarProps) {
  const [todos] = useAtom(todosAtom);

  const tileContent = ({ date }: { date: Date }) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const count = todos.filter((todo) => todo.date === dateStr).length;
    if (!count) return null;
    return (
      <div className="mt-1 flex justify-center">
        <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 text-xs rounded-full bg-accent-primary text-primary">
          {count}
        </span>
      </div>
    );
  };

  return (
    <div className="p-4 rounded-lg shadow">
      <Calendar
        locale="en-US"
        onChange={onSelectDate}
        tileContent={tileContent}
        className="w-full"
      />
    </div>
  );
} 