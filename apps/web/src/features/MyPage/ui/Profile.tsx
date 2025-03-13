import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/profile.png";
import { useState } from "react";
import FavoritesModal from "./Modal/FavoritesModal";
interface ProfileProps {
  profileData: {
    myFavorites: {
      followers: number;
      following: number;
    };
    myProfile: {
      email: string;
      image_url: string;
      nickname: string;
      phone_number: string;
    };
  };
}
const Profile = ({ profileData }: ProfileProps) => {
  console.log(profileData);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");

  const handleFollowClick = (tab: string) => {
    setActiveTab(tab);
    setModalOpen(true);
  };

  return (
    <header className="mt-10">
      <section className="flex items-center justify-between">
        <article className="flex items-center space-x-4">
          <img
            src={profileData?.myProfile.image_url || logo}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {profileData?.myProfile.nickname}
            </h1>
            <p className="text-gray-600">
              <button
                onClick={() => handleFollowClick("followers")}
                className="hover:underline"
              >
                {profileData?.myFavorites.followers} 팔로워
              </button>{" "}
              ·{" "}
              <button
                onClick={() => handleFollowClick("following")}
                className="hover:underline"
              >
                {profileData?.myFavorites.following} 팔로잉
              </button>
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
      <FavoritesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={activeTab}
        data={profileData}
      />
    </header>
  );
};
export default Profile;
