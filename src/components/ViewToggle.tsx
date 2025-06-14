import { ViewMode } from '@/types/todo';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onViewModeChange('list')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          viewMode === 'list'
            ? 'bg-blue-500 text-white'
            : 'bg-background-secondary text-text-primary hover:bg-background-tertiary'
        }`}
      >
        리스트 보기
      </button>
      <button
        onClick={() => onViewModeChange('calendar')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          viewMode === 'calendar'
            ? 'bg-blue-500 text-white'
            : 'bg-background-secondary text-text-primary hover:bg-background-tertiary'
        }`}
      >
        캘린더 보기
      </button>
    </div>
  );
} 