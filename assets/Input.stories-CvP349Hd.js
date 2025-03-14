import{j as e}from"./jsx-runtime-CmIOflP4.js";import{r as T}from"./index-KqYmeiyw.js";const l=({value:r,onChange:i,placeholder:c,type:d="text"})=>e.jsx("input",{value:r,onChange:i,placeholder:c,type:d,className:"w-[300px] h-[40px] bg-input outline-none indent-4 text-sm bg-input"});l.__docgenInfo={description:"",methods:[],displayName:"Input",props:{value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(e: React.ChangeEvent<HTMLInputElement>) => void",signature:{arguments:[{type:{name:"ReactChangeEvent",raw:"React.ChangeEvent<HTMLInputElement>",elements:[{name:"HTMLInputElement"}]},name:"e"}],return:{name:"void"}}},description:""},placeholder:{required:!0,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"text"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const W={title:"UI/Input",component:l,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"기본 입력 컴포넌트입니다. 다양한 타입의 입력을 지원하며, 커스텀 스타일링이 가능합니다."}}},argTypes:{value:{description:"입력 필드의 값",type:{name:"string",required:!0}},onChange:{description:"값 변경 시 호출되는 핸들러",type:{name:"function",required:!0}},placeholder:{description:"입력 필드의 플레이스홀더",type:{name:"string",required:!0}},type:{description:"입력 필드의 타입",control:"select",options:["text","email","password","tel"],table:{defaultValue:{summary:"text"}}},className:{description:"추가 스타일링을 위한 클래스",type:"string"}}},p=({children:r})=>e.jsx("div",{className:"flex flex-col gap-2 p-4",children:r}),t=({type:r="text",placeholder:i})=>{const[c,d]=T.useState("");return e.jsx(l,{value:c,onChange:E=>d(E.target.value),placeholder:i,type:r})},n={render:()=>e.jsx(p,{children:e.jsx(t,{placeholder:"텍스트를 입력하세요"})}),parameters:{docs:{description:{story:"기본적인 텍스트 입력 필드입니다."}}}},s={render:()=>e.jsx(p,{children:e.jsx(t,{type:"email",placeholder:"이메일을 입력하세요"})}),parameters:{docs:{description:{story:"이메일 형식을 검증하는 입력 필드입니다."}}}},a={render:()=>e.jsx(p,{children:e.jsx(t,{type:"password",placeholder:"비밀번호를 입력하세요"})}),parameters:{docs:{description:{story:"비밀번호 입력을 위한 필드입니다. 입력값이 마스킹됩니다."}}}},o={render:()=>e.jsxs(p,{children:[e.jsx(t,{placeholder:"기본 텍스트"}),e.jsx(t,{type:"email",placeholder:"이메일 입력"}),e.jsx(t,{type:"password",placeholder:"비밀번호 입력"}),e.jsx(t,{type:"tel",placeholder:"전화번호 입력"})]}),parameters:{docs:{description:{story:"지원하는 모든 입력 타입을 한 번에 보여주는 예시입니다."}}}};var u,m,y;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <InputContainer>
      <InputWithState placeholder="텍스트를 입력하세요" />
    </InputContainer>,
  parameters: {
    docs: {
      description: {
        story: "기본적인 텍스트 입력 필드입니다."
      }
    }
  }
}`,...(y=(m=n.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var h,x,g;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <InputContainer>
      <InputWithState type="email" placeholder="이메일을 입력하세요" />
    </InputContainer>,
  parameters: {
    docs: {
      description: {
        story: "이메일 형식을 검증하는 입력 필드입니다."
      }
    }
  }
}`,...(g=(x=s.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var I,j,f;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <InputContainer>
      <InputWithState type="password" placeholder="비밀번호를 입력하세요" />
    </InputContainer>,
  parameters: {
    docs: {
      description: {
        story: "비밀번호 입력을 위한 필드입니다. 입력값이 마스킹됩니다."
      }
    }
  }
}`,...(f=(j=a.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};var C,S,v;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <InputContainer>
      <InputWithState placeholder="기본 텍스트" />
      <InputWithState type="email" placeholder="이메일 입력" />
      <InputWithState type="password" placeholder="비밀번호 입력" />
      <InputWithState type="tel" placeholder="전화번호 입력" />
    </InputContainer>,
  parameters: {
    docs: {
      description: {
        story: "지원하는 모든 입력 타입을 한 번에 보여주는 예시입니다."
      }
    }
  }
}`,...(v=(S=o.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};const N=["Default","Email","Password","AllTypes"];export{o as AllTypes,n as Default,s as Email,a as Password,N as __namedExportsOrder,W as default};
