<div align="center">

<h1>Reflective</h1>

<img src="https://reflective.site/assets/logo-Ci6SaETG.svg" alt="Reflective 로고">

<h3> "블록 에디터 기반으로 회고를 작성할 수 있는 블로그 서비스" </h3>

<br />

<h2>당신의 아이디어를 자유롭게 표현할 수 있는 공간</h2>

생각의 조각들을 블록으로 쌓아올리며 당신만의 이야기를 만들어보세요.

최적화된 블록 에디터로 글쓰기의 즐거움을 다시 발견하세요.

다양한 블록 타입으로 글, 이미지, 코드 등을 자유롭게 구성

직관적인 드래그 앤 드롭으로 콘텐츠 재배치

</br>

[✨ < Reflective > 사용해보기](https://reflective.site/)

</div>

<br />

# 목차

### [1. 프로젝트 소개](#%EF%B8%8F-프로젝트-소개)

- [< Reflective >를 만들게 된 계기](#-Reflective-를-만들게-된-계기)
- [주요 기능 설명](#주요-기능-설명)
- [프로젝트 실행 방법](#프로젝트-실행-방법)

### [2. 기술 스택](#%EF%B8%8F-기술-스택)

### [3. 기술적 경험](#-기술적-경험)

- [FE](#FE)
  - [성능 최적화](#성능-최적화)
  - [FSD 아키텍처](#fsd-아키텍처)

<br />

# ⭐️ 프로젝트 소개

## < Reflective >를 만들게 된 계기

블로그 서비스를 개발하면서 겪은 에디터 개발 과정을 공유하려고 합니다. 처음에는 많은 블로그들처럼 마크다운 에디터를 만들었습니다. 마크다운은 간단한 문법으로 글을 작성할 수 있어서 좋았지만 사용하다 보니 몇 가지 불편한 점이 있었습니다.

#### 마크다운의 한계

티스토리나 벨로그 같은 블로그를 사용해 봤다면 이런 불편함을 느껴봤을 겁니다:

- 마크다운 문법을 계속 기억해야 함: `#`, `*`, \`\`\` 같은 기호들을 계속 입력해야 하는 불편한 점이 있습니다.
- 작성하는 내용과 결과물이 다름: 왼쪽에는 마크다운, 오른쪽에는 미리보기... 계속 두 화면을 왔다 갔다 해야 했습니다.
- 목록이나 표 같은 복잡한 구조 만들기 어려움: 여러 단계의 목록을 만들 때 들여쓰기 계산하는 것이 까다로웠습니다.
- 코드 블록 외에 특별한 콘텐츠 넣기 어려움: 차트나 다이어그램 같은 요소를 삽입하려면 외부 서비스에서 이미지로 만들어 가져와야 했습니다.

#### 노션처럼 만들고 싶었습니다.

노션이나 미디엄 같은 서비스들은 블록 단위로 콘텐츠를 관리하는 방식이 정말 편리해 보였습니다. "내 블로그도 이렇게 만들면 어떨까?" 하는 생각이 들었죠. 그래서 우리는 블록 에디터 기반의 블로그 서비스, **Reflective**를 만들게 되었습니다.

<br />

## 주요 기능 설명

( gif 로딩이 느릴 수 있습니다🥹 조금만 기다려주세요 )

### [ 글 작성 ]

<table>
  <tr>
    <td><img src="https://assetkungya.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A1%E1%84%8B%E1%85%B4-%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC-3.gif" alt="블록 에디터 1" /></td>
    <td><img src="https://assetkungya.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A1%E1%84%8B%E1%85%B4-%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC-4.gif" alt="블록 에디터 2" /></td>
  </tr>

  <img src="https://github.com/kwangyoulsagong/Reflective/blob/main/readmeAssets/%EB%B8%94%EB%A1%9D%EC%97%90%EB%94%94%ED%84%B0.gif" alt="블록에디터">
</table

#### 1. **블록 기반 편집**

- 각 콘텐츠(문단, 이미지, 목록 등)를 블록 단위로 분리하여, 사용자가 자유롭게 콘텐츠를 삽입, 이동, 삭제할 수 있습니다.
- 이를 통해 직관적이고 유연한 글 작성이 가능합니다.

#### 2. **실시간 미리보기**

- 작성 중인 콘텐츠를 실시간으로 미리 볼 수 있어, 포스트의 레이아웃을 즉시 확인하고 수정할 수 있습니다.
- 글 작성과 동시에 포스트의 최종 형태를 시각적으로 확인할 수 있어 효율적인 작성이 가능합니다.

#### 3. **다양한 블록 타입**

- 텍스트, 이미지, 코드 블록, 목록 등 다양한 블록 타입을 제공하여, 사용자는 포스트의 내용에 맞는 다양한 형식으로 글을 작성할 수 있습니다.
- 또한, 차트를 삽입할 수 있는 기능을 제공하여, 데이터를 시각적으로 표현할 수 있습니다.

### [ 글 조회 ]

<img src="https://github.com/kwangyoulsagong/Reflective/blob/main/readmeAssets/%EA%B8%80%EC%A1%B0%ED%9A%8C.gif" alt="글 작성 이미지">

- 글은 블록 타입 형식으로 적용된 글을 볼 수 있습니다.
- 헤딩(Heading) 내비게이션을 통해 해당 헤딩으로 라우팅 지원합니다.

<img src="https://github.com/kwangyoulsagong/Reflective/blob/main/readmeAssets/%EB%8C%93%EA%B8%80%20%EB%8C%80%EB%8C%93%EA%B8%80.gif" alt="글 커스텀 이미지">

- 해당 게시물에 댓글을 달 수 있습니다.
- 답글도 지원해서 커뮤니티 활성화를 할 수 있습니다.

### [ 메인 페이지 ]

<img src="https://github.com/kwangyoulsagong/Reflective/blob/main/readmeAssets/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.gif" alt="메인 페이지">

- Top 8 인기 게시물 최신 트렌드로 애니메이션 반영했습니다.
- 최근 게시물들을 좋아요 순으로 탑 3을 먼저 표시하고,
- 그 이후로는 최신 날짜 기준으로 정렬하는 방식으로 반영했습니다.

### [ 실시간 알림 시스템 ]

<img src="https://github.com/kwangyoulsagong/Reflective/blob/main/readmeAssets/%EC%95%8C%EB%A6%BC.gif" alt="실시간 알림 시스템"/>

- 실시간 알림을 통한 댓글, 좋아요, 즐겨찾기 이벤트 발생시 즉시 전송했습니다.

### [ 글 검색 ]

<img src="https://github.com/kwangyoulsagong/Reflective/blob/main/readmeAssets/%EA%B2%80%EC%83%89.gif" alt="글 검색">

- 검색은 제목 또는 작성자로 검색할 수 있습니다.
- 검색해서 해당 블로그로 이동할 수 있습니다..

<br />

## 프로젝트 실행 방법

```bash
pnpm install

pnpm dev
```

<br />

# ⚒️ 기술 스택

<img src="https://github.com/kwangyoulsagong/Reflective/blob/main/readmeAssets/skills.png" height="500" alt="기술스택 이미지"/>

![Reflective 시스템 아키텍처](https://assetkungya.s3.ap-northeast-2.amazonaws.com/reflective.png)

# 💪🏻 기술적 경험

## FE

프론트엔드의 주요 기술적 도전은 블록 에디터를 구현하는 것이었습니다. 기존의 마크다운 에디터와는 달리, 블록 에디터는 각 콘텐츠 요소(텍스트, 이미지, 코드 등)를 독립적인 '블록'으로 다루어 더 직관적이고 유연한 편집 경험을 제공합니다.

먼저 아래는 블록 에디터 구현 과정입니다.

- [마크다운에서 블록 에디터로: 내 블로그 에디터 개발기](https://velog.io/@tkrhdrhkdduf/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4%EC%97%90%EC%84%9C-%EB%B8%94%EB%A1%9D-%EC%97%90%EB%94%94%ED%84%B0%EB%A1%9C-%EB%82%B4-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EC%97%90%EB%94%94%ED%84%B0-%EA%B0%9C%EB%B0%9C%EA%B8%B0)

- [메인 페이지 최근 게시물 UX 개선 (가상 스크롤)](https://velog.io/@tkrhdrhkdduf/%EA%B0%80%EC%83%81-%EC%8A%A4%ED%81%AC%EB%A1%A4-Virtual-Scroll-%EA%B5%AC%ED%98%84)

<br />

### 성능 최적화

- [React: Runtime 88% 줄인 블록 에디터 렌더링 개선](https://velog.io/@tkrhdrhkdduf/React-Runtime-88-%EC%A4%84%EC%9D%B8-%EB%B8%94%EB%A1%9D-%EC%97%90%EB%94%94%ED%84%B0-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B0%9C%EC%84%A0)
# React 블록 에디터 성능 최적화 회고

저는 최근에 React로 제작한 블록 기반 에디터에서 심각한 성능 저하 문제를 경험했습니다. 블록이 100개 이상 쌓이게 되면 입력 지연이나 마우스 반응이 매우 느려졌고, 일반적인 타이핑조차 버벅이는 상황이 발생했습니다. 이러한 문제를 해결하고자 저는 성능 병목 지점을 정밀하게 분석하고, 다양한 최적화 기법을 적용하는 과정을 거쳤습니다.

## 문제 상황 분석

처음에는 단순히 컴포넌트의 수가 많아서 생기는 렌더링 문제라고 생각했지만, 실제로는 더 복합적인 원인이 있었습니다. 크롬의 Performance 탭에서 프로파일링을 진행한 결과, `pointerover` 이벤트가 발생할 때마다 많은 자바스크립트 연산이 일어나고 있었고, 특히 `BlockEditor`와 그 하위 컴포넌트들이 이벤트 하나에 반응해서 모두 리렌더링되는 상황이 확인되었습니다.

React Developer Tools를 통해 React 컴포넌트 트리를 들여다본 결과, 블록 하나의 마우스 이벤트가 전체 블록들의 상태를 건드리는 구조로 되어 있었으며, 이벤트 핸들러가 매번 새롭게 생성되어 컴포넌트들이 불필요하게 리렌더링되고 있었습니다.

## 문제 원인 정리

문제를 정리해보면 다음과 같습니다:

1. **이벤트 핸들러가 매 렌더링마다 새롭게 생성됨**  
   → `useCallback` 없이 정의된 핸들러 함수들이 자식 컴포넌트에 전달될 때 매번 새로운 참조로 전달되면서 메모이제이션이 무의미해짐.

2. **상태 관리의 비효율성**  
   → `useState`를 통해 블록 전체 배열을 관리하고 있었기 때문에, 블록 하나의 수정에도 전체 블록 배열이 새롭게 업데이트되며 전체 컴포넌트가 리렌더링됨.

3. **불필요한 컴포넌트 리렌더링**  
   → `React.memo`가 적용되지 않은 컴포넌트들이 상태 변화와 관계없이 무조건 리렌더링됨.

## 해결 방법

성능 문제를 해결하기 위해 저는 다음과 같은 방법들을 도입했습니다:

1. **`React.memo` 적용**  
   - 블록 컴포넌트와 기타 자주 변경되지 않는 컴포넌트들에 `React.memo`를 적용하여, props가 변경되지 않는 한 리렌더링을 방지했습니다.

2. **이벤트 핸들러 최적화**  
   - `useCallback`을 활용하여 이벤트 핸들러의 참조를 고정시켰습니다. 이렇게 하여 핸들러 함수가 변경되지 않도록 하여, 메모이제이션된 컴포넌트들이 불필요하게 리렌더링되지 않도록 했습니다.

3. **상태 관리 구조 개선**  
   - 기존에는 배열로 블록 전체 상태를 관리했지만, 이를 **Map 자료구조**로 전환하여 각 블록의 상태를 블록 ID를 key로 하는 구조로 만들었습니다. 이를 통해 특정 블록의 상태만 변경해도 전체 상태에 영향을 주지 않도록 만들 수 있었습니다.

4. **Recoil 도입**  
   - 전역 상태 관리 라이브러리로 Recoil을 도입하여, 각 블록이 독립적으로 자신의 상태를 관리할 수 있도록 했습니다. `atomFamily`를 활용하면 블록 단위로 atom을 생성할 수 있어 매우 효율적이었습니다.

이러한 조치들을 통해 블록 에디터는 대규모 블록에서도 빠르게 동작할 수 있었고, 타이핑이나 마우스 이동 시에도 버벅임 없이 부드러운 인터랙션을 유지할 수 있었습니다.

## 회고 및 느낀 점

이번 성능 최적화 작업을 통해 단순히 “빠르게 보이는” UI를 만드는 것 이상으로, **React의 렌더링 원리**, **참조 불변성의 중요성**, **상태 분리 설계의 가치**를 실감할 수 있었습니다. 개발 초기에는 “작동만 잘 되면 됐지”라는 생각으로 이벤트 핸들러나 상태 관리를 간단히 처리했었는데, 결국 유지보수성과 성능을 고려하지 않은 구조는 반드시 한계에 부딪히게 된다는 걸 뼈저리게 느꼈습니다.

앞으로는 기능을 구현할 때 항상 **리렌더링의 범위**, **불필요한 상태 변경 여부**, **참조의 안정성**을 염두에 두고 설계하고자 합니다. 특히 사용자 경험과 직결되는 부분일수록 성능 최적화는 사소한 개선이 아니라 **필수 요소**임을 다시금 느꼈습니다.


### FSD 아키텍처

그동안 개발을 하면서 점점 서비스가 확장되면서 폴더들이 복잡해지고 찾기가 어려워져서 나누는게 낫다고 판단하여 마이그레이션 했습니다.
여러 폴더 구조와 아키텍쳐들에 대해 조사해보았고, 결과적으로 [FSD(Feature-Sliced Design)](https://feature-sliced.design/) 아키텍처를 적용하게 되었습니다.

프로젝트의 규모가 커지면서 코드의 복잡성을 관리하기 위해 FSD 방식은 폴더를 세세하게 나누는 구조로 프로젝트에 적합하다고 판단했습니다. 또한 프로젝트를 분할하여 정복하는 이 방식의 장점이 매력적으로 느껴졌고, 학습 목적이 강한 이 프로젝트에서 새로운 폴더구조를 적용해보고 싶었습니다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fl3RRQ%2FbtsJsii7gUo%2FqEDelkesLO4SGTkta6pzt1%2Fimg.png">\_출처: https://world-developer.tistory.com/87

FSD 아키텍처는 app, pages, widgets, features, entities, shared라는 6개의 `Layer`로 이루어져있습니다. 그리고 각각의 `Layer`는 `Slice`들로 이루어져있고, 그 `Slice`는 `Segment`로 이루어져있습니다. 하위요소들을 조합하여 상위 요소를 구성하는 방식으로, 이 매커니즘이 저에게 굉장히 매력적으로 다가왔습니다.
이렇게 각자의 역할이 분명한 폴더구조를 적용해봄으로써 모듈을 만들 때 각 모듈의 역할을 명확히 정의하게 되었습니다. 또한 하위 요소들이 모두 개별적으로 기능할 수 있기 때문에 훨씬 유지보수성이 높은 코드를 작성할 수 있게 되었습니다.

아래는 Reflective 프로젝트의 폴더구조입니다.

```
📦src
 ┣ 📂app
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.tsx
 ┃ ┗ 📜error
 ┃ ┗ 📜errorboundary
 ┃ ┗ 📜provider
 ┃ ┗ 📜routes
 ┣ 📂entities
 ┃ ┣ 📂BlockEditor
 ┃ ┣ 📂Comments
 ┃ ┃ ┗ 📂model
 ┃ ┗ 📂Notification
 ┣ 📂features
 ┃ ┣ 📂auth
 ┃ ┣ 📂Comments
 ┃ ┣ 📂favorite
 ┃ ┣ 📂MyPage
 ┃ ┣ 📂Notification
 ┃ ┣ 📂Post
 ┃ ┣ 📂Search
 ┃ ┣ 📂Setting
 ┃ ┗ 📂Write
 ┣ 📂pages
 ┃ ┣ 📂Home
 ┃ ┣ 📂Mypage
 ┃ ┣ 📂Post
 ┃ ┣ 📂Setting
 ┃ ┣ 📜SearchPage.tsx
 ┃ ┣ 📜SignUpPage.tsx
 ┃ ┣ 📜StartPage.tsx
 ┃ ┗ 📜WritePage.tsx
 ┣ 📂shared
 ┃ ┣ 📂api
 ┃ ┣ 📂BlockView
 ┃ ┣ 📂CircleImage
 ┃ ┣ 📂constants
 ┃ ┣ 📂Header
 ┃ ┣ 📂styles
 ┃ ┣ 📂Toast
 ┃ ┣ 📜Search.tsx
 ┃ ┣ 📜useApiError.ts
 ┃ ┣ 📜useInfinitePostsQuery.ts
 ┃ ┗ 📜useVirtualScroll.ts
```

<br />
