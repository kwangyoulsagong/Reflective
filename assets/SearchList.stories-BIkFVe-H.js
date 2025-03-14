import{j as e}from"./jsx-runtime-CmIOflP4.js";import{f as O}from"./times-D79UCNsd.js";import{c as F}from"./createLucideIcon-Dc-6n4Fv.js";import{a as t}from"./index-CfQd_q1B.js";import"./index-KqYmeiyw.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=F("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),$=({searchResult:a,goToPostDetail:r})=>e.jsx("ul",{className:"divide-y divide-gray-200",children:a.map(s=>e.jsx("li",{className:"p-4 hover:bg-gray-50 transition-colors duration-150",onClick:()=>r(s.title,s.post_id,s.nickname),children:e.jsx("section",{className:"flex items-start justify-between",children:e.jsxs("article",{className:"space-y-1",children:[e.jsx("h3",{className:"text-lg font-medium text-blue-600 hover:text-blue-800 cursor-pointer",children:s.title}),e.jsxs("div",{className:"flex items-center space-x-2 text-sm",children:[e.jsx("span",{className:"px-2 py-1 bg-gray-100 rounded-full text-gray-600",children:s.category||"일반"}),s.nickname&&e.jsxs("span",{className:"text-gray-500",children:["작성자: ",s.nickname]}),e.jsx("span",{className:"text-gray-500",children:O(s.created_date)}),s.like_count!==void 0&&e.jsxs("span",{className:"flex items-center text-gray-500",children:[e.jsxs("svg",{className:"h-4 w-4 mr-1",fill:"currentColor",viewBox:"0 0 20 20",children:[e.jsx("path",{d:"M10 12a2 2 0 100-4 2 2 0 000 4z"}),e.jsx("path",{fillRule:"evenodd",d:"M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",clipRule:"evenodd"})]}),s.like_count]})]})]})})},s.post_id))});$.__docgenInfo={description:"",methods:[],displayName:"List",props:{searchResult:{required:!0,tsType:{name:"Array",elements:[{name:"Post"}],raw:"Post[]"},description:""},goToPostDetail:{required:!0,tsType:{name:"signature",type:"function",raw:"(title: string, post_id: string, nickname: string) => void",signature:{arguments:[{type:{name:"string"},name:"title"},{type:{name:"string"},name:"post_id"},{type:{name:"string"},name:"nickname"}],return:{name:"void"}}},description:""}}};const H=({searchResult:a,query:r})=>e.jsxs("div",{className:"flex items-center justify-between px-6 py-4 bg-gray-50 border-b",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-800",children:r?`'${r}' 검색 결과`:"검색 결과"}),e.jsxs("div",{className:"flex items-center text-sm text-gray-600",children:[e.jsx("span",{className:"mr-2",children:a.length>0?`${a.length}개의 결과`:"결과 없음"}),e.jsx(G,{size:16,className:"text-gray-400"})]})]});H.__docgenInfo={description:"",methods:[],displayName:"Header",props:{searchResult:{required:!0,tsType:{name:"Array",elements:[{name:"Post"}],raw:"Post[]"},description:""},query:{required:!0,tsType:{name:"string"},description:""}}};class J{constructor(r=4){this.end=r}getPageNumber({currentPage:r,totalPages:s}){const d=[];let n=Math.max(1,r-2);const i=Math.min(s,n+this.end);i-n<this.end&&(n=Math.max(1,i-this.end));for(let c=n;c<=i;c++)d.push(c);return d}}const Q=({currentPage:a,onPageChange:r,totalPages:s})=>{const d=new J;return e.jsxs("section",{className:"flex items-center justify-between px-6 py-4 bg-gray-50 border-t ",children:[e.jsx("button",{className:"px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",onClick:()=>r(a-1),disabled:a===1,children:"이전"}),e.jsx("article",{className:"flex space-x-1 gap-3",children:d.getPageNumber({currentPage:a,totalPages:s}).map(n=>e.jsx("button",{className:`px-3 py-1 text-sm rounded-md ${n===a?"bg-white text-primary border border-gray-300 hover:bg-gray-100":"text-gray-700 bg-white border border-gray-300 hover:bg-gray-100"}`,onClick:()=>r(n),children:n},n))}),e.jsx("button",{className:"px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",onClick:()=>r(a+1),disabled:a===s,children:"다음"})]})};Q.__docgenInfo={description:"",methods:[],displayName:"Paging",props:{currentPage:{required:!0,tsType:{name:"number"},description:""},onPageChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(number: number) => void",signature:{arguments:[{type:{name:"number"},name:"number"}],return:{name:"void"}}},description:""},totalPages:{required:!0,tsType:{name:"number"},description:""}}};const o=({results:a=[],totalPages:r=0,currentPage:s=1,onPageChange:d,isLoading:n=!1,isError:i=!1,query:c="",goToPostDetail:B})=>e.jsxs("section",{className:"w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden",children:[e.jsx(H,{searchResult:a,query:c}),n&&e.jsx("div",{className:"flex justify-center items-center py-8",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"})}),i&&e.jsx("div",{className:"p-6 text-center text-red-500",children:"검색 결과를 불러오는 중 오류가 발생했습니다."}),!n&&!i&&a.length===0&&e.jsx("div",{className:"p-6 text-center text-gray-500",children:c?`'${c}'에 대한 검색 결과가 없습니다.`:"검색어를 입력해주세요."}),!n&&!i&&a.length>0&&e.jsx($,{searchResult:a,goToPostDetail:B}),!n&&!i&&r>1&&e.jsx(Q,{currentPage:s,onPageChange:d,totalPages:r})]});o.__docgenInfo={description:"",methods:[],displayName:"SearchList",props:{results:{required:!1,tsType:{name:"Array",elements:[{name:"Post"}],raw:"Post[]"},description:"",defaultValue:{value:"[]",computed:!1}},totalPages:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},currentPage:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},onPageChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isError:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},query:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},goToPostDetail:{required:!0,tsType:{name:"signature",type:"function",raw:"(title: string, post_id: string, nickname: string) => void",signature:{arguments:[{type:{name:"string"},name:"title"},{type:{name:"string"},name:"post_id"},{type:{name:"string"},name:"nickname"}],return:{name:"void"}}},description:""}}};const P=[{post_id:"1",title:"리액트 훅(React Hooks)의 기본 개념",contents:"리액트 훅은 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해주는 기능입니다.",created_date:"2023-06-15",nickname:"김개발",category:"React",like_count:42},{post_id:"2",title:"TypeScript와 함께하는 React 개발",contents:"TypeScript를 React 프로젝트에 통합하여 타입 안정성을 높이는 방법에 대해 알아봅니다.",created_date:"2023-07-22",nickname:"이코딩",category:"TypeScript",like_count:38},{post_id:"3",title:"Next.js로 SSR 구현하기",contents:"서버 사이드 렌더링을 지원하는 Next.js의 기본 사용법과 장점에 대해 설명합니다.",created_date:"2023-08-10",nickname:"박웹개발",category:"Next.js",like_count:56}],ee={title:"Components/SearchList",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"검색 결과를 표시하는 리스트 컴포넌트입니다. 검색 결과, 로딩 상태, 에러 상태, 페이지네이션 등을 지원합니다."}}},argTypes:{results:{description:"검색 결과 배열",control:"object"},totalPages:{description:"전체 페이지 수",control:{type:"number",min:0}},currentPage:{description:"현재 페이지 번호",control:{type:"number",min:1}},onPageChange:{description:"페이지 변경 이벤트 핸들러"},isLoading:{description:"로딩 상태 여부",control:"boolean"},isError:{description:"에러 상태 여부",control:"boolean"},query:{description:"검색어",control:"text"},goToPostDetail:{description:"게시글 상세 페이지로 이동하는 함수"}}},l=({children:a})=>e.jsx("div",{className:"p-4 bg-gray-100 min-h-screen",children:e.jsx("div",{className:"max-w-3xl mx-auto",children:a})}),g={render:()=>e.jsx(l,{children:e.jsx(o,{results:P,totalPages:5,currentPage:1,onPageChange:t("Page changed"),query:"리액트",goToPostDetail:t("Navigate to post detail")})}),parameters:{docs:{description:{story:"검색 결과가 있는 기본 상태의 SearchList 컴포넌트입니다."}}}},u={render:()=>e.jsx(l,{children:e.jsx(o,{results:[],totalPages:0,currentPage:1,onPageChange:t("Page changed"),isLoading:!0,query:"리액트",goToPostDetail:t("Navigate to post detail")})}),parameters:{docs:{description:{story:"데이터를 불러오는 중인 로딩 상태의 SearchList 컴포넌트입니다."}}}},m={render:()=>e.jsx(l,{children:e.jsx(o,{results:[],totalPages:0,currentPage:1,onPageChange:t("Page changed"),isError:!0,query:"리액트",goToPostDetail:t("Navigate to post detail")})}),parameters:{docs:{description:{story:"에러가 발생한 상태의 SearchList 컴포넌트입니다."}}}},p={render:()=>e.jsx(l,{children:e.jsx(o,{results:[],totalPages:0,currentPage:1,onPageChange:t("Page changed"),query:"찾을 수 없는 검색어",goToPostDetail:t("Navigate to post detail")})}),parameters:{docs:{description:{story:"검색 결과가 없는 상태의 SearchList 컴포넌트입니다."}}}},h={render:()=>e.jsx(l,{children:e.jsx(o,{results:[],totalPages:0,currentPage:1,onPageChange:t("Page changed"),query:"",goToPostDetail:t("Navigate to post detail")})}),parameters:{docs:{description:{story:"검색어가 입력되지 않은 상태의 SearchList 컴포넌트입니다."}}}},x={render:()=>e.jsx(l,{children:e.jsx(o,{results:P,totalPages:10,currentPage:5,onPageChange:t("Page changed"),query:"리액트",goToPostDetail:t("Navigate to post detail")})}),parameters:{docs:{description:{story:"여러 페이지가 있는 상태의 SearchList 컴포넌트입니다."}}}},y={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"기본 상태 (검색 결과 있음)"}),e.jsx(o,{results:P,totalPages:5,currentPage:1,onPageChange:t("Page changed"),query:"리액트",goToPostDetail:t("Navigate to post detail")})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"로딩 상태"}),e.jsx(o,{results:[],totalPages:0,currentPage:1,onPageChange:t("Page changed"),isLoading:!0,query:"리액트",goToPostDetail:t("Navigate to post detail")})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"에러 상태"}),e.jsx(o,{results:[],totalPages:0,currentPage:1,onPageChange:t("Page changed"),isError:!0,query:"리액트",goToPostDetail:t("Navigate to post detail")})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"검색 결과 없음"}),e.jsx(o,{results:[],totalPages:0,currentPage:1,onPageChange:t("Page changed"),query:"찾을 수 없는 검색어",goToPostDetail:t("Navigate to post detail")})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"검색어 없음"}),e.jsx(o,{results:[],totalPages:0,currentPage:1,onPageChange:t("Page changed"),query:"",goToPostDetail:t("Navigate to post detail")})]})]}),parameters:{docs:{description:{story:"SearchList 컴포넌트의 모든 상태를 한번에 보여줍니다."}}}};var b,v,N;g.parameters={...g.parameters,docs:{...(b=g.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <Container>
      <SearchList results={mockResults} totalPages={5} currentPage={1} onPageChange={action("Page changed")} query="리액트" goToPostDetail={action("Navigate to post detail")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "검색 결과가 있는 기본 상태의 SearchList 컴포넌트입니다."
      }
    }
  }
}`,...(N=(v=g.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var f,j,S;u.parameters={...u.parameters,docs:{...(f=u.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <Container>
      <SearchList results={[]} totalPages={0} currentPage={1} onPageChange={action("Page changed")} isLoading={true} query="리액트" goToPostDetail={action("Navigate to post detail")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "데이터를 불러오는 중인 로딩 상태의 SearchList 컴포넌트입니다."
      }
    }
  }
}`,...(S=(j=u.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var T,C,q;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <Container>
      <SearchList results={[]} totalPages={0} currentPage={1} onPageChange={action("Page changed")} isError={true} query="리액트" goToPostDetail={action("Navigate to post detail")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "에러가 발생한 상태의 SearchList 컴포넌트입니다."
      }
    }
  }
}`,...(q=(C=m.parameters)==null?void 0:C.docs)==null?void 0:q.source}}};var L,_,D;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Container>
      <SearchList results={[]} totalPages={0} currentPage={1} onPageChange={action("Page changed")} query="찾을 수 없는 검색어" goToPostDetail={action("Navigate to post detail")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "검색 결과가 없는 상태의 SearchList 컴포넌트입니다."
      }
    }
  }
}`,...(D=(_=p.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var k,w,R;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Container>
      <SearchList results={[]} totalPages={0} currentPage={1} onPageChange={action("Page changed")} query="" goToPostDetail={action("Navigate to post detail")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "검색어가 입력되지 않은 상태의 SearchList 컴포넌트입니다."
      }
    }
  }
}`,...(R=(w=h.parameters)==null?void 0:w.docs)==null?void 0:R.source}}};var M,E,V;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <Container>
      <SearchList results={mockResults} totalPages={10} currentPage={5} onPageChange={action("Page changed")} query="리액트" goToPostDetail={action("Navigate to post detail")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "여러 페이지가 있는 상태의 SearchList 컴포넌트입니다."
      }
    }
  }
}`,...(V=(E=x.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var A,I,z;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          기본 상태 (검색 결과 있음)
        </h3>
        <SearchList results={mockResults} totalPages={5} currentPage={1} onPageChange={action("Page changed")} query="리액트" goToPostDetail={action("Navigate to post detail")} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">로딩 상태</h3>
        <SearchList results={[]} totalPages={0} currentPage={1} onPageChange={action("Page changed")} isLoading={true} query="리액트" goToPostDetail={action("Navigate to post detail")} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">에러 상태</h3>
        <SearchList results={[]} totalPages={0} currentPage={1} onPageChange={action("Page changed")} isError={true} query="리액트" goToPostDetail={action("Navigate to post detail")} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">검색 결과 없음</h3>
        <SearchList results={[]} totalPages={0} currentPage={1} onPageChange={action("Page changed")} query="찾을 수 없는 검색어" goToPostDetail={action("Navigate to post detail")} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">검색어 없음</h3>
        <SearchList results={[]} totalPages={0} currentPage={1} onPageChange={action("Page changed")} query="" goToPostDetail={action("Navigate to post detail")} />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "SearchList 컴포넌트의 모든 상태를 한번에 보여줍니다."
      }
    }
  }
}`,...(z=(I=y.parameters)==null?void 0:I.docs)==null?void 0:z.source}}};const te=["Default","Loading","Error","NoResults","NoQuery","MultiplePages","AllStates"];export{y as AllStates,g as Default,m as Error,u as Loading,x as MultiplePages,h as NoQuery,p as NoResults,te as __namedExportsOrder,ee as default};
