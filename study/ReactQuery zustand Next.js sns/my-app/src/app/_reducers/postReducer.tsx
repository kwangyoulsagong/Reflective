import { v4 as uuidv4 } from 'uuid';
const ActionType={
    SET_TITLE:"SET_TITLE",
    SET_CONTENT:"SET_CONTENT"
}
const initialState={
    postId:uuidv4(),
    title:"",
    content:""
}

type Action=|{type:typeof ActionType.SET_TITLE, payload:string}
            |{type:typeof ActionType.SET_CONTENT, payload:string}

const postReducer=(state:typeof initialState, action:Action)=>{
    switch(action.type){
        case ActionType.SET_TITLE:
            return{
                ...state,
                title:action.payload
            }
        case ActionType.SET_CONTENT:
            return{
                ...state,
                content:action.payload
            }
        default:
            return state
    }
}
export {postReducer,initialState,ActionType}