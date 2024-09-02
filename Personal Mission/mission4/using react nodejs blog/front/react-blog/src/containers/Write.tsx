import WriteArea from "../components/WriteArea";
import WriteMenu from "../components/WriteMenu";

const Write = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <section className="flex flex-col  w-[1300px] h-[800px]">
        <input
          placeholder="제목을 입력해주세요"
          className="h-[80px] text-[37px] outline-none"
        ></input>
        <WriteMenu />
        <WriteArea />
        <div className=" mt-5 flex justify-end">
          <button className="  bg-primary rounded-[20px] w-[150px] h-[40px] text-white font-bold">
            작성하기
          </button>
        </div>
      </section>
    </div>
  );
};
export default Write;
