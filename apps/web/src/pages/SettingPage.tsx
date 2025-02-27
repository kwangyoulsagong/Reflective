import Setting from "..//features/Setting/ui/Setting";
import Header from "../shared/Header/Header";

const SettingPage = () => {
  return (
    <section className="flex flex-col  items-center h-screen gap-10">
      <Header />
      <Setting />
    </section>
  );
};
export default SettingPage;
