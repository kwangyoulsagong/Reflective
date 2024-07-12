"use client"
export default function LoginInput(){
    return(
        <div className="flex flex-col gap-2">
            <input type="text" className="text-sm border p-2 rounded border-slate-200" placeholder="이메일을 입력해주세요"></input>
            <input type="password" className="p-2 text-sm border rounded border-slate-200" placeholder="비밀번호 입력해주세요"></input>
        </div>
    )
}