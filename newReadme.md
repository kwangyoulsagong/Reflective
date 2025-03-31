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
  - [R3F Camera](#r3f-camera)
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
</table>
<img src="https://assetkungya.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A9%E1%86%A8%E1%84%8B%E1%85%A6%E1%84%83%E1%85%B5%E1%84%90%E1%85%A5.gif">

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

[🔗 wiki 기술 스택 소개 바로가기](https://github.com/boostcampwm2023/web16-B1G1/wiki/%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D-%EC%86%8C%EA%B0%9C)

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/3a0507ca-1f7f-4fa1-add7-43d3e73515d4" height="500" alt="기술스택 이미지"/>

![Reflective 시스템 아키텍처](https://assetkungya.s3.ap-northeast-2.amazonaws.com/reflective.png)

## 기술 스택 선정 이유에 관한 팀원들의 글

- [우리 팀이 Zustand를 쓰는 이유](https://velog.io/@greencloud/%EC%9A%B0%EB%A6%AC-%ED%8C%80%EC%9D%B4-Zustand%EB%A5%BC-%EC%93%B0%EB%8A%94-%EC%9D%B4%EC%9C%A0)
- [Emotion 선택 시 고려사항](https://velog.io/@200tiger/Emotion-%EC%84%A0%ED%83%9D%EC%8B%9C-%EA%B3%A0%EB%A0%A4%EC%82%AC%ED%95%AD)
- [Yarn berry로 모노레포 구성하기](https://velog.io/@minboykim/Yarn-berry%EB%A1%9C-%EB%AA%A8%EB%85%B8%EB%A0%88%ED%8F%AC-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0)
- [Vite, 왜 쓰는거지?](https://velog.io/@minboykim/Vite-%EC%99%9C-%EC%93%B0%EB%8A%94%EA%B1%B0%EC%A7%80)
- [기술스택 선정이유 (NestJS, TypeORM, Docker, GitHub Actions)](https://velog.io/@qkrwogk/%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D-%EC%84%A0%EC%A0%95%EC%9D%B4%EC%9C%A0-NestJS-TypeORM-Docker-GitHub-Actions)
- [MySQL 선택 이유](https://velog.io/@songjseop/why-mysql)

<br />

# 💪🏻 기술적 경험

## FE

프론트엔드의 주요 기술적 도전은 **Three.js + React-Three-Fiber(R3F)를 사용한 우주 공간 구현**이었습니다.
팀원 모두에게 생소한 기술이었기에 사용한 것 자체도 도전적인 경험이었지만, 그 중에서 특히 **사용자 경험 개선** 위주의 경험을 작성해보았습니다.

먼저 아래는 Three.js와 R3F에 관련하여 팀원들이 작성한 기술블로그입니다.

- [Three.js와의 설레는 첫만남](https://velog.io/@greencloud/Three.js%EC%99%80%EC%9D%98-%EC%84%A4%EB%A0%88%EB%8A%94-%EC%B2%AB%EB%A7%8C%EB%82%A8-)
- [JS로 자전과 공전을 구현할 수 있다고?](https://velog.io/@greencloud/JS%EB%A1%9C-%EC%9E%90%EC%A0%84%EA%B3%BC-%EA%B3%B5%EC%A0%84%EC%9D%84-%EA%B5%AC%ED%98%84%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8B%A4%EA%B3%A0)
- [R3F Material 간단 정리](https://electric-period-6ff.notion.site/Material-2f0279fc0d104b4e852250d190908b8b)
- [너와의 추억을 우주의 별로 띄울게](https://velog.io/@greencloud/%EB%84%88%EC%99%80%EC%9D%98-%EC%B6%94%EC%96%B5%EC%9D%84-%EC%9A%B0%EC%A3%BC%EC%9D%98-%EB%B3%84%EB%A1%9C-%EB%9D%84%EC%9A%B8%EA%B2%8C)
- [React로 멋진 3D 은하 만들기(Feat.R3F)](https://velog.io/@minboykim/React%EB%A1%9C-%EB%A9%8B%EC%A7%84-3D-%EC%9D%80%ED%95%98-%EB%A7%8C%EB%93%A4%EA%B8%B0feat.-R3F)

<br />

### R3F Camera

3D 공간 상에서 카메라는 사용자의 시점입니다.
그렇기 때문에 카메라 움직임은 사용자 경험에 직결됩니다.
저희는 `자연스러운 카메라 움직임`을 만들어내 사용자 경험을 향상시키기 위해 여러 과정을 거쳤습니다.

저희 서비스에서 별을 클릭하면 해당 별을 바라보도록 해야 합니다.
처음에는 카메라의 위치는 그대로 둔 채 시야만 회전하도록 하는 `회전 운동`의 방식을 사용했습니다.
처음 `회전 운동` 방식을 적용해본 결과, 별을 바꿀때마다 별과 카메라 사이의 거리를 직접 조정해 줘야 한다는 문제가 있었습니다.

그래서 별과 카메라 사이 거리를 유지한 채 별을 향해 `직선 운동` 하도록 변경했습니다.
이 방식은 `회전 운동`에 비해 사용하기 편했으나, 움직임이 너무 뻣뻣했기에 더 부드러운 모션을 추가하면 좋겠다는 생각을 하게 되었습니다.

많은 고민 끝에 회전 운동처럼 별을 향해 회전하고 직선 운동처럼 별에 다가가도록 하여 '포물선 운동'을 만들어 냈습니다.
`포물선 운동`은 회전 운동의 장점인 자연스러운 움직임과 직선 운동의 장점인 직관적인 움직임을 모두 가졌습니다.
이러한 이유로 저희는 `포물선 운동`을 적용하게 되었습니다.

- 직선 운동하는 카메라

  <img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/f03af4c1-41c5-4af8-ae56-5271e065a9bc" height="200" alt="직선 운동하는 카메라 이미지">

- 포물선 운동하는 카메라

  <img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/bab2271b-9bdc-42b6-bc8c-76ec2109d478" height="200" alt="포물선 운동하는 카메라 이미지">

하지만 아직 멀리 있는 별이 너무 작게 보이는 문제가 남아있었습니다.
어찌보면 당연한 이야기일 수 있지만, 서비스 특성상 사용자 입장에서 불편한 요소였고 시각적으로 좋지 않았습니다.
그래서 거리에 비해서 물체가 커 보이게 처리해 멀리 있는 별이 너무 작아보이지 않도록 했습니다.

그랬더니 거리가 먼 별이 겉보기보다 멀리 위치하게 되는 문제가 발생했습니다.
사용자가 그 별로 이동하는데 예상하는 것보다 많은 시간이 소요되었습니다.
이 문제를 해결하기 위해 멀리 이동할 때는 좀 더 빠르게, 가까이 이동할 때는 좀 더 느리게 이동하도록 처리했습니다.

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

프로젝트를 진행함에 따라 파일들이 점점 많아졌고, 파일 분리와 폴더 구조에 대한 명확한 원칙이 필요해졌습니다.
그래서 팀원들이 함께 여러 폴더 구조와 아키텍쳐들에 대해 조사해보았고, 결과적으로 [FSD(Feature-Sliced Design)](https://feature-sliced.design/) 아키텍처를 적용하게 되었습니다.

저희 프로젝트는 상대적으로 규모가 작은 편인데, FSD 방식은 폴더를 세세하게 나누는 만큼 규모가 큰 프로젝트에 적합하다는 생각도 했습니다.
하지만 프로젝트를 분할하여 정복하는 해당 방식의 장점이 매력적으로 다가오기도 했고, 이 프로젝트는 학습의 목적이 크기 때문에 팀원들 모두 새로운 폴더구조를 적용해보고 싶어했습니다.

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/f12852bd-5f09-4526-a404-ebf442c57f8d">_출처: https://feature-sliced.design/_

FSD 아키텍처는 app, pages, widgets, features, entities, shared라는 6개의 `Layer`로 이루어져있습니다. 그리고 각각의 `Layer`는 `Slice`들로 이루어져있고, 그 `Slice`는 `Segment`로 이루어져있습니다. 하위요소들을 조합하여 상위 요소를 구성하는 방식으로, 이 매커니즘이 저희에게 굉장히 매력적으로 다가왔습니다.
이렇게 각자의 역할이 분명한 폴더구조를 적용해봄으로써 모듈을 만들 때 각 모듈의 역할을 명확히 정의하게 되었습니다. 또한 하위 요소들이 모두 개별적으로 기능할 수 있기 때문에 훨씬 유지보수성이 높은 코드를 작성할 수 있게 되었습니다.

아래는 저희 프로젝트의 폴더구조입니다.

```
📦src
 ┣ 📂app
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜Router.tsx
 ┃ ┗ 📜global.css
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┣ 📂icons
 ┃ ┣ 📂logos
 ┃ ┗ 📂musics
 ┣ 📂entities
 ┃ ┣ 📂like
 ┃ ┣ 📂posts
 ┃ ┗ 📜index.ts
 ┣ 📂features
 ┃ ┣ 📂audio
 ┃ ┣ 📂backgroundStars
 ┃ ┣ 📂coachMarker
 ┃ ┣ 📂controls
 ┃ ┣ 📂star
 ┃ ┗ 📜index.ts
 ┣ 📂pages
 ┃ ┣ 📂Home
 ┃ ┣ 📂Landing
 ┃ ┗ 📜index.ts
 ┣ 📂shared
 ┃ ┣ 📂apis
 ┃ ┣ 📂hooks
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂routes
 ┃ ┣ 📂store
 ┃ ┣ 📂styles
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📂alert
 ┃ ┃ ┣ 📂alertDialog
 ┃ ┃ ┣ 📂audioButton
 ┃ ┃ ┣ 📂buttons
 ┃ ┃ ┣ 📂inputBar
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┣ 📂slider
 ┃ ┃ ┣ 📂textArea
 ┃ ┃ ┣ 📂toast
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂utils
 ┣ 📂widgets
 ┃ ┣ 📂error
 ┃ ┣ 📂galaxy
 ┃ ┣ 📂galaxyCustomModal
 ┃ ┣ 📂landingScreen
 ┃ ┣ 📂loginModal
 ┃ ┣ 📂logoAndStart
 ┃ ┣ 📂nickNameSetModal
 ┃ ┣ 📂postModal
 ┃ ┣ 📂screen
 ┃ ┣ 📂shareModal
 ┃ ┣ 📂signupModal
 ┃ ┣ 📂starCustomModal
 ┃ ┣ 📂underBar
 ┃ ┣ 📂upperBar
 ┃ ┣ 📂warpScreen
 ┃ ┣ 📂writingModal
 ┗ 📜vite-env.d.ts
```

<br />

## BE

**테스트와 쿼리 로그 분석을 통한 이유 있는 코드 작성**

### TDD, e2e 및 유닛 테스트

하나의 API를 구현하기 전에 여러 케이스에 대하여 먼저 테스트코드를 작성하는 TDD(Test Driven Development)를 해보았습니다.  
그 과정에서 어색함도 많이 느꼈고, 완벽하게 했다고도 하지 못하지만 TDD의 방법과 장점 등에 대해 알 수 있었습니다.

기능 구현 이후에도, 코드 커버리지를 높이기 위해 e2e 테스트 코드 개선과, mocking을 활용한 유닛 테스트 등을 학습하고 적용해 보았습니다.

#### 학습 및 개발 기록

- [테스트 코드를 작성해야 하는 이유](https://www.notion.so/b091dfc8229e4943af4acef50a7a5b75)
- [NetsJS + Jest 환경 설정](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1114(%ED%99%94)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [NestJS, TDD로 개발하기](https://velog.io/@qkrwogk/NestJS-TDD%EB%A1%9C-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0-cx211d14)
- [2주차 멘토링 일지(BE) - TDD 관련](https://github.com/boostcampwm2023/web16-B1G1/wiki/2%EC%A3%BC%EC%B0%A8-%EB%A9%98%ED%86%A0%EB%A7%81-%EC%9D%BC%EC%A7%80#be)
- [TDD 기록 1](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1115(%EC%88%98)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [TDD 기록 2](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1116(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [TDD 기록 3](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1116(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [NestJS e2e 테스트 (jest, supertest)](https://velog.io/@qkrwogk/NestJS-e2e-%ED%85%8C%EC%8A%A4%ED%8A%B8-jest-supertest)
- [NestJS, 유닛 테스트 각종 mocking, e2e 테스트 폼데이터 및 파일첨부](https://velog.io/@qkrwogk/NestJS-%EC%9C%A0%EB%8B%9B-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EA%B0%81%EC%A2%85-mocking-e2e-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%8F%BC%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B0%8F-%ED%8C%8C%EC%9D%BC%EC%B2%A8%EB%B6%80)

<br />

### 인증/인가

인증/인가에 대해 고민도 많이 하였습니다.  
Session vs JWT, Authorization Bearer vs Cookie, RefreshToken  
특히 보안과 성능 및 편의성 사이의 트레이드오프에 대해 고민하고 학습을 하였습니다.

#### 학습 및 개발 기록

- [Redis 연결](https://velog.io/@songjseop/nestjs-redis)
- [RefreshToken 발급 및 Redis 저장](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1121(%ED%99%94)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D-%E2%80%90-%08SignIn%EC%8B%9C-RefreshToken-%EB%B0%9C%EA%B8%89-%EB%B0%8F-Redis%EC%97%90-%EC%A0%80%EC%9E%A5>)
- [커스텀 AuthGuard 작성](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1121(%ED%99%94)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D-%E2%80%90-%EC%BB%A4%EC%8A%A4%ED%85%80-AuthGuard-%EC%9E%91%EC%84%B1>)
- [OAuth(깃헙 로그인)](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1122(%EC%88%98)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D-%E2%80%90-%EA%B9%83%ED%97%99-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84>)

<br />

### 트랜잭션 제어, 쿼리 최적화

TypeORM 쿼리 로그를 통해 하나의 비즈니스 로직에서 복수개의 테이블을 수정하는 경우, 트랜잭션을 직접 제어할 필요가 있었습니다. 저희는 TypeORM의 queryRunner와 transaction 메소드, NestJS의 Interceptor 등을 활용하여 여러 차례 트랜잭션 제어 로직을 개선하였고, 각 구현방식의 장단점에 대해서도 학습할 수 있었습니다.

또한 쿼리 로그와 MySQL 쿼리 플랜 기능을 활용해 기존 TypeORM 메소드의 쿼리를 분석하고, 자주 사용되는 일부 메소드에 대해 이를 개선하여 queryBuilder로 개선된 쿼리를 요청하는 쿼리 최적화 과정도 수행해 보았습니다.

#### 학습 및 개발 기록

- [Transaction(트랜잭션)](https://velog.io/@qkrwogk/Transaction-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98)
- [TypeORM 트랜잭션(Transaction) 제어 with Query Runner 1](https://velog.io/@qkrwogk/TypeORM-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98Transaction-%EC%A0%9C%EC%96%B4-with-Query-Runner-1%EC%9D%BC%EC%B0%A8)
- [TypeORM 트랜잭션(Transaction) 제어 with Query Runner 2](https://velog.io/@qkrwogk/TypeORM-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98Transaction-%EC%A0%9C%EC%96%B4-with-Query-Runner-2%EC%9D%BC%EC%B0%A8)
- [NestJS Interceptor와 로거 - Transaction Interceptor](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1130(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EB%A1%9D-%E2%80%90-NestJS-Interceptor%EC%99%80-%EB%A1%9C%EA%B1%B0#transaction-interceptor>)
- [transaction 제어 인터셉터 방식 -> 메소드 내부에서 수행하는 방식으로 변경](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1207(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D#transaction-%EC%A0%9C%EC%96%B4-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0-%EB%B0%A9%EC%8B%9D---%EB%A9%94%EC%86%8C%EB%93%9C-%EB%82%B4%EB%B6%80%EC%97%90%EC%84%9C-%EC%88%98%ED%96%89%ED%95%98%EB%8A%94-%EB%B0%A9%EC%8B%9D%EC%9C%BC%EB%A1%9C-%EB%B3%80%EA%B2%BD>)
- [TypeORM 쿼리 로그, MySQL 쿼리 플랜, Query Builder을 이용한 쿼리 최적화 with NestJS](https://velog.io/@qkrwogk/TypeORM-%EC%BF%BC%EB%A6%AC-%EB%A1%9C%EA%B7%B8-MySQL-%EC%BF%BC%EB%A6%AC-%ED%94%8C%EB%9E%9C-Query-Builder%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BF%BC%EB%A6%AC-%EC%B5%9C%EC%A0%81%ED%99%94-with-NestJS)

<br />

### NestJS Enhancers

NetsJS 자체에 대한 학습을 위해 NestJS의 Lifecycle과 각 Enhancer들에 대해서도 학습을 해보았습니다.  
Interceptor, Exception Filter 등 학습을 하고 백엔드 코드에 적용을 해보았습니다.

#### 학습 및 개발 기록

- [NestJS Interceptor와 로거 -> Log Interceptor](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1130(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EB%A1%9D-%E2%80%90-NestJS-Interceptor%EC%99%80-%EB%A1%9C%EA%B1%B0>)
- [Exception Filter](https://www.notion.so/NestJS-Exception-Filter-13906c848dfb45ffb2829e81e470c619?pvs=4)

<br />

### 배포 및 자동화

클라우드 배포 경험이 많지 않아 이번 프로젝트를 통해 많은 성장을 할 수 있었습니다. AWS 및 NCP에서 제공하는 서버, VPC, NAT Gateway 등 주요 서비스에 대해 학습하여 배포 환경을 구성하고, Nginx, Docker 및 Docker Compose, GitHub Actions 등을 학습하여 main 브랜치에 push되면 자동으로 배포되도록 설정했습니다.

#### 학습 및 개발 기록

- [GitHub Actions을 이용한 자동 배포](https://velog.io/@qkrwogk/GitHub-Actions%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9E%90%EB%8F%99-%EB%B0%B0%ED%8F%AC)
- [AWS와 NCP의 주요 서비스](https://velog.io/@qkrwogk/AWS%EC%99%80-NCP-%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%B9%84%EA%B5%90)
- [NGINX 설정](https://www.notion.so/NGINX-b03d0811b0884ca3b7f61ca35f2d7779?pvs=4)
- [SSH 보안: Key Forwarding, Tunneling, 포트 변경](https://velog.io/@qkrwogk/SSH-%EB%B3%B4%EC%95%88-SSH-Key-Forwarding-SSH-Tunneling%EC%9D%84-%ED%86%B5%ED%95%B4-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%9D%98-private-instance%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%98%EB%8A%94-%EB%B2%95-SSH-%ED%8F%AC%ED%8A%B8-%EB%B3%80%EA%B2%BD)
- [Kubernetes 기초(minikube), docker image 최적화(멀티스테이징)](https://velog.io/@qkrwogk/Kubernetes-%EA%B8%B0%EC%B4%88minikube-docker-image-%EC%B5%9C%EC%A0%81%ED%99%94%EB%A9%80%ED%8B%B0%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%A7%95-AWS-IAM-EC2)
- [NCP VPC&인스턴스 구성, MySQL, nginx, docker, docker-compose](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1119(%EC%9D%BC)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [Redis 연결 후 RedisRepository 작성](https://velog.io/@songjseop/nestjs-redis)
- [NCP Object Storage, HTTPS, GitHub Actions](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1123(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [NAT Gateway, MongoDB](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1126(%EC%9D%BC)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D#%EB%B0%B0%ED%8F%AC%EC%9A%A9-db-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%97%90-mongodb-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%99%B8%EB%B6%80%EC%97%B0%EB%8F%99>)
- [플랫폼 종속성 문제 해결(Sharp), 쿼리 최적화](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1128(%ED%99%94)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [docker 이미지 최적화](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1203(%EC%9D%BC)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)

<br /
