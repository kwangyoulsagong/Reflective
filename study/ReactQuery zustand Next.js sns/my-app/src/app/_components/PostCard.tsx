const PostCard = ({ postId, nickname, title,imageUrl, content }:any) => {
    return (
        <div className="max-w-sm rounded w-80 overflow-hidden shadow-lg mx-auto mt-4 bg-white">
            <div className="flex items-center px-6 py-4">
                <img className="w-10 h-10 rounded-full mr-4" src={`https://avatars.githubusercontent.com/u/61825101?v=4`} alt={nickname} />
                <div className="text-sm">
                    <p className="text-gray-900 leading-none">{nickname}</p>
                    <p className="text-gray-600">@{nickname}</p>
                </div>
            </div>
            <img className="w-full" src={imageUrl} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{content}</p>
            </div>
        </div>
    );
};

export default PostCard;