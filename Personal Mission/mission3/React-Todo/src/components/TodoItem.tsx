import { useTodoStore } from "../provider/TodoProvider";
import Button from "./button";

// 인터페이스 정의
interface Todo {
  id: number;
  title: string;
  content: string;
  category: string;
  completed:boolean

}
interface todoType{
  todo:Todo
}

const TodoItem=({todo}:todoType)=>{
    const {deleteTodo,completeTodo}=useTodoStore()
    // 투두 카드 삭제
    const handleDelete=()=>{
        deleteTodo(todo.id)
    }
    // 투두 카드 완료 
    const handleCompleteToggle = () => {
        completeTodo(todo.id);
      };
     const categoryClasses: Record<string, string> = {
      업무: "bg-[var(--category-color-업무)] text-[var(--category-text-color-업무)]",
      개인: "bg-[var(--category-color-개인)] text-[var(--category-text-color-개인)]",
      자유: "bg-[var(--category-color-자유)] text-[var(--category-text-color-자유)]",
      운동: "bg-[var(--category-color-운동)] text-[var(--category-text-color-운동)]"
      };
    return(
        // todo 체크시 색상 흐리게, 텍스트 줄 그음 표시
        <div className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-40 h-60 overflow-hidden gap-2 ${
            todo.completed ? "bg-gray-200 opacity-75" : "bg-white"
          } ${todo.completed ? "opacity-50 line-through" : ""}`}>
                <h3 className="font-[var(--bold-lg)] text-xl mb-2  w-full text-left">{todo.title}</h3>
                <p className="text-gray-700 mb-4 overflow-hidden text-ellipsis w-full h-20">{todo.content}</p>
                <span className={`text-sm ${categoryClasses[todo.category]} py-1 px-2 rounded`}>{todo.category}</span>
                <div className="text-red-600 hover:bg-red-100 hover:text-red-800 rounded-full p-1 transition duration-300 ">
                    <Button onClick={handleDelete}>삭제</Button>
                </div>
                <div className="mt-auto flex items-center justify-between w-full">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500"
            checked={todo.completed}
            onChange={handleCompleteToggle}
          />
          <span className="ml-2 text-sm">완료</span>
        </label>
      </div>
           </div>
    )
}
export default TodoItem