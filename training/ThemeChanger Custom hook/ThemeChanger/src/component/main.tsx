import { useReducer, useState } from "react"
import NameInput from "./input"
import View from "./view"
import { NameProvider } from "../Provider/name"
import { Modal, initialState, ActionType } from "../hooks/modal"
import Theme from "./theme"
const Main=()=>{
    //클릭 스테이트가 4개라 복잡성을 위해 리듀서 이용 
    const [state, dispatch]=useReducer(Modal, initialState)
    const handleModalClick=()=>{
        dispatch({type:ActionType.OPEN_MODAL})
    }
    const handleModalClose=()=>{
        dispatch({type:ActionType.CLOSE_MODAL})
    }
    const handleThemeClick=()=>{
        dispatch({type:ActionType.OPEN_THEME})
    }
    const handleThemeCLose=()=>{
        dispatch({type:ActionType.CLOSE_THEME})
    }
    return(
        <div>
            {/* 콘텍스트 api Provider */}
            <NameProvider>
            <button className="absolute top-5 left-5 p-4  bg-gray-300 text-black rounded" onClick={handleModalClick}>모달 표시</button>
            <button className="absolute top-5 right-5 p-4 bg-purple-500 text-purple-900 rounded" onClick={handleThemeClick}>테마 변경</button>
           {state.isModalOpen&& <NameInput onCLose={handleModalClose} />}
           <View/>
           {state.isThemeOpen&&<Theme onCLose={handleThemeCLose}/>}
           </NameProvider>
        </div>
    )
}
export default Main