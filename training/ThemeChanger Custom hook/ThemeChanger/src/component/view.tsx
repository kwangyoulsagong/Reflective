import React, { useCallback, useState } from "react";
import useInterval from "./useInterval";
// 리액트 메모를 사용하여 불필요한 렌더링 최소화
const View=React.memo(()=>{
    const [date,setDate]=useState<Date>(new Date())

    //메모리 누수 해결
    useInterval(()=>{
        setDate(new Date())
    },1000)
    const formatDate=useCallback((date:Date)=>{
        //년도 월 일 시 분 초 12시간 기준으로 객체를 짬
        const options:any={year:'numeric',month:'long',day:'numeric',hour:'numeric',minute:'numeric', second:'numeric',hour12:true}
        return date.toLocaleDateString('ko-KR', options);// 시간으로 나타내는 스트링값으로 전달
    },[])
    return(
        <div className="flex flex-col items-center">
             <h1 className="text-xl mb-3">안녕하세요,</h1>
             <p className="text-lg">{formatDate(date)}</p>
        </div>
    )
})
export default View