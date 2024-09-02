import WriteMenu from "../components/WriteMenu";

const Write = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <section className="flex flex-col  w-[1300px] h-[800px] border 1 ">
        <input
          placeholder="제목을 입력해주세요"
          className="h-[80px] text-[37px] outline-none"
        ></input>
        <WriteMenu />
      </section>
    </div>
  );
};
export default Write;
