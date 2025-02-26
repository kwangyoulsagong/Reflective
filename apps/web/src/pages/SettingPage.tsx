import Setting from "..//features/Setting/ui/Setting";
import Header from "../shared/Header/Header";

const SettingPage = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <Header />
      <Setting />
    </section>
  );
};
export default SettingPage;
