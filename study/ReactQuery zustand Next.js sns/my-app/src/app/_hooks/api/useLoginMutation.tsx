import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface LoginBody{
    email:string;
    password:string
}

const useLoginMutation = () =>{
    const router=useRouter()
    return useMutation({
        mutationFn: async(body:LoginBody):Promise<string>=>{
            const response = await fetch("/api/auth",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(body)
            })

            if(!response.ok){
                throw new Error("네트워크 에러")
            }

            const data = await response.json()
            return data;
        },

        onSuccess: (data:string) =>{
            //서버 응답 처리
            localStorage.setItem("nickname", data);
            router.push(`/${data}/home`)
        },
        onError:(error)=>{
            console.error("로그인 실패", error);
        }
    })
}
export default useLoginMutation