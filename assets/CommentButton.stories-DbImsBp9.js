import{j as n}from"./jsx-runtime-CmIOflP4.js";import"./index-KqYmeiyw.js";const e=({variant:i="primary",onClick:b,children:S,className:w=""})=>{const N={primary:"px-4 py-2 text-white bg-primary rounded-full hover:bg-primary-dark transition-colors","sm-primary":"px-3 py-1 text-sm text-white bg-primary rounded-full hover:bg-primary-dark transition-colors",secondary:"px-3 py-1 text-sm text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors",cancel:"px-3 py-1 text-sm text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors",action:"text-sm text-gray-500 flex items-center hover:text-primary transition-colors"};return n.jsx("button",{className:`${N[i]} ${w}`,onClick:b,children:S})};e.__docgenInfo={description:"",methods:[],displayName:"CommentButton",props:{variant:{required:!1,tsType:{name:"union",raw:'"primary" | "sm-primary" | "secondary" | "cancel" | "action"',elements:[{name:"literal",value:'"primary"'},{name:"literal",value:'"sm-primary"'},{name:"literal",value:'"secondary"'},{name:"literal",value:'"cancel"'},{name:"literal",value:'"action"'}]},description:"",defaultValue:{value:'"primary"',computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const V={title:"UI/CommentButton",component:e,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"댓글 관련 액션에 사용되는 버튼 컴포넌트입니다."}}},argTypes:{variant:{description:"버튼의 스타일 변형",control:"select",options:["primary","sm-primary","secondary","cancel","action"],defaultValue:"primary"},children:{description:"버튼 내부 콘텐츠",control:"text"},onClick:{description:"클릭 이벤트 핸들러"},className:{description:"추가 스타일링을 위한 클래스"}}},r=({children:i})=>n.jsx("div",{className:"flex flex-wrap gap-4 p-4",children:i}),o={render:()=>n.jsx(r,{children:n.jsx(e,{variant:"primary",onClick:()=>console.log("clicked"),children:"댓글 작성하기"})}),parameters:{docs:{description:{story:"기본 댓글 작성 버튼입니다."}}}},t={render:()=>n.jsx(r,{children:n.jsx(e,{variant:"sm-primary",onClick:()=>console.log("clicked"),children:"작성"})}),parameters:{docs:{description:{story:"작은 크기의 기본 버튼입니다."}}}},a={render:()=>n.jsx(r,{children:n.jsx(e,{variant:"secondary",onClick:()=>console.log("clicked"),children:"답글 달기"})}),parameters:{docs:{description:{story:"보조 액션을 위한 버튼입니다."}}}},c={render:()=>n.jsx(r,{children:n.jsx(e,{variant:"cancel",onClick:()=>console.log("clicked"),children:"취소"})}),parameters:{docs:{description:{story:"취소 액션을 위한 버튼입니다."}}}},s={render:()=>n.jsxs(r,{children:[n.jsx(e,{variant:"primary",onClick:()=>console.log("clicked"),children:"댓글 작성"}),n.jsx(e,{variant:"sm-primary",onClick:()=>console.log("clicked"),children:"작성"}),n.jsx(e,{variant:"secondary",onClick:()=>console.log("clicked"),children:"답글 달기"}),n.jsx(e,{variant:"cancel",onClick:()=>console.log("clicked"),children:"취소"})]}),parameters:{docs:{description:{story:"사용 가능한 모든 버튼 변형을 보여줍니다."}}}};var l,m,d;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <CommentButton variant="primary" onClick={() => console.log("clicked")}>
        댓글 작성하기
      </CommentButton>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "기본 댓글 작성 버튼입니다."
      }
    }
  }
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var p,u,y;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <CommentButton variant="sm-primary" onClick={() => console.log("clicked")}>
        작성
      </CommentButton>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "작은 크기의 기본 버튼입니다."
      }
    }
  }
}`,...(y=(u=t.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var C,g,x;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <CommentButton variant="secondary" onClick={() => console.log("clicked")}>
        답글 달기
      </CommentButton>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "보조 액션을 위한 버튼입니다."
      }
    }
  }
}`,...(x=(g=a.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var k,v,B;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <CommentButton variant="cancel" onClick={() => console.log("clicked")}>
        취소
      </CommentButton>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "취소 액션을 위한 버튼입니다."
      }
    }
  }
}`,...(B=(v=c.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var h,f,j;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <ButtonContainer>
      <CommentButton variant="primary" onClick={() => console.log("clicked")}>
        댓글 작성
      </CommentButton>
      <CommentButton variant="sm-primary" onClick={() => console.log("clicked")}>
        작성
      </CommentButton>
      <CommentButton variant="secondary" onClick={() => console.log("clicked")}>
        답글 달기
      </CommentButton>
      <CommentButton variant="cancel" onClick={() => console.log("clicked")}>
        취소
      </CommentButton>
    </ButtonContainer>,
  parameters: {
    docs: {
      description: {
        story: "사용 가능한 모든 버튼 변형을 보여줍니다."
      }
    }
  }
}`,...(j=(f=s.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};const q=["Primary","SmallPrimary","Secondary","Cancel","AllVariants"];export{s as AllVariants,c as Cancel,o as Primary,a as Secondary,t as SmallPrimary,q as __namedExportsOrder,V as default};
