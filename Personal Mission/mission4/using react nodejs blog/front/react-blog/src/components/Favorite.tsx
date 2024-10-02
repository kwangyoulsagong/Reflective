import React, { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Favorite = () => {
  const FavoriteRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleOpen = () => {
    if (FavoriteRef.current) {
      setIsOpen(!isOpen);
      FavoriteRef.current.style.transition = "0.5s";
      if (isOpen) {
        FavoriteRef.current.style.height = "300px";
      } else {
        FavoriteRef.current.style.height = "0px";
      }
    }
  };

  return (
    <div className=" fixed flex flex-col justify-center items-center w-full z-50">
      <div
        ref={FavoriteRef}
        className="relative w-[100%] h-[0px]  bg-slate-200"
      ></div>
      <button
        onClick={handleOpen}
        aria-label="Scroll down"
        className=" rounded-b-full w-[50px] flex justify-center items-center text-white bg-slate-200 hover:bg-primary"
      >
        {isOpen ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
      </button>
    </div>
  );
};

export default Favorite;
