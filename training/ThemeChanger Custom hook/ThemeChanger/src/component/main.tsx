import { useState } from "react"
import NameInput from "./input"
import View from "./view"
const Main=()=>{
    const [show, setShow]=useState<Boolean>(false)
    const handleClick=()=>{
        setShow(true)
    }
    const handleClose=()=>{
        setShow(false)
    }
    return(
        <div>
            <button className="absolute top-5 left-5 p-4  bg-gray-300 text-black rounded" onClick={handleClick}>모달 표시</button>
           {show&& <NameInput onCLose={handleClose} />}
           <View/>
           
        </div>
    )
}
export default Main