import Home from "@/app/_components/Home";
import Navigation from "@/app/_components/Navigation";
import { ReactNode } from "react";
type Props ={children:ReactNode}
export default  function Layout({children}:Props){
    return(
        // unaccess 레이아웃
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-grow">
                {/* 네비게이션 바 */}
                <nav className="w-80 min-h-screen border-r border-gray-400 flex flex-col px-">
                    <Navigation/>
                </nav>
                {/* 메인 화면 */}
                <main className="flex-grow p-4">
                    {children}
                </main>
                {/* 푸터  */}
              
            
            </div>
            <footer className="w-full border-t border-gray-400 p-4 text-center bg-gray-100">
                    &copy; 2024 Kwanggram. All rights reserved.
            </footer>
        </div>
    )
}