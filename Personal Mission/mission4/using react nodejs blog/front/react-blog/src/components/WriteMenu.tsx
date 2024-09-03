import image from "../assets/image.png";
import { WriteMenuProps } from "../types/types";

const WriteMenu = ({ onCommand }: WriteMenuProps) => {
  return (
    <div className="border-t-2 border-primary h-[70px] flex justify-center items-center gap-3">
      {/* Header buttons */}
      <button
        className="border border-primary rounded-[5px] w-[40px] h-[40px] text-[12px] text-primary"
        onClick={() => onCommand("<header1>", "</header1>")}
      >{`<h1>`}</button>
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[12px] text-[#D4D4D4]"
        onClick={() => onCommand("<header2>", "</header2>")}
      >{`<h2>`}</button>
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[12px] text-[#D4D4D4]"
        onClick={() => onCommand("<header3>", "</header3>")}
      >{`<h3>`}</button>
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[12px] text-[#D4D4D4]"
        onClick={() => onCommand("<header4>", "</header4>")}
      >{`<h4>`}</button>
      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>

      {/* Text style buttons */}
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]"
        onClick={() => onCommand("<strong>", "</strong>")}
      >
        B
      </button>
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] italic text-[#D4D4D4]"
        onClick={() => onCommand("<i>", "</i>")}
      >
        I
      </button>
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]"
        onClick={() => onCommand("<u>", "</u>")}
      >
        U
      </button>

      {/* List buttons */}
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]"
        onClick={() => onCommand("<ol><li>", "</li></ol>")}
      >
        OL
      </button>
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]"
        onClick={() => onCommand("<ul><li>", "</li></ul>")}
      >
        UL
      </button>
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]"
        onClick={() => onCommand("<li>", "</li>")}
      >
        LI
      </button>

      <div className="h-[40px] w-[1px] bg-[#D4D4D4]"></div>

      {/* Other buttons */}
      <div className="flex justify-center items-center cursor-pointer rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]">
        <img src={image} alt="image" />
      </div>
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[20px] text-[#D4D4D4]"
        onClick={() => onCommand("<pre><code>", "</code></pre>")}
      >{`<>`}</button>
      <button
        className="border border-[#D4D4D4] rounded-[5px] w-[40px] h-[40px] text-[18px] text-[#D4D4D4]"
        onClick={() => onCommand("<a href=''>", "</a>")}
      >
        link
      </button>
    </div>
  );
};

export default WriteMenu;
