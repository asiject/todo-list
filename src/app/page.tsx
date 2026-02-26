'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import { todosAtom, viewModeAtom, timeRangeAtom } from '@/store/todo';
import Header from '@/components/Header';
import ViewToggle from '@/components/ViewToggle';
import ListView from '@/components/ListView';
import CalendarView from '@/components/CalendarView';
import EditModal from '@/components/EditModal';
import { filterAndSortTodos } from '@/utils/todoFilter';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos] = useAtom(todosAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [timeRange, setTimeRange] = useAtom(timeRangeAtom);
  const filteredTodos = filterAndSortTodos(todos, timeRange);

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
