import image from "../assets/image.png";
const WriteMenu = () => {
  return (
    <div className="border border-primary h-[70px] flex justify-center items-center gap-3">
      <button className="border border-primary rounded-[5px] w-[40px] h-[40px] text-[12px] text-primary">
        {`<h1>`}
      </button>
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[12px] text-[#D4D4D4]">
        {`<h2>`}
      </button>
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[12px] text-[#D4D4D4]">
        {`<h3>`}
      </button>
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[12px] text-[#D4D4D4]">
        {`<h4>`}
      </button>
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div> {/* 세로 경계선 */}
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]">
        B
      </button>
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] italic text-[#D4D4D4]">
        I
      </button>
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px]  text-[#D4D4D4]">
        C
      </button>
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px]  text-[#D4D4D4]">
        OL
      </button>
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px]  text-[#D4D4D4]">
        UL
      </button>
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div> {/* 세로 경계선 */}
      <div className="flex justify-center items-center cursor-pointer rounded-[5px] w-[40px] h-[40px] text-[20px]  text-[#D4D4D4]">
        <img src={image} alt="image" />
      </div>
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]">
        {`<>`}
      </button>
      <button className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[18px]  text-[#D4D4D4]">
        link
      </button>
    </div>
  );
};
export default WriteMenu;
