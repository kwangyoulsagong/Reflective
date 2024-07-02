import React from "react"
import './Input.css'
const Input = ({type,placeholder})=>{
    return(
        <>
        {/* props로 받은 타입과 플레이스홀더  */}
        <input type={type} placeholder={placeholder} className="input-field"></input>
        </>
    )
}
export default Input