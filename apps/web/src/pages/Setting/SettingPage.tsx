import { Suspense } from "react";
import Setting from "../../features/Setting/ui/Setting";
import Header from "../../shared/Header/Header";
import SettingSkeleton from "./SettingPageSkeleton";

const SettingPage = () => {
  return (
    <section className="flex flex-col  items-center h-screen gap-10">
      <Suspense fallback={<SettingSkeleton />}>
        <Header />
        <Setting />
      </Suspense>
    </section>
  );
};
export default SettingPage;
