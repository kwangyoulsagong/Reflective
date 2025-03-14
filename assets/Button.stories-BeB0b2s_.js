import{j as e}from"./jsx-runtime-CmIOflP4.js";import{c as P}from"./createLucideIcon-Dc-6n4Fv.js";import"./index-KqYmeiyw.js";const n=({children:o,variant:l="primary",onClick:d,icon:p,className:u="",disabled:I=!1})=>{const m={primary:"px-3 py-1 text-sm text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors",secondary:"bg-primary rounded-full w-[150px] h-[40px] text-white font-bold",auth:"bg-primary rounded-[20px] w-[300px] h-[40px] text-white font-bold",favorite:"px-3 py-1 text-sm text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors",edit:"flex items-center gap-1 px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-200 text-blue-600 hover:bg-blue-50 transition-colors",delete:"flex items-center gap-1 px-3 py-2 text-sm sm:text-base rounded-lg border border-gray-200 text-red-600 hover:bg-red-50 transition-colors",like:"w-6 h-6 sm:w-[30px] sm:h-[30px] transition-transform hover:scale-110"};return l==="like"?e.jsx("button",{onClick:d,className:`${m[l]} ${u}`,disabled:I,children:o}):e.jsxs("button",{onClick:d,className:`${m[l]} ${u}`,children:[p&&e.jsx("span",{className:"flex items-center",children:p}),o]})};n.__docgenInfo={description:"",methods:[],displayName:"Button",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},variant:{required:!1,tsType:{name:"union",raw:`| "primary"
| "secondary"
| "auth"
| "favorite"
| "edit"
| "delete"
| "like"`,elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"secondary"'},{name:"literal",value:'"auth"'},{name:"literal",value:'"favorite"'},{name:"literal",value:'"edit"'},{name:"literal",value:'"delete"'},{name:"literal",value:'"like"'}]},description:"",defaultValue:{value:'"primary"',computed:!1}},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},icon:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=P("Pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=P("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),$={title:"UI/Button",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"다양한 스타일과 용도로 사용할 수 있는 버튼 컴포넌트입니다."}}},argTypes:{variant:{description:"버튼의 스타일 변형",control:"select",options:["primary","secondary","auth","favorite","edit","delete","like"]},children:{description:"버튼 내부 콘텐츠",control:"text"},onClick:{description:"클릭 이벤트 핸들러"},icon:{description:"버튼에 표시될 아이콘"},className:{description:"추가 스타일링을 위한 클래스"}}},r=({children:o})=>e.jsx("div",{className:"flex flex-wrap gap-4 p-4",children:o}),t={render:()=>e.jsx(r,{children:e.jsx(n,{variant:"primary",onClick:()=>console.log("clicked"),children:"댓글 작성하기"})}),parameters:{docs:{description:{story:"주요 액션을 위한 기본 버튼입니다."}}}},a={render:()=>e.jsx(r,{children:e.jsx(n,{variant:"secondary",onClick:()=>console.log("clicked"),children:"버튼"})}),parameters:{docs:{description:{story:"보조 액션을 위한 버튼입니다."}}}},i={render:()=>e.jsx(r,{children:e.jsx(n,{variant:"auth",onClick:()=>console.log("clicked"),children:"로그인"})}),parameters:{docs:{description:{story:"인증 관련 액션을 위한 넓은 버튼입니다."}}}},s={render:()=>e.jsxs(r,{children:[e.jsx(n,{variant:"edit",onClick:()=>console.log("clicked"),icon:e.jsx(V,{className:"w-4 h-4"}),children:"수정"}),e.jsx(n,{variant:"delete",onClick:()=>console.log("clicked"),icon:e.jsx(q,{className:"w-4 h-4"}),children:"삭제"})]}),parameters:{docs:{description:{story:"아이콘이 포함된 버튼 예시입니다."}}}},c={render:()=>e.jsxs(r,{children:[e.jsx(n,{variant:"primary",onClick:()=>console.log("clicked"),children:"Primary"}),e.jsx(n,{variant:"secondary",onClick:()=>console.log("clicked"),children:"Secondary"}),e.jsx(n,{variant:"auth",onClick:()=>console.log("clicked"),children:"로그인"}),e.jsx(n,{variant:"favorite",onClick:()=>console.log("clicked"),children:"즐겨찾기"}),e.jsx(n,{variant:"favorite",onClick:()=>console.log("clicked"),children:"취소하기"}),e.jsx(n,{variant:"edit",onClick:()=>console.log("clicked"),icon:e.jsx(V,{className:"w-4 h-4"}),children:"수정"}),e.jsx(n,{variant:"delete",onClick:()=>console.log("clicked"),icon:e.jsx(q,{className:"w-4 h-4"}),children:"삭제"})]}),parameters:{docs:{description:{story:"사용 가능한 모든 버튼 변형을 보여줍니다."}}}};var y,h,x;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <Button variant="primary" onClick={() => console.log("clicked")}>
        댓글 작성하기
      </Button>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "주요 액션을 위한 기본 버튼입니다."
      }
    }
  }
}`,...(x=(h=t.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var k,v,g;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <Button variant="secondary" onClick={() => console.log("clicked")}>
        버튼
      </Button>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "보조 액션을 위한 버튼입니다."
      }
    }
  }
}`,...(g=(v=a.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var B,f,C;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <Button variant="auth" onClick={() => console.log("clicked")}>
        로그인
      </Button>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "인증 관련 액션을 위한 넓은 버튼입니다."
      }
    }
  }
}`,...(C=(f=i.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var j,b,w;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <Button variant="edit" onClick={() => console.log("clicked")} icon={<Pencil className="w-4 h-4" />}>
        수정
      </Button>
      <Button variant="delete" onClick={() => console.log("clicked")} icon={<Trash2 className="w-4 h-4" />}>
        삭제
      </Button>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "아이콘이 포함된 버튼 예시입니다."
      }
    }
  }
}`,...(w=(b=s.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var N,T,S;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <Button variant="primary" onClick={() => console.log("clicked")}>
        Primary
      </Button>
      <Button variant="secondary" onClick={() => console.log("clicked")}>
        Secondary
      </Button>
      <Button variant="auth" onClick={() => console.log("clicked")}>
        로그인
      </Button>
      <Button variant="favorite" onClick={() => console.log("clicked")}>
        즐겨찾기
      </Button>
      <Button variant="favorite" onClick={() => console.log("clicked")}>
        취소하기
      </Button>
      <Button variant="edit" onClick={() => console.log("clicked")} icon={<Pencil className="w-4 h-4" />}>
        수정
      </Button>
      <Button variant="delete" onClick={() => console.log("clicked")} icon={<Trash2 className="w-4 h-4" />}>
        삭제
      </Button>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "사용 가능한 모든 버튼 변형을 보여줍니다."
      }
    }
  }
}`,...(S=(T=c.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};const R=["Primary","Secondary","Auth","WithIcons","AllVariants"];export{c as AllVariants,i as Auth,t as Primary,a as Secondary,s as WithIcons,R as __namedExportsOrder,$ as default};
