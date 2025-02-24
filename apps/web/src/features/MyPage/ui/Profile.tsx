import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useGetProfile from "../libs/hooks/useGetProfile";
import logo from "../../../assets/logo.svg";
const Profile = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProfile();
  if (isLoading) {
    return <div className="w-full max-w-6xl mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        Error loading data. Please try again.
      </div>
    );
  }

  return (
    <header className="mt-10">
      <section className="flex items-center justify-between">
        <article className="flex items-center space-x-4">
          <img
            src={data?.myProfile.image_url || logo}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{data?.myProfile.nickname}</h1>
            <p className="text-gray-600">
              {data?.myFavorites.followers} 팔로워 ·{" "}
              {data?.myFavorites.following} 팔로잉
            </p>
          </div>
        </article>
        <button
          onClick={() => navigate("/settings")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
        >
          <Settings size={20} className="mr-2" />
          프로필 수정
        </button>
      </section>
    </header>
  );
};
export default Profile;
