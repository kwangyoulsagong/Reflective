import logo from "../../assets/profile.png";
export const CircleImage = ({ image }: { image?: string | undefined }) => {
  return (
    <circle className="w-[50px] sm:w-[55px] md:w-[60px] h-[50px] sm:h-[55px] md:h-[60px] rounded-full overflow-hidden">
      <img
        src={image ?? logo}
        alt="profile"
        className="w-full h-full object-cover"
      />
    </circle>
  );
};
