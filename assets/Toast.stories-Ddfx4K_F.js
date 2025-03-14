import{j as e}from"./jsx-runtime-CmIOflP4.js";import{r as v}from"./index-KqYmeiyw.js";import{c as J}from"./createLucideIcon-Dc-6n4Fv.js";import{a as t}from"./index-CfQd_q1B.js";import"./v4-CtRu48qb.js";/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=J("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),n=({id:o,message:l,type:r="info",duration:m=3e3,onClose:s})=>{const[p,d]=v.useState(!0);v.useEffect(()=>{const i=setTimeout(()=>{d(!1),setTimeout(()=>s(o),300)},m);return()=>clearTimeout(i)},[m,o,s]);const a=(()=>{const i="bg-white border border-gray-100 w-[200px]";switch(r){case"success":return{container:`${i}`,icon:"toast-success",iconChar:"✓",title:"성공"};case"error":return{container:`${i}`,icon:"text-red-500",iconChar:"✕",title:"오류"};case"warning":return{container:`${i}`,icon:"text-amber-500",iconChar:"!",title:"주의"};case"info":default:return{container:`${i}`,icon:"text-blue-500",iconChar:"i",title:"안내"}}})();return e.jsx("div",{className:`fixed top-0 right-0 ${p?"translate-y-0 opacity-100":"translate-y-4 opacity-0"} shadow-lg rounded-xl overflow-hidden max-w-md transition-all duration-300 ease-in-out ${a.container}`,style:{zIndex:9999},children:e.jsxs("div",{className:"p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-1",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("span",{className:`${a.icon} mr-2 text-lg`,children:a.iconChar}),e.jsx("span",{className:"font-semibold text-sm text-gray-900",children:a.title})]}),e.jsx("button",{onClick:()=>{d(!1),setTimeout(()=>s(o),300)},className:"text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none",children:e.jsx(K,{size:16})})]}),e.jsx("p",{className:"text-sm text-gray-700 pl-6",children:l})]})})};n.__docgenInfo={description:"",methods:[],displayName:"Toast",props:{id:{required:!0,tsType:{name:"string"},description:""},message:{required:!0,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"union",raw:'"success" | "error" | "warning" | "info"',elements:[{name:"literal",value:'"success"'},{name:"literal",value:'"error"'},{name:"literal",value:'"warning"'},{name:"literal",value:'"info"'}]},description:"",defaultValue:{value:'"info"',computed:!1}},duration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"3000",computed:!1}},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""}}};const ee={title:"Components/Toast",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"사용자에게 알림을 제공하는 토스트 컴포넌트입니다. 성공, 오류, 경고, 정보 등 다양한 타입을 지원합니다."}}},argTypes:{id:{description:"토스트 식별자",control:"text"},message:{description:"토스트에 표시될 메시지",control:"text"},type:{description:"토스트 타입 (success, error, warning, info)",control:{type:"select",options:["success","error","warning","info"]}},duration:{description:"토스트가 표시되는 시간 (밀리초)",control:{type:"number",min:1e3,max:1e4,step:500}},onClose:{description:"토스트가 닫힐 때 호출되는 콜백 함수"}}},c=({children:o})=>e.jsx("div",{className:"p-4 bg-gray-100 flex justify-center items-start min-h-screen",children:e.jsx("div",{children:o})}),u={render:()=>e.jsx(c,{children:e.jsx(n,{id:"1",message:"기본 정보 메시지입니다.",onClose:t("Toast closed")})}),parameters:{docs:{description:{story:"기본 정보(info) 타입의 토스트 메시지입니다."}}}},g={args:{message:`ㄹㅇㅁㄹㄴㄹㄴㅁㄴㄹㅁ
`},render:()=>e.jsx(c,{children:e.jsx(n,{id:"2",message:"작업이 성공적으로 완료되었습니다.",type:"success",onClose:t("Toast closed")})}),parameters:{docs:{description:{story:"성공(success) 타입의 토스트 메시지입니다."}}}},x={render:()=>e.jsx(c,{children:e.jsx(n,{id:"3",message:"오류가 발생했습니다. 다시 시도해주세요.",type:"error",onClose:t("Toast closed")})}),parameters:{docs:{description:{story:"오류(error) 타입의 토스트 메시지입니다."}}}},y={render:()=>e.jsx(c,{children:e.jsx(n,{id:"4",message:"주의: 저장되지 않은 변경사항이 있습니다.",type:"warning",onClose:t("Toast closed")})}),parameters:{docs:{description:{story:"경고(warning) 타입의 토스트 메시지입니다."}}}},T={render:()=>e.jsx(c,{children:e.jsx(n,{id:"5",message:"이것은 매우 긴 메시지입니다. 토스트 컴포넌트가 긴 텍스트를 어떻게 처리하는지 확인하기 위한 것입니다. 레이아웃이 깨지지 않고 적절하게 표시되어야 합니다.",onClose:t("Toast closed")})}),parameters:{docs:{description:{story:"긴 메시지를 포함한 토스트입니다. 레이아웃 처리를 테스트합니다."}}}},h={render:()=>e.jsx(c,{children:e.jsx(n,{id:"6",message:"이 토스트는 7초 동안 표시됩니다.",duration:7e3,onClose:t("Toast closed")})}),parameters:{docs:{description:{story:"사용자 정의 지속 시간 (7초)을 가진 토스트입니다."}}}},f={render:()=>{const[o,l]=v.useState([]),r=s=>{const C={id:Date.now().toString(),type:s,message:{info:"새로운 정보가 있습니다.",success:"작업이 성공적으로 완료되었습니다.",warning:"주의가 필요한 작업입니다.",error:"오류가 발생했습니다."}[s]};l(a=>[...a,C])},m=s=>{l(p=>p.filter(d=>d.id!==s))};return e.jsxs("div",{className:"p-4",children:[e.jsxs("div",{className:"flex space-x-2 mb-4",children:[e.jsx("button",{className:"px-4 py-2 bg-blue-500 text-white rounded",onClick:()=>r("info"),children:"Info"}),e.jsx("button",{className:"px-4 py-2 bg-green-500 text-white rounded",onClick:()=>r("success"),children:"Success"}),e.jsx("button",{className:"px-4 py-2 bg-yellow-500 text-white rounded",onClick:()=>r("warning"),children:"Warning"}),e.jsx("button",{className:"px-4 py-2 bg-red-500 text-white rounded",onClick:()=>r("error"),children:"Error"})]}),e.jsx("div",{className:"space-y-2",children:o.map(s=>e.jsx("div",{className:"relative",style:{height:"80px"},children:e.jsx(n,{id:s.id,message:s.message,type:s.type,onClose:m})},s.id))})]})},parameters:{docs:{description:{story:"인터랙티브한 토스트 데모입니다. 버튼을 클릭하여 다양한 유형의 토스트를 생성할 수 있습니다."}}}},b={render:()=>e.jsxs("div",{className:"space-y-4 p-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Info Toast"}),e.jsx(n,{id:"info",message:"정보 메시지입니다.",type:"info",onClose:t("Info toast closed")})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Success Toast"}),e.jsx(n,{id:"success",message:"성공 메시지입니다.",type:"success",onClose:t("Success toast closed")})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Warning Toast"}),e.jsx(n,{id:"warning",message:"경고 메시지입니다.",type:"warning",onClose:t("Warning toast closed")})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Error Toast"}),e.jsx(n,{id:"error",message:"오류 메시지입니다.",type:"error",onClose:t("Error toast closed")})]})]}),parameters:{docs:{description:{story:"모든 토스트 타입을 한번에 볼 수 있는 예시입니다."}}}};var j,w,N;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Container>
      <Toast id="1" message="기본 정보 메시지입니다." onClose={action("Toast closed")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "기본 정보(info) 타입의 토스트 메시지입니다."
      }
    }
  }
}`,...(N=(w=u.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};var S,k,I;g.parameters={...g.parameters,docs:{...(S=g.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    message: "ㄹㅇㅁㄹㄴㄹㄴㅁㄴㄹㅁ\\n"
  },
  render: () => <Container>
      <Toast id="2" message="작업이 성공적으로 완료되었습니다." type="success" onClose={action("Toast closed")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "성공(success) 타입의 토스트 메시지입니다."
      }
    }
  }
}`,...(I=(k=g.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var E,D,W;x.parameters={...x.parameters,docs:{...(E=x.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <Container>
      <Toast id="3" message="오류가 발생했습니다. 다시 시도해주세요." type="error" onClose={action("Toast closed")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "오류(error) 타입의 토스트 메시지입니다."
      }
    }
  }
}`,...(W=(D=x.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};var $,q,V;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <Container>
      <Toast id="4" message="주의: 저장되지 않은 변경사항이 있습니다." type="warning" onClose={action("Toast closed")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "경고(warning) 타입의 토스트 메시지입니다."
      }
    }
  }
}`,...(V=(q=y.parameters)==null?void 0:q.docs)==null?void 0:V.source}}};var _,L,M;T.parameters={...T.parameters,docs:{...(_=T.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <Container>
      <Toast id="5" message="이것은 매우 긴 메시지입니다. 토스트 컴포넌트가 긴 텍스트를 어떻게 처리하는지 확인하기 위한 것입니다. 레이아웃이 깨지지 않고 적절하게 표시되어야 합니다." onClose={action("Toast closed")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "긴 메시지를 포함한 토스트입니다. 레이아웃 처리를 테스트합니다."
      }
    }
  }
}`,...(M=(L=T.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var z,A,R;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <Container>
      <Toast id="6" message="이 토스트는 7초 동안 표시됩니다." duration={7000} onClose={action("Toast closed")} />
    </Container>,
  parameters: {
    docs: {
      description: {
        story: "사용자 정의 지속 시간 (7초)을 가진 토스트입니다."
      }
    }
  }
}`,...(R=(A=h.parameters)==null?void 0:A.docs)==null?void 0:R.source}}};var X,O,B;f.parameters={...f.parameters,docs:{...(X=f.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => {
    // 토스트 타입 정의
    type ToastType = "info" | "success" | "warning" | "error";
    interface ToastItem {
      id: string;
      type: ToastType;
      message: string;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const addToast = (type: ToastType) => {
      const id = Date.now().toString();
      const messages: Record<ToastType, string> = {
        info: "새로운 정보가 있습니다.",
        success: "작업이 성공적으로 완료되었습니다.",
        warning: "주의가 필요한 작업입니다.",
        error: "오류가 발생했습니다."
      };
      const newToast: ToastItem = {
        id,
        type,
        message: messages[type]
      };
      setToasts(prevToasts => [...prevToasts, newToast]);
    };
    const removeToast = (id: string) => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    };
    return <div className="p-4">
        <div className="flex space-x-2 mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => addToast("info")}>
            Info
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => addToast("success")}>
            Success
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => addToast("warning")}>
            Warning
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => addToast("error")}>
            Error
          </button>
        </div>

        <div className="space-y-2">
          {toasts.map(toast => <div key={toast.id} className="relative" style={{
          height: "80px"
        }}>
              <Toast id={toast.id} message={toast.message} type={toast.type} onClose={removeToast} />
            </div>)}
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "인터랙티브한 토스트 데모입니다. 버튼을 클릭하여 다양한 유형의 토스트를 생성할 수 있습니다."
      }
    }
  }
}`,...(B=(O=f.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var F,G,H;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Info Toast</h3>
        <Toast id="info" message="정보 메시지입니다." type="info" onClose={action("Info toast closed")} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Success Toast</h3>
        <Toast id="success" message="성공 메시지입니다." type="success" onClose={action("Success toast closed")} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Warning Toast</h3>
        <Toast id="warning" message="경고 메시지입니다." type="warning" onClose={action("Warning toast closed")} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Error Toast</h3>
        <Toast id="error" message="오류 메시지입니다." type="error" onClose={action("Error toast closed")} />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "모든 토스트 타입을 한번에 볼 수 있는 예시입니다."
      }
    }
  }
}`,...(H=(G=b.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};const se=["Default","Success","Error","Warning","LongMessage","CustomDuration","InteractiveDemo","AllTypes"];export{b as AllTypes,h as CustomDuration,u as Default,x as Error,f as InteractiveDemo,T as LongMessage,g as Success,y as Warning,se as __namedExportsOrder,ee as default};
