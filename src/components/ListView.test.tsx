import { render, screen, fireEvent } from '@testing-library/react';
import ListView from './ListView';
import type { TimeRange } from '@/types/todo';

describe('<ListView />', () => {
  const renderListView = (props?: Partial<React.ComponentProps<typeof ListView>>) => {
    const defaultProps = {
      timeRange: 'today' as TimeRange,
      onTimeRangeChange: jest.fn(),
      filteredTodos: [],
    };
    return render(<ListView {...defaultProps} {...props} />);
  };

  it('빈 목록일 때 안내 문구와 CTA 버튼을 보여준다', () => {
    renderListView({ filteredTodos: [] });

    expect(
      screen.getByText('아직 등록된 할 일이 없습니다.'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '할 일 추가하기' }),
    ).toBeInTheDocument();
  });

  it('기간 선택 셀렉트에서 값을 변경하면 onTimeRangeChange를 호출한다', () => {
    const onChange = jest.fn();
    renderListView({ onTimeRangeChange: onChange });

    const select = screen.getByDisplayValue('오늘');
    fireEvent.change(select, { target: { value: 'week' } });

    expect(onChange).toHaveBeenCalledWith('week');
  });

  it('날짜 섹션 헤더와 접기/펼치기 토글을 렌더링한다', () => {
    const date = '2024-01-15';
    renderListView({
      filteredTodos: [{ id: '1', text: '할 일', date, completed: false }],
    });

    // 날짜 헤더가 보이는지
    expect(screen.getByText(date)).toBeInTheDocument();

    // 처음에는 "접기" 텍스트가 보여야 함
    const toggleButton = screen.getByRole('button', { name: /접기/ });
    expect(toggleButton).toBeInTheDocument();

    // 클릭 후에는 "펼치기"로 바뀜
    fireEvent.click(toggleButton);
    expect(screen.getByRole('button', { name: /펼치기/ })).toBeInTheDocument();
  });
});
