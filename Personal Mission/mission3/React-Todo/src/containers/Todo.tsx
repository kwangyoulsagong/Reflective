import { useState } from "react"
import TodoInput from "../components/TodoInput"
const Todo=()=>{
    
    const [showModal, setShowModal]=useState<Boolean>(false)
    return(
        <div className="">
            <TodoInput/>
        </div>
    )
}
export default Todo