import TodoInput from './TodoInput';

export default function Header() {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold mb-6">할 일 관리</h1>
      <div className="mb-6">
        <TodoInput />
      </div>
    </header>
  );
} 