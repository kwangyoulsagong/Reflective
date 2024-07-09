import { useEffect, useRef } from "react";

// 메모리 누수를 최적화 하기 위해 useInterval로 지정된 시간에 콜백으로 함수 실행
const useInterval=(callback: ()=>void, delay:number | null)=>{
    const saveCallback=useRef(callback)

    //최신 콜백 저장
    useEffect(()=>{
        saveCallback.current=callback
    },[callback])

    //인터벌 설정
    useEffect(()=>{
        if( delay !=null){
            const tick=()=>{
                saveCallback.current();
            }
            const id=setInterval(tick,delay)
            return ()=>clearInterval(id)
        }
    },[delay])
}
export default useInterval