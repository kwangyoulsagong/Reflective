"use client"
import { useRouter } from 'next/navigation';
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUser } from 'react-icons/fa';
export default function Navigation(){
    const router=useRouter()

    //게시물 작성 모달 보기
    const handleAddPost=()=>{
        const nickname=localStorage.getItem("nickname")
        router.push(`/${nickname}/addpost`)
    }
    return(
        <div className='mt-10'>
            <div className="text-2xl font-bold text-gray-800 mb-8">Kwanggram</div>
            <ul className="flex flex-col space-y-6">
                <li className="flex items-center space-x-4">
                    <FaHome size={24} className="text-gray-800" />
                    <a href="#home" className="text-gray-800 text-lg hover:text-gray-500">홈</a>
                </li>
                <li className="flex items-center space-x-4">
                    <FaSearch size={24} className="text-gray-800" />
                    <a href="#search" className="text-gray-800 text-lg hover:text-gray-500">검색</a>
                </li>
                <li className="flex items-center space-x-4" onClick={handleAddPost}>
                    <FaPlusSquare size={24} className="text-gray-800" />
                    <a className="text-gray-800 text-lg hover:text-gray-500">추가</a>
                </li>
                <li className="flex items-center space-x-4">
                    <FaHeart size={24} className="text-gray-800" />
                    <a href="#notifications" className="text-gray-800 text-lg hover:text-gray-500">알림</a>
                </li>
                <li className="flex items-center space-x-4">
                    <FaUser size={24} className="text-gray-800" />
                    <a href="#profile" className="text-gray-800 text-lg hover:text-gray-500">프로필</a>
                </li>
            </ul>
        </div>
    )
}