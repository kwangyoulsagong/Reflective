import {  useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
interface postBody{
    postId:string,
    title:string,
    content:string
}

const usePostMutation=()=>{
    const router=useRouter()
    return useMutation({
        mutationFn: async(body:postBody):Promise<string>=>{
            const response=await fetch("/api/post",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body)
            })
            if(!response.ok){
                throw new Error("네트워크 에러")
            }
            const data=await response.json()
            return data
        },
        onSuccess:(data)=>{
            alert("게시물이 작성 되었습니다.")
            router.back()
        },
        onError:(Error)=>{
            console.error("게시물 작성 실패", Error)
        }
    })
}
export default usePostMutation