import { render, screen, fireEvent } from '@testing-library/react';
import TodoListView from './TodoListView';
import type { Todo } from '@/types/todo';

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: '1',
  text: '테스트 할 일',
  date: '2024-01-15',
  completed: false,
  ...overrides,
});

describe('<TodoListView />', () => {
  it('빈 목록일 때 안내 문구를 표시한다', () => {
    render(
      <TodoListView todos={[]} onComplete={jest.fn()} onEdit={jest.fn()} onDelete={jest.fn()} />,
    );

    expect(
      screen.getByText('이 날짜에는 등록된 할 일이 없습니다.'),
    ).toBeInTheDocument();
  });

  it('투두 텍스트와 날짜를 렌더링한다', () => {
    render(
      <TodoListView
        todos={[makeTodo({ text: '코드 작성하기', date: '2024-01-15' })]}
        onComplete={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    expect(screen.getByText(/코드 작성하기/)).toBeInTheDocument();
    expect(screen.getByText(/\[2024년 01월 15일]/)).toBeInTheDocument();
  });

  it('완료/수정/삭제 버튼 클릭 시 콜백을 호출한다', () => {
    const onComplete = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const todo = makeTodo();

    render(
      <TodoListView
        todos={[todo]}
        onComplete={onComplete}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '완료' }));
    expect(onComplete).toHaveBeenCalledWith(todo.id);

    fireEvent.click(screen.getByRole('button', { name: '수정' }));
    expect(onEdit).toHaveBeenCalledWith(todo);

    fireEvent.click(screen.getByRole('button', { name: '삭제' }));
    expect(onDelete).toHaveBeenCalledWith(todo.id);
  });
});
