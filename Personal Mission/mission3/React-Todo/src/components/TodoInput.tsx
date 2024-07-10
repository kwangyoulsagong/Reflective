import { useReducer } from "react"
import Button from "./button"
import { ActionType, doInput, initialstate } from "../reducer/Doinput"
// 인터페이스 타입 정의
interface ButtonProps{
    onClose:()=>void,
}
const TodoInput = ({onClose}:ButtonProps)=>{
    // 입력 및 select state 가독성 상태 관리
    const [state, dispatch]=useReducer(doInput,initialstate)
    
    const handleTitleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch({type:ActionType.SET_TITLE, payload:e.target.value})
    }
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900 opacity-85">
          
            <div className="relative flex flex-col bg-white p-10 rounded gap-2 ">
            <div className="absolute top-2 right-2">
                <Button onClick={onClose} >닫기</Button>
            </div>
                <section>
                    <input className="border rounded border-slate-400  w-80 p-2 outline-none" value={state.title} onChange={handleTitleChange} placeholder="할 일 제목 작성" ></input>
                </section>
                <section>
                    <textarea className="border rounded border-slate-400 w-80 h-40 outline-none p-2 " placeholder="할 일 설명 작성"></textarea>
                </section>
                <section>
                    <select className="border rounded border-slate-400 w-80 p-2 outline-none">
                        <option value="">카테고리 선택</option>
                        <option value="work">업무</option>
                        <option value="personal">개인</option>
                    </select>
                </section>
            </div>
        </div>
    )
}
export default TodoInput