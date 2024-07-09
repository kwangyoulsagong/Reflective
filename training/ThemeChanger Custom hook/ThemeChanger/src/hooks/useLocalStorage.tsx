import { useEffect, useState } from "react"

const useLocalStorage=(key:string, initialValue:any)=>{
    //초기값 설정하는 useState
    const [store, setStore]=useState(()=>{
        try{
            // 로컬 스토리지 가져오기
            const item=window.localStorage.getItem(key)
            return item? JSON.parse(item): initialValue
        }
        catch(error){
            console.error(error)
            return initialValue
        }
    })

    // 값 업데이트 될 때 로컬 스토리지 저장
    useEffect(()=>{
        try{
            window.localStorage.setItem(key,JSON.stringify(store))
        }
        catch(error){
            console.error(error)
        }
    },[key,store])

    return [store,setStore]
}
export default useLocalStorage