'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, startOfDay, endOfDay } from 'date-fns';
import { todosAtom, viewModeAtom, timeRangeAtom } from '@/store/todo';
import Header from '@/components/Header';
import ViewToggle from '@/components/ViewToggle';
import ListView from '@/components/ListView';
import CalendarView from '@/components/CalendarView';
import EditModal from '@/components/EditModal';
import { ViewMode, TimeRange } from '@/types/todo';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos] = useAtom(todosAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [timeRange, setTimeRange] = useAtom(timeRangeAtom);

  const getDateRange = () => {
    const today = new Date();
    switch (timeRange) {
      case 'week':
        return {
          start: startOfWeek(today),
          end: endOfWeek(today),
        };
      case 'nextWeek':
        const nextWeekStart = new Date(today);
        nextWeekStart.setDate(today.getDate() + 7);
        return {
          start: startOfWeek(nextWeekStart),
          end: endOfWeek(nextWeekStart),
        };
      case 'month':
        return {
          start: startOfMonth(today),
          end: endOfMonth(today),
        };
      default:
        return {
          start: startOfDay(today),
          end: endOfDay(today),
        };
    }
  };

  const { start, end } = getDateRange();
  const filteredTodos = todos
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

  return (
    <main className="min-h-screen bg-background-primary text-text-primary p-4">
      <Header />
      
      <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

      <div className="flex-1">
        {viewMode === 'calendar' ? (
          <CalendarView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        ) : (
          <ListView
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            filteredTodos={filteredTodos}
          />
        )}
      </div>

      <EditModal />
    </main>
  );
}
