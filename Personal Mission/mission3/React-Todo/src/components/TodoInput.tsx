import Button from "./button"

const TodoInput = ()=>{
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900 opacity-85">
            <Button/>
            <div className="flex flex-col bg-white p-6 rounded gap-2">
                <section>
                    <input className="border rounded border-slate-400  w-80 p-2 outline-none" placeholder="할 일 제목 작성" ></input>
                </section>
                <section>
                    <textarea className="border rounded border-slate-400 w-80 h-40 outline-none p-2 " placeholder="할 일 설명 작성"></textarea>
                </section>
                <section>
                    <select className="border rounded border-slate-400 w-80 p-2 outline-none">
                        <option value="">카테고리 선택</option>
                        <option value="work">업무</option>
                        <option value="personal">개인</option>
                    </select>
                </section>
            </div>
        </div>
    )
}
export default TodoInput