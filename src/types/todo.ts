export interface Todo {
  id: string;
  text: string;
  date: string;
  completed: boolean;
}

export type ViewMode = 'list' | 'calendar';
export type TimeRange = 'today' | 'week' | 'month' | 'nextWeek'; 