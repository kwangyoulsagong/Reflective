import { useReducer } from "react";

// 액션 타입 지정
const ActionType={
    SET_TITLE:"SET_TITLE",
    SET_CONTENT:"SET_CONTENT",
    SELECT_CATEGORIES:"SELECT_CATEGORIES"
}

// 초기값 지정
const initialstate={
    title:"",
    content:"",
    category:""
}

//action 타입 지정
type Action=|{type: typeof ActionType.SET_TITLE; payload:string}
            |{type: typeof ActionType.SET_CONTENT; payload:string}
            |{type: typeof ActionType.SELECT_CATEGORIES; payload:string}

// 리듀서 함수 정의
const doInput=(state:typeof initialstate, action:Action)=>{
    switch(action.type){
        case ActionType.SET_TITLE:
            return {...state, title: action.payload}
        case ActionType.SET_CONTENT:
            return {...state, content: action.payload}
        case ActionType.SELECT_CATEGORIES:
            return {...state, category:action.payload}
        default:
            return state
    }
}

export {doInput,initialstate,ActionType}