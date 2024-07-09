const Theme=({onCLose}:any)=>{
    return(
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg p-6 grid grid-cols-4 gap-4">
            <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 focus:outline-none">Button 1</button>
            <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 focus:outline-none">Button 2</button>
            <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 focus:outline-none">Button 3</button>
            <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 focus:outline-none">Button 4</button>
            <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 focus:outline-none">Button 5</button>
            <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 focus:outline-none">Button 6</button>
            <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 focus:outline-none">Button 7</button>
            <button className="border border-gray-300 p-3 rounded-md hover:bg-gray-100 focus:outline-none">Button 8</button>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none" onClick={onCLose}>닫기</button>
    </div>
      
    )
}
export default Theme