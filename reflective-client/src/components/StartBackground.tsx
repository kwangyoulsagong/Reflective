import iphonex from "../assets/IPhoneX.png";
import iphone14pro from "../assets/iphone14pro.svg";
const StartBackground = () => {
  return (
    <section className="flex justify-center ml-7 items-center w-[420px] h-100 hide-on-small">
      <img className=" w-72  " src={iphonex} alt="iphonex"></img>
      <img
        className=" relative right-32 w-72"
        src={iphone14pro}
        alt="iphone14pro"
      ></img>
    </section>
  );
};
export default StartBackground;
