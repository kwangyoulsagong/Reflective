import { useReducer } from "react";

//액션 타입 지정
const ActionType={
    OPEN_MODAL:"OPEN_MODAL",
    CLOSE_MODAL:"CLOSE_MODAL",
    OPEN_THEME:"OPEN_THEME",
    CLOSE_THEME:"CLOSE_THEME"
}

// 초기 상태 지정
const initialState={
    isModalOpen:false,
    isThemeOpen:false
}

const Modal=(state:any, action:any)=>{
    switch(action.type){
        case ActionType.OPEN_MODAL:
            return {
                ...state,
                isModalOpen:true
                
            }
        case ActionType.CLOSE_MODAL:
            return{
                ...state,
                isModalOpen:false
            }
        case ActionType.OPEN_THEME:
            return{
                ...state,
                isThemeOpen:true
            }
        case ActionType.CLOSE_THEME:
            return{
                ...state,
                isThemeOpen:false
            }
        default:
            return state
    }
}
export {Modal, initialState, ActionType}
