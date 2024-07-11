import { useTodoStore } from "../provider/TodoProvider"
import TodoItem from "./TodoItem";

const TodoList=()=>{
    //zustand로 투두 상태 가져오기
    const { todos } = useTodoStore();
    return(
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* 매핑해서 화면에 표시 */}
        {todos.map((todo,index) => (
            <TodoItem key={index} todo={todo}/>
        ))}
    </div>
    )
}
export default TodoList