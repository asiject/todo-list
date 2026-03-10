## to-do-list

Next.js + TypeScript + TailwindCSS + Jotai로 구현한 할 일 관리 웹앱입니다.  
리스트/캘린더 뷰 전환, 기간 필터링, 로컬 스토리지 영속성, 모달 기반 수정 등을 지원합니다.

---

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: React 19, TailwindCSS 4
- **상태 관리**: Jotai
- **날짜 유틸**: date-fns
- **테스트**: Jest, @testing-library

---

## 주요 기능

- **투두 추가/삭제/수정**
  - 날짜를 지정하여 할 일을 추가
  - 기존 할 일은 모달에서 텍스트/날짜 수정
  - 개별 삭제 및 완료/취소 토글
- **뷰 전환**
  - `리스트 뷰` / `캘린더 뷰` 전환
  - 리스트 뷰에서는 기간 필터(오늘/이번주/다음주/이번달) 제공
- **기간 필터링**
  - `src/utils/todoFilter.ts`에 정의된 `getDateRange`, `filterAndSortTodos`로
    - 기간별(오늘/이번주/다음주/이번달) 투두 필터링
    - 날짜 내에서는 미완료 → 완료 순으로 정렬
- **로컬 스토리지 저장**
  - `src/store/todos.ts`의 `atomWithStorage('todos', [])`로 브라우저 localStorage에 자동 저장

- **UI/UX**
  - 빈 상태(할 일 없음) 시 안내 문구와 "할 일 추가하기" CTA 버튼
  - 리스트 뷰에서 날짜별 섹션 헤더 및 접기/펼치기
  - 캘린더 타일에 날짜별 투두 개수 배지 표시
  - 추가/완료/수정/삭제 시 토스트 피드백 (우측 하단)

---

## 코드 구조 (핵심 파일)

- **페이지**
  - `src/app/page.tsx`  
    - 전체 레이아웃 구성
    - Jotai atom으로 전역 상태 관리
    - `filterAndSortTodos`로 기간 필터링된 투두 리스트 생성

- **상태 관리**
  - `src/store/todo.ts`  
    - 기존 경로 호환용 re-export (실제 정의는 아래 모듈)
  - `src/store/todos.ts` (도메인)
    - `todosAtom` / `todosAtomWithStorage` — Jotai `atomWithStorage`로 localStorage 연동
  - `src/store/ui.ts` (UI 상태)
    - `viewModeAtom`, `timeRangeAtom`, `isModalOpenAtom`, `editingTodoAtom`, `toastsAtom`

- **유틸**
  - `src/utils/storage.ts`  
    - (선택) `saveTodos`, `loadTodos` — 현재는 `atomWithStorage` 사용으로 대체 가능
  - `src/utils/todoFilter.ts`  
    - `getDateRange(timeRange, baseDate?)`
    - `filterAndSortTodos(todos, timeRange, baseDate?)`

- **훅**
  - `src/hooks/useTodos.ts` — `addTodo`, `updateTodo`, `removeTodo`, `toggleComplete` 등 투두 조작 API
  - `src/hooks/useToast.ts` — `showToast`, `hideToast` 토스트 알림

- **컴포넌트**
  - `src/components/TodoInput.tsx` : 새 할 일 입력/추가
  - `src/components/TodoList.tsx` : 특정 날짜의 투두 필터링 + 컨테이너 역할
  - `src/components/TodoListView.tsx` : 투두 리스트 UI 렌더링(프레젠테이션 전용)
  - `src/components/ListView.tsx` : 기간 필터 + 날짜별 섹션 헤더/접기 + 빈 상태 CTA
  - `src/components/CalendarView.tsx` : 캘린더와 연동된 투두 리스트 (날짜별 개수 배지)
  - `src/components/EditModal.tsx` : 기존 투두 수정 모달
  - `src/components/ToastContainer.tsx` : 전역 토스트 알림 표시

---

## 이번 리팩터링에서 개선한 점

- **도메인 로직 분리**
  - 페이지 컴포넌트(`page.tsx`)에 있던 날짜 범위/필터/정렬 로직을 `src/utils/todoFilter.ts`로 분리
  - 테스트 가능하고 재사용 가능한 순수 함수 형태로 정리

- **상태 조작 추상화**
  - `useTodos` 훅 도입으로, 컴포넌트가 atom을 직접 조작하지 않고
    `addTodo/updateTodo/removeTodo/toggleComplete` API를 사용하도록 개선

- **컨테이너 / 뷰 분리**
  - `TodoList`는 데이터 필터링과 모달 열기 같은 컨테이너 역할
  - `TodoListView`는 실제 UI 렌더링만 담당 → 테스트와 디자인 변경이 쉬움

- **버그 및 일관성 개선**
  - `ListView`에서 필터 값 `"day"` → 타입과 일치하는 `"today"`로 수정
  - 같은 날짜의 `TodoList`가 여러 번 렌더되던 문제를, 날짜 기준으로 유니크하게 그룹핑하여 해결
  - `EditModal`이 `todosAtomWithStorage`를 사용하도록 변경하여 수정 내용도 localStorage에 반영되도록 개선

- **테스트 인프라 구축**
  - Jest + @testing-library 기반 테스트 환경 추가
  - `src/utils/todoFilter.test.ts` — 날짜 범위/필터/정렬 단위 테스트
  - `src/components/TodoListView.test.tsx` — 빈 목록, 렌더링, 완료/수정/삭제 콜백 검증
  - `src/components/ListView.test.tsx` — 빈 상태 CTA, 기간 셀렉트, 날짜 섹션 접기/펼치기 검증

- **코드 구조 정리**
  - UI 상태(`store/ui.ts`)와 도메인 상태(`store/todos.ts`) 분리
  - Jotai `atomWithStorage` 도입으로 SSR/하이드레이션 대응

---

## 로컬 개발 방법

```bash
# 의존성 설치
yarn install

# 개발 서버 실행 (http://localhost:3000)
yarn dev

# 린트
yarn lint

# 테스트 실행
yarn test
```