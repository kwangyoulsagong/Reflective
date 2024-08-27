import iphonex from "../assets/IPhoneX.png";
import iphone14pro from "../assets/iphone14pro.svg";
const StartBackground = () => {
  return (
    <section className="flex justify-center items-center  h-100 border-0.5 border-black">
      <img className="w-72 relative left-32" src={iphonex} alt="iphonex"></img>
      <img className="w-72" src={iphone14pro} alt="iphone14pro"></img>
    </section>
  );
};
export default StartBackground;
