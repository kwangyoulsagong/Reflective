import { useState } from "react"
import TodoInput from "../components/TodoInput"
import Button from "../components/button"
import TodoList from "../components/TodoList"
const Todo=()=>{
    //투 두 입력창 모달 상태 정의
    const [showModal, setShowModal]=useState<Boolean>(false)

    // 모달 창 보기
    const handleClick = () => {
        setShowModal(true);
    };

    //모달 창 닫기
    const handleClose=()=>{
        setShowModal(false)
    }

    return(
        <div className="">
            <Button onClick={handleClick}>할 일 작성</Button>
            {showModal&&<TodoInput onClose={handleClose} />}
            <TodoList/>
        </div>
    )
}
export default Todo