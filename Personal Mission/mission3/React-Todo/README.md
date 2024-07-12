# React + TypeScript + Vite
이 프로젝트는 React, TypeScript, Vite를 사용하여 시작할 수 있습니다. 아래는 프로젝트 설정 방법입니다.
## 프로젝트 생성
// npm 6.x
npm create vite@latest [프로젝트 명] --template react-ts
// npm 7+, extra double-dash is needed:
npm create vite@latest [프로젝트 명] -- --template react-ts

## 프로젝트 실행
해당 레포지터리 이동 후 npm install 후 npm run dev

클론 했을 경우 npm install 후 npm run dev

# 프로젝트 구조 설정
## 켄터이너/프레젠테이셔널
src/
├── components/
│   ├── Button.tsx
│   ├── TodoInput.tsx
│   ├── TodoItem.tsx
│   └── TodoList.tsx
├── containers/
│   ├── Todo.tsx
│   └── View.tsx
├── provider/
│   └── TodoProvider.tsx
└── reducer/
    └── TodoReducer.tsx


# To-Do List 사용 설명서

## 할 일 작성

1. **할 일 작성 버튼 클릭**
   - 화면에서 "할 일 작성" 버튼을 클릭합니다.

## 할 일 추가

1. **제목 작성 및 설명 입력**
   - 투두 리스트에 추가할 항목의 제목과 설명을 입력합니다.
   
2. **카테고리 선택**
   - 업무, 개인, 자유, 운동 중 하나의 카테고리를 선택합니다.

3. **추가 버튼 클릭**
   - "추가" 버튼을 클릭하여 새로운 할 일을 리스트에 추가합니다.

## 할 일 완료

1. **할 일 완료 처리**
   - 할 일이 완료되면 해당 항목을 클릭하여 완료 상태로 표시합니다.
   - 완료된 항목은 배경이 다르게 표시됩니다.

## 할 일 삭제

1. **할 일 삭제**
   - 삭제하고자 하는 할 일의 옆에 있는 "삭제" 버튼을 클릭합니다.
   - 삭제된 할 일은 목록에서 완전히 제거됩니다.

# 디자인 시스템 설계 문서

## 1. 색상 팔레트

### 배경 색상
- **기본 배경 색상:** #f3f4f6 (`var(--primary-bg-color)`)
- **보조 배경 색상:** #0f172a (`var(--secondary-bg-color)`)

### 기본 색상
- **기본 색상:** #bfdbfe (`var(--primary-color)`)
- **기본 텍스트 색상:** #000000 (`var(--primary-text-color)`)
- **보조 텍스트 색상:** #dc2626 (`var(--secondary-text-color)`)
- **세 번째 텍스트 색상:** #374151 (`var(--third-text-color)`)

### 보조 색상
- **보조 색상:** #fecaca (`var(--secondary-color)`)
- **보조 텍스트 색상:** #333333 (`var(--secondary-text-color)`)

### 입력 필드 색상
- **입력 필드 테두리 색상:** #94a3b8 (`var(--input-border-color)`)

### 완료 여부에 따른 색상
- **완료되지 않은 항목 배경 색상:** #d1d5db (`var(--form-color-uncompleted)`)
- **완료되지 않은 항목 텍스트 색상:** #6b7280 (`var(--text-color-uncompleted)`)
- **완료된 항목 배경 색상:** #3b82f6 (`var(--form-color-completed)`)
- **완료된 항목 텍스트 색상:** #ffffff (`var(--text-color-completed)`)

### 카테고리 색상
- **업무 카테고리 색상:** #bfdbfe (`var(--category-color-업무)`)
- **업무 카테고리 텍스트 색상:** #1e3a8a (`var(--category-text-color-업무)`)
- **개인 카테고리 색상:** #fecaca (`var(--category-color-개인)`)
- **개인 카테고리 텍스트 색상:** #7f1d1d (`var(--category-text-color-개인)`)
- **자유 카테고리 색상:** #bbf7d0 (`var(--category-color-자유)`)
- **자유 카테고리 텍스트 색상:** #06835f (`var(--category-text-color-자유)`)
- **운동 카테고리 색상:** #fef08a (`var(--category-color-운동)`)
- **운동 카테고리 텍스트 색상:** #b9ad3c (`var(--category-text-color-운동)`)

## 2. 간격 및 여백
- **작은 여백:** 0.5rem (`var(--padding-sm)`)
- **중간 여백:** 2.5rem (`var(--padding-md)`)
- **큰 여백:** 3rem (`var(--padding-lg)`)

## 3. 폰트 스타일

### 폰트 굵기
- **큰 제목 굵기:** font-weight: 700 (`var(--bold-lg)`)

