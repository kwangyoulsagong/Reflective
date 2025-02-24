import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <header className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <img src={} alt="Profile" className="w-20 h-20 rounded-full" /> */}
          <div>
            <h1 className="text-2xl font-bold">hardy</h1>
            <p className="text-gray-600">0 팔로워 · 0 팔로잉</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/settings")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
        >
          <Settings size={20} className="mr-2" />
          프로필 수정
        </button>
      </div>
    </header>
  );
};
export default Profile;
