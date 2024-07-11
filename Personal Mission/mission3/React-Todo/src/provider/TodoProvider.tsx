import { create } from "zustand";
import { persist } from "zustand/middleware";

// 인터페이스 정의
interface TodoItem{
    id:number
    title:string,
    content:string,
    category:string,
    completed:boolean
}
// 인터페이스 정의
interface TodoState{
    todos: TodoItem[],
    addTodo: (todo: Omit<TodoItem, "id">) => void;
    deleteTodo:(id:number)=>void
    completeTodo:(id:number)=>void
}

// 상태 관리 함수
export const useTodoStore=create<TodoState>()(
persist((set)=>({
   todos:[],
   //추가
   addTodo: (todo)=>
    set((state)=>{
        //todo에 아이템 추가 
        const newTodo:TodoItem={
            ...todo,
            id:state.todos.length>0 ? state.todos[state.todos.length-1].id+1:1
        }
        return{
            todos:[...state.todos, newTodo]
        }
    }),
   //삭제
   deleteTodo:(id)=>set((state)=>({
    todos: state.todos.filter((todo)=>todo.id !==id)
   })),
   //완료 상태
   completeTodo: (id)=>
    set((state)=>({
        todos:state.todos.map((todo)=>
        todo.id===id? {...todo, completed:!todo.completed}:todo)
    }))

}),{
    name: 'todo-storage',
    getStorage:()=>localStorage
}))