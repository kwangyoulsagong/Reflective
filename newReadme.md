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
- [BE](#BE)
  - [TDD, e2e 및 유닛 테스트](#tdd-e2e-및-유닛-테스트)
  - [인증/인가](#인증인가)
  - [트랜잭션 제어, 쿼리 최적화](#트랜잭션-제어-쿼리-최적화)
  - [NestJS Enhancers](#NestJS-Enhancers)
  - [배포 및 자동화](#배포-및-자동화)
  - [admin 페이지 구현](#admin-페이지-구현)

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

  <img src="https://github.com/kwangyoulsagong/Reflective/blob/feat13/usingLinksPostDetail/readmeAssets/%EB%B8%94%EB%A1%9D%EC%97%90%EB%94%94%ED%84%B0.gif" alt="블록에디터">
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

<img src="https://github.com/kwangyoulsagong/Reflective/blob/feat13/usingLinksPostDetail/readmeAssets/%EA%B8%80%EC%A1%B0%ED%9A%8C.gif" alt="글 작성 이미지">

- 글은 블록 타입 형식으로 적용된 글을 볼 수 있습니다.
- 헤딩(Heading) 내비게이션을 통해 해당 헤딩으로 라우팅 지원합니다.

<img src="https://github.com/kwangyoulsagong/Reflective/blob/feat13/usingLinksPostDetail/readmeAssets/%EB%8C%93%EA%B8%80%20%EB%8C%80%EB%8C%93%EA%B8%80.gif" alt="글 커스텀 이미지">

- 해당 게시물에 댓글을 달 수 있습니다.
- 답글도 지원해서 커뮤니티 활성화를 할 수 있습니다.

### [ 메인 페이지 ]

<img src="https://github.com/kwangyoulsagong/Reflective/blob/feat13/usingLinksPostDetail/readmeAssets/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.gif" alt="은하 수정 이미지">

- Top 8 인기 게시물 최신 트렌드로 애니메이션 반영했습니다.
- 최근 게시물들을 좋아요 순으로 탑 3을 먼저 표시하고,
- 그 이후로는 최신 날짜 기준으로 정렬하는 방식으로 반영했습니다.

### [ 실시간 알림 시스템 ]

<img src="https://github.com/kwangyoulsagong/Reflective/blob/feat13/usingLinksPostDetail/readmeAssets/%EC%95%8C%EB%A6%BC.gif" alt="은하 공유 이미지"/>

- 실시간 알림을 통한 댓글, 좋아요, 즐겨찾기 이벤트 발생시 즉시 전송했습니다.

### [ 글 검색 ]

<img src="https://github.com/kwangyoulsagong/Reflective/blob/feat13/usingLinksPostDetail/readmeAssets/%EA%B2%80%EC%83%89.gif" alt="은하 검색 이미지">

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

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/3a0507ca-1f7f-4fa1-add7-43d3e73515d4" height="500" alt="기술스택 이미지"/>

![Reflective 시스템 아키텍처](https://assetkungya.s3.ap-northeast-2.amazonaws.com/reflective.png)

# 💪🏻 기술적 경험

## FE

프론트엔드의 주요 기술적 도전은 블록 에디터를 어떻게 구현하느지가 젤 어려움 이었습니다.

먼저 아래는 블록 에디터 구현 과정입니다.

- [마크다운에서 블록 에디터로: 내 블로그 에디터 개발기](https://velog.io/@tkrhdrhkdduf/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4%EC%97%90%EC%84%9C-%EB%B8%94%EB%A1%9D-%EC%97%90%EB%94%94%ED%84%B0%EB%A1%9C-%EB%82%B4-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EC%97%90%EB%94%94%ED%84%B0-%EA%B0%9C%EB%B0%9C%EA%B8%B0)

<br />

### 성능 최적화

저희는 은하를 만들기 위해 수많은 별 오브젝트들을 화면에 띄워야 했습니다.
하지만 별 개수를 늘릴수록 화면이 더 버벅이기 시작했습니다.
별 개수를 줄이면 시각적으로 좋지 않았기에, 저희는 별 개수를 유지하면서도 화면이 버벅이지 않도록 최적화를 시도하게 되었습니다.

1. Instancing

   저희가 선택한 첫 번째 최적화 방식은 `Instancing`이었습니다.

   CPU가 GPU에게 무엇을 어떻게 그릴지 지시하는 `Draw Call`은 단순해 보이지만 상당히 무거운 작업입니다. 일반적인 컴퓨터 환경에서 Draw Call이 대략 1000회 넘어가면 프레임 드랍이 생긴다고 합니다. 은하를 구성하는 별 오브젝트만 4000개인 저희 프로젝트에서 이러한 `Draw Call`을 줄이는 것이 중요햐다고 생각했습니다.

   이를 위해 사용한 방식이 `Instancing`으로, 동일한 오브젝트를 여러 번 그리는 경우 이를 한번에 처리하도록 하는 방식입니다. 저희는 이를 `InstancedMesh`를 사용해 구현했습니다. 이 방식을 통해 은하를 구성하는 별을 종류별로 묶어줌으로써 4000개의 오브젝트를 13개의 인스턴스로 줄일 수 있었습니다. 이렇게 `Draw Call`에 의한 CPU 병목 현상을 해결했습니다.

<br />

하지만 금요일 프로젝트 현황 공유 시간 때 '처음으로 맥북 팬 소리를 들었어요', '컴터가 안좋아서 그런지 느려요ㅠㅜㅠ' 같은 피드백을 들으면서 추가적인 최적화 작업의 필요성을 느꼈습니다.

<br />

2.  Performance Monitoring

    피드백을 받은 이후 선택한 것은 `Performance Monitoring`입니다. 다양한 최적화 방식이 있었으나 프로젝트에서 사용하는 대부분의 오브젝트가 매우 단순한 형태라 그리 효과적이지 않았습니다. 이에 선택한 방법이 `Performance Monitoring`으로, 실시간으로 웹의 퍼포먼스를 모니터링해 이를 반영하는 방식입니다.

    react-three/drei 라이브러리의 `Performance Monitor`를 통해 웹의 퍼포먼스를 모니터링합니다. 그리고 퍼포먼스가 좋지 않은 경우 Canvas의 `Device Pixel Ratio`을 최대 0.5까지 낮춥니다. 은하의 해상도를 낮추어 프레임 드랍을 해결하는 방식입니다. 이렇게 CPU만 고려하던 1번 방식에서 나아가 GPU의 부담까지 덜어주는 방식을 추가함으로써 더 최적화된 서비스를 만들 수 있었습니다.

    아래 사진 중 왼쪽은 최고 해상도인 경우이고, 오른쪽은 최저 해상도인 경우입니다.

       <img  height="220" src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/3f8b0974-4492-4567-a395-76a3ccb7007a" alt="은하 최고 해상도">
       <img  height="220" src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/5f0c25f8-d977-437c-ba1d-3bc3b6f05c2a" alt="은하 최저 회상도">

    아래 사진은 메모리 사용량을 비교한 것으로, Performance Monitoring 최적화 전 13.46GB였던 메모리 사용량이 최적화 후 12.50GB까지 감소했습니다.

       <img height="90" src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/8aaa4b26-9556-414d-bf28-98b95f2a0816">
       <img height="100" src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/f461b4c4-f411-4f56-8ec5-d37805ee4d41">

    아래 사진은 퍼포먼스를 비교한 것으로, GPU 전력 사용량이 0.91 에서 0.62로 감소했고 GPU 사용률이 66에서 51로 감소했습니다.

       <img height="300" src="https://github.com/boostcampwm2023/web16-B1G1/assets/78800560/b394cab5-d9ea-40f4-92b5-efee7a6b1c4e">
       <img height="300" src="https://github.com/boostcampwm2023/web16-B1G1/assets/78800560/2a40aeda-add1-41c2-98d6-bce5b2fef954">

<br />

### FSD 아키텍처

그동안 개발을 하면서 점점 서비스가 확장되면서 폴더들이 복잡해지고 찾기가 어려워져서 나누는게 낫다고 판단하여 마이그레이션 했습니다.
여러 폴더 구조와 아키텍쳐들에 대해 조사해보았고, 결과적으로 [FSD(Feature-Sliced Design)](https://feature-sliced.design/) 아키텍처를 적용하게 되었습니다.

프로젝트의 규모가 커지면서 코드의 복잡성을 관리하기 위해 FSD 방식은 폴더를 세세하게 나누는 구조로 대규모 프로젝트에 적합하다고 판단했습니다. 또한 프로젝트를 분할하여 정복하는 이 방식의 장점이 매력적으로 느껴졌고, 학습 목적이 강한 이 프로젝트에서 새로운 폴더구조를 적용해보고 싶었습니다.

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/f12852bd-5f09-4526-a404-ebf442c57f8d">_출처: https://feature-sliced.design/_

FSD 아키텍처는 app, pages, widgets, features, entities, shared라는 6개의 `Layer`로 이루어져있습니다. 그리고 각각의 `Layer`는 `Slice`들로 이루어져있고, 그 `Slice`는 `Segment`로 이루어져있습니다. 하위요소들을 조합하여 상위 요소를 구성하는 방식으로, 이 매커니즘이 저희에게 굉장히 매력적으로 다가왔습니다.
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

## BE

**테스트와 쿼리 로그 분석을 통한 이유 있는 코드 작성**

### TDD, e2e 및 유닛 테스트

<br />

### 배포 및 자동화

클라우드 배포 경험이 많지 않아 이번 프로젝트를 통해 많은 성장을 할 수 있었습니다. AWS 및 NCP에서 제공하는 서버, VPC, NAT Gateway 등 주요 서비스에 대해 학습하여 배포 환경을 구성하고, Nginx, Docker 및 Docker Compose, GitHub Actions 등을 학습하여 main 브랜치에 push되면 자동으로 배포되도록 설정했습니다.
