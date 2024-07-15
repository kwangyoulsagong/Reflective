import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUser } from 'react-icons/fa';
export default function Navigation(){
    return(
        <>
            <div className="text-2xl font-bold text-gray-800 mb-8">Kwanggram</div>
            <ul className="flex flex-col space-y-6">
                <li className="flex items-center space-x-4">
                    <FaHome size={24} className="text-gray-800" />
                    <a href="#home" className="text-gray-800 text-lg hover:text-gray-500">Home</a>
                </li>
                <li className="flex items-center space-x-4">
                    <FaSearch size={24} className="text-gray-800" />
                    <a href="#search" className="text-gray-800 text-lg hover:text-gray-500">Search</a>
                </li>
                <li className="flex items-center space-x-4">
                    <FaPlusSquare size={24} className="text-gray-800" />
                    <a href="/add" className="text-gray-800 text-lg hover:text-gray-500">Add</a>
                </li>
                <li className="flex items-center space-x-4">
                    <FaHeart size={24} className="text-gray-800" />
                    <a href="#notifications" className="text-gray-800 text-lg hover:text-gray-500">Notifications</a>
                </li>
                <li className="flex items-center space-x-4">
                    <FaUser size={24} className="text-gray-800" />
                    <a href="#profile" className="text-gray-800 text-lg hover:text-gray-500">Profile</a>
                </li>
            </ul>
        </>
    )
}