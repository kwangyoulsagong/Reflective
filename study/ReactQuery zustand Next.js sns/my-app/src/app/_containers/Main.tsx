"use client"

import LoginInput from "../_components/LoginInput"

export default function Main(){
    return(
        // 메인 화면
        <main className="flex">
             <div className="hidden md:block">
                    <img src="https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk" alt="Instagram" className="max-w-xs" />
            </div>
             <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg">
             <h1 className="text-4xl font-bold mb-4">Kwanggram</h1>
                <LoginInput/>
             </div>
        </main>
    )
}