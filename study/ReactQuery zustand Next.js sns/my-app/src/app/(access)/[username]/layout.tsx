"use client"
import Navigation from "@/app/_components/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
type Props ={children:ReactNode, modal:ReactNode}
export default  function Layout({children,modal}:Props){
    //리액트 쿼리 적용
    const queryClient = new QueryClient();
    return(
        // unaccess 레이아웃
        <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen flex-col">
            {modal}
            <div className="flex flex-grow">
                {/* 네비게이션 바 */}
                <nav className="w-80 border-r border-gray-400 flex flex-col px-4">
                    <Navigation/>
                </nav>
                {/* 메인 화면 */}
                <main className="flex-grow p-4">
                    {children}
                </main>
            </div>
             {/* 푸터  */}
            <footer className="w-full border-t border-gray-400 p-4 text-center bg-gray-100">
                    &copy; 2024 Kwanggram. All rights reserved.
            </footer>
        </div>
        </QueryClientProvider>
    )
}