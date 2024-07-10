import { ReactNode } from "react"

//인터페이스 타입 정의
interface ButtonProps{
    onClick:()=>void,
    children:React.ReactNode
}
const Button=({onClick,children}:ButtonProps)=>{
    return(
        <button onClick={onClick}>{children}</button>
    )
}
export default Button