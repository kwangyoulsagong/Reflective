import { useTitleStore } from "../provider/TodoProvider"

const TodoList=()=>{
    const {title}=useTitleStore()
    return(
        <div>
            <ul>
                <li>{title}</li>
            </ul>
        </div>
    )
}
export default TodoList