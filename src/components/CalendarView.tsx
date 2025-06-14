import { format } from 'date-fns';
import TodoCalendar from './Calendar';
import TodoList from './TodoList';

interface CalendarViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function CalendarView({ selectedDate, onSelectDate }: CalendarViewProps) {
  return (
    <div>
      <TodoCalendar
        onSelectDate={(date) => {
          if (date instanceof Date) {
            onSelectDate(date);
          }
        }}
      />
      <div className="mt-4">
        <TodoList date={format(selectedDate, 'yyyy-MM-dd')} />
      </div>
    </div>
  );
} 