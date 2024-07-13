"use client"

import { useState,useReducer } from "react"
import { ActionType, authReducer, initialState } from "../_reducers/authReducer"
import { useMutation,useQueryClient } from "@tanstack/react-query"

// 인터페이스 정의
interface LoginBody{
    email:string
    password:string
}

export default function LoginInput(){

    // 리듀서 정의
    const [state,dispatch]=useReducer(authReducer,initialState)
    const queryClient = useQueryClient();
    // 이메일 상태 업데이트 함수
    const handleEmail=(e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch({type:ActionType.SET_EMAIL, payload:e.target.value})
    }

    // 비밀번호 상태 업데이트 함수
    const handlePaswword=(e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch({type:ActionType.SET_PASSWORD, payload:e.target.value})
    }

    // 로그인 요청 함수
    const handleSubmit=()=>{
        const body={
            email:state.email,
            password:state.password
        }
        mutation.mutate(body)
    }
    // useMutation 훅을 사용하여 mutation 함수 정의
    const mutation = useMutation({
        mutationFn: async (body: LoginBody): Promise<Response> => {
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
      
          if (!response.ok) {
            throw new Error('네트워크 에러');
          }
          return response;
        }
      });


    return(
        <div className="flex flex-col gap-2">
            <input type="text" className="text-sm border p-2 rounded border-slate-200" value={state.email} onChange={handleEmail} placeholder="이메일을 입력해주세요"></input>
            <input type="password" className="p-2 text-sm border rounded border-slate-200" value={state.password} onChange={handlePaswword} placeholder="비밀번호 입력해주세요"></input>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded font-semibold" onClick={handleSubmit}>로그인</button>
        </div>
    )
}