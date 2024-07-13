"use client"
import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "../_containers/Main";
export default function MainPage(){
    //리액트 쿼리 적용
    const queryClient = new QueryClient();
    return(
        <QueryClientProvider client={queryClient}>
            <Main/>
        </QueryClientProvider>
        
    )
}