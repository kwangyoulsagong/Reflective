import React, { useState } from "react";

const NameInput=({onCLose}:any)=>{
    const [input, setInput]=useState<string>("")
    const handleSubmit=()=>{
        console.log(input)
    }
    return(
     <div className="fixed flex inset-0 items-center justify-center bg-gray-800 opacity-95">
        <div className=" bg-white p-6 rounded shadow-lg " >
            <input
                type="text"
                value={input}
                onChange={(e:any)=>setInput(e.target.value)}
                placeholder="이름을 입력하세요"
                className="p-2 border rounded w-full mb-4"
            />
            <div className="flex justify-end">
                <button
                    onClick={onCLose}
                    className="p-2 bg-gray-300 text-black rounded mr-2"
                >
                    취소
                </button>
                <button
                    onClick={handleSubmit}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    확인
                </button>
            </div>
        </div>
     </div>
    )
}
export default NameInput