import logo from "../assets/logo.svg";
import notification from "../assets/notification.svg";
const Home = () => {
  return (
    <div className="flex justify-center">
      <header className="flex justify-between items-center w-full px-4">
        <img src={logo} alt="logo" className="w-20" />
        <nav className="flex items-center">
          <button
            className="w-10 h-10 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: `url(${notification})` }}
          />
        </nav>
      </header>
    </div>
  );
};
export default Home;
