# Reflective 블로그 서비스

**Reflective**는 사용자들이 회고를 작성하고 공유할 수 있는 블로그 서비스입니다. 이 시스템은 사용자 친화적인 블록 에디터를 제공하며, 다양한 글 작성 및 편집 기능을 통해 유연하게 글을 작성할 수 있습니다.

## 시스템 아키텍처

![Reflective 시스템 아키텍처](https://assetkungya.s3.ap-northeast-2.amazonaws.com/reflective.png)

### 주요 아키텍처 구성 요소:

- **프론트엔드**: React로 작성된 사용자 인터페이스(UI)로, 블로그 글 작성, 편집 및 게시 기능을 제공합니다.
- **백엔드**: Express 서버를 사용하여 데이터 처리 및 API 요청을 관리합니다.
- **데이터베이스**: MongoDB를 이용해 사용자 데이터와 게시글 데이터를 저장합니다.
- **블록 에디터**: 사용자들이 자유롭게 글을 작성할 수 있는 커스터마이즈 가능한 블록 에디터입니다. (자체 개발)

## 모노레포 구조

이 프로젝트는 **모노레포** 방식으로 구축되었으며, **Feature-Sliced Design(FSD)** 아키텍처를 채택하여 각 기능을 독립적인 모듈로 관리하고 있습니다.
모노레포 구조는 여러 애플리케이션을 하나의 리포지토리에서 관리할 수 있게 하며, 앱 및 공통 라이브러리의 버전 관리와 의존성을 효율적으로 관리할 수 있습니다.

### apps/web

- **웹 애플리케이션**: React 기반의 사용자 인터페이스입니다. `Feature-Sliced Design (FSD)` 방식을 적용하여 앱을 기능 단위로 나누어 각 기능을 독립적으로 개발하고 관리합니다.

### apps/server

- **웹 서버**: Express로 작성된 백엔드 서버입니다. 클라이언트와의 API 통신을 처리하고, 데이터를 관리하는 기능을 담당합니다.

### packages/ui

- **공통 UI 라이브러리**: 프로젝트 전반에서 재사용 가능한 UI 컴포넌트를 제공하는 패키지입니다. `apps/web`에서 이 라이브러리를 참조

## 블록 에디터 기능

<table>
  <tr>
    <td><img src="https://assetkungya.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A1%E1%84%8B%E1%85%B4-%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC-3.gif" alt="블록 에디터 1" /></td>
    <td><img src="https://assetkungya.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A1%E1%84%8B%E1%85%B4-%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC-4.gif" alt="블록 에디터 2" /></td>
  </tr>
</table>

### 1. **블록 기반 편집**

- 각 콘텐츠(문단, 이미지, 목록 등)를 블록 단위로 분리하여, 사용자가 자유롭게 콘텐츠를 삽입, 이동, 삭제할 수 있습니다.
- 이를 통해 직관적이고 유연한 글 작성이 가능합니다.

### 2. **실시간 미리보기**

- 작성 중인 콘텐츠를 실시간으로 미리 볼 수 있어, 포스트의 레이아웃을 즉시 확인하고 수정할 수 있습니다.
- 글 작성과 동시에 포스트의 최종 형태를 시각적으로 확인할 수 있어 효율적인 작성이 가능합니다.

### 3. **다양한 블록 타입**

- 텍스트, 이미지, 코드 블록, 인용 등 다양한 블록 타입을 제공하여, 사용자는 포스트의 내용에 맞는 다양한 형식으로 글을 작성할 수 있습니다.
- 또한, 차트를 삽입할 수 있는 기능을 제공하여, 데이터를 시각적으로 표현할 수 있습니다.

## 블록 에디터 성능 최적화

### 문제

- 실시간 입력 시 렌더링 지연
- 블록 수 증가로 성능 저하
- 메모리 사용량 증가

### 해결 방법

1. **메모이제이션**

   - `React.memo`, `useMemo`, `useCallback` 사용해 불필요한 리렌더링 방지.

2. **디바운싱**

   - 입력 지연 처리로 과도한 상태 업데이트 방지 (`useDebounce`).

3. **동기적 DOM 업데이트**

   - `useLayoutEffect`로 화면 깜박임 방지.

4. **Recoil 최적화**

   - 상태 세분화, `Map` 자료구조 활용, `useRecoilCallback`으로 비동기 로직 관리.

5. **리스트 가상 렌더링**

   - 화면에 보이는 요소만 렌더링하여 성능 개선.

6. **메모리 관리**
   - `useRef`로 불필요한 리렌더링 방지, 언마운트 시 리소스 정리.

### 결과

- 블록 수 증가에도 일정한 성능 유지, 메모리 사용 최적화

![성능최적화](https://assetkungya.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-03-14+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+11.45.12.png)

## 많은 데이터 메모리 누수 문제 해결: 가상 스크롤

### 문제

- 데이터 양이 증가함에 따라 렌더링 성능 저하 문제 발생
- 리스트 항목이 많을 때 스크롤 시 버벅임과 메모리 사용량 급증
- 전체 데이터를 한 번에 렌더링하는 방식으로 인해 성능 저하

### 문제 해결

#### 1. **가상 스크롤 메커니즘**

![가상스크롤](https://assetkungya.s3.ap-northeast-2.amazonaws.com/image-1.png)

- 화면에 보이는 요소만 선택적으로 렌더링하여 성능을 최적화합니다.
- 90개 이상의 아이템도 실제 렌더링되는 아이템은 18-21개로 제한하여 성능을 300% 개선합니다.

#### 2. **오버스캔(overscan) 기법**

- 스크롤 경계 주변에 추가 요소를 미리 렌더링하여 스크롤 시 부드러운 UX를 제공합니다.
- 오버스캔 기법을 사용하면 스크롤 이동 시 예기치 않은 렌더링 지연을 줄이고, 사용자에게 매끄러운 인터페이스를 제공합니다.

#### 3. **데이터 페이지네이션 및 효율적 데이터 로드**

- **`useSuspenseInfiniteQuery`**를 사용하여 백엔드에서 데이터를 30개씩 페이지네이션하여 효율적으로 데이터를 관리합니다.
- 스크롤 위치에 기반한 자동 데이터 로드를 구현하여, 사용자가 스크롤할 때 필요한 데이터만 로드합니다.

#### 4. **쓰로틀링과 메모이제이션**

- 쓰로틀링(throttling)과 메모이제이션(memoization)을 사용하여 사용자의 인터랙션을 최소화하고, 자주 발생하는 상태 업데이트를 방지하여 성능을 개선합니다.
