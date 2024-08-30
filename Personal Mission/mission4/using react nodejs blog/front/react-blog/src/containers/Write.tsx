const Write = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col  w-[1300px] h-[800px] border 1 ">
        <input
          placeholder="제목을 입력해주세요"
          className="h-[80px] text-[37px] outline-none"
        ></input>
        <div className="border border-primary h-[70px] flex justify-center items-center">
          <button className="border-primary rounded-[20px] w-[35px] h-[35px]"></button>
        </div>
      </div>
    </div>
  );
};
export default Write;
