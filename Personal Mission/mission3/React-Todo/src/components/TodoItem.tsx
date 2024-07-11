import { useTodoStore } from "../provider/TodoProvider";
import Button from "./button";

const TodoItem=({todo}:any)=>{
    const {deleteTodo}=useTodoStore()
    //
    const handleDelete=()=>{
        deleteTodo(todo.id)
    }
     const categoryClasses: Record<string, string> = {
        업무: "bg-blue-100 text-blue-800",
        개인: "bg-red-100 text-red-800",
        자유: "bg-green-100 text-green-800",
        운동: "bg-yellow-100 text-yellow-800",
      };
    return(
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md w-40 h-60 overflow-hidden gap-2">
              
                
                <h3 className="font-bold text-xl mb-2  w-full text-left">{todo.title}</h3>
                <p className="text-gray-700 mb-4 overflow-hidden text-ellipsis w-full h-20">{todo.content}</p>
                <span className={`text-sm ${categoryClasses[todo.category]} py-1 px-2 rounded`}>{todo.category}</span>
                <div className="text-red-600 hover:bg-red-100 hover:text-red-800 rounded-full p-1 transition duration-300 ">
                    <Button onClick={handleDelete}>삭제</Button>
                </div>
           </div>
    )
}
export default TodoItem