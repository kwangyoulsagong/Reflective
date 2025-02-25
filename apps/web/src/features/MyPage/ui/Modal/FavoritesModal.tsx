import React, { useState } from "react";
import { UserMinus } from "lucide-react";
import useGetFollowers from "../../libs/hooks/useGetFollowers";
import useGetFollowings from "../../libs/hooks/useGetFollowings";
import useDeleteFavoriteMutation from "../../libs/hooks/useDeleteFavoriteMutation";

const FavoritesModal = ({ isOpen, onClose, initialTab, data }: any) => {
  const { mutate: deleteFavoriteMutate } = useDeleteFavoriteMutation();
  const [activeTab, setActiveTab] = useState(initialTab);
  const { data: followersData, isLoading: followersLoading } =
    useGetFollowers();
  const { data: followingsData, isLoading: followingsLoading } =
    useGetFollowings();

  if (!isOpen) return null;

  const handleUnfollow = async (user_id: string) => {
    deleteFavoriteMutate(user_id);
  };

  const renderLoadingState = () => (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">데이터를 불러오는 중...</p>
    </div>
  );

  const renderFollowersList = () => {
    if (followersLoading) return renderLoadingState();
    if (!followersData?.length) {
      return (
        <div className="text-center text-gray-500 py-4">팔로워가 없습니다.</div>
      );
    }

    return (
      <div className="space-y-4">
        {followersData.map((follower: any) => (
          <div
            key={follower.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <img
                src={follower.image_url || "/api/placeholder/40/40"}
                alt={follower.nickname}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">@ {follower.nickname}</p>
              </div>
            </div>
            {follower.isFollowing && (
              <button
                className="text-red-600 hover:text-red-700"
                onClick={() => handleUnfollow(follower.id)}
              >
                <UserMinus size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderFollowingsList = () => {
    if (followingsLoading) return renderLoadingState();
    if (!followingsData?.length) {
      return (
        <div className="text-center text-gray-500 py-4">
          팔로잉하는 사용자가 없습니다.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {followingsData.map((following: any) => (
          <div
            key={following.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <img
                src={following.image_url ?? "null"}
                alt={following.nickname}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">@ {following.nickname}</p>
              </div>
            </div>
            <button
              className="text-red-600 hover:text-red-700"
              onClick={() => handleUnfollow(following.user_id)}
            >
              <UserMinus size={20} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg max-w-md w-full mx-4 z-50">
        <div className="p-6 pb-2">
          <h2 className="text-xl font-semibold text-center">팔로워 · 팔로잉</h2>
        </div>

        <div className="w-full px-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-center font-medium ${
                activeTab === "followers"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("followers")}
            >
              팔로워 {data?.myFavorites.followers}
            </button>
            <button
              className={`flex-1 py-2 text-center font-medium ${
                activeTab === "following"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("following")}
            >
              팔로잉 {data?.myFavorites.following}
            </button>
          </div>
        </div>

        <div className="p-6 pt-4">
          <div className="h-72 overflow-y-auto">
            {activeTab === "followers"
              ? renderFollowersList()
              : renderFollowingsList()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
