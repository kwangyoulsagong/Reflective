import { createContext, useContext, useState, ReactNode} from "react";

//Context 타입 정의
interface nameContextType{
    name:string,
    setName:(name:string)=>void;
}

//context 생성
const nameContext=createContext<nameContextType | undefined>(undefined)

// context를 사용하기 위한 커스텀 훅
const useName=()=>{
    const context=useContext(nameContext)
    if(!context){
        throw new Error("useName은 반드시 NameProvider를 통해 이용해야 합니다.")
    }
    return context
}

//Provider 컴폰너트
const NameProvider=({children}: {children:ReactNode})=>{
    const [name,setName]=useState<string>("")
    return(
        <nameContext.Provider value={{name, setName}}>
            {children}
        </nameContext.Provider>
    )
}
export{NameProvider,useName}