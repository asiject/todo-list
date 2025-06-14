import { useAtom } from 'jotai';
import Calendar from 'react-calendar';
import { todosAtom } from '@/store/todo';
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
    const hasTodo = todos.some((todo) => todo.date === dateStr);
    return hasTodo ? <div className="w-1 h-1 bg-accent-primary rounded-full mx-auto mt-1" /> : null;
  };

  return (
    <div className="bg-background-secondary p-4 rounded-lg shadow text-primary">
      <Calendar
        onChange={onSelectDate}
        tileContent={tileContent}
        className="w-full [&_.react-calendar__tile]:text-primary [&_.react-calendar__month-view__weekdays]:text-primary [&_.react-calendar__month-view__days__day]:text-primary [&_.react-calendar__tile--active]:bg-accent-primary [&_.react-calendar__tile--active]:text-white [&_.react-calendar__tile--now]:bg-background-tertiary [&_.react-calendar__tile--now]:text-accent-primary"
      />
    </div>
  );
} 