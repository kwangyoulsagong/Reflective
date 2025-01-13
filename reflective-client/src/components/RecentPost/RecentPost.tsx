import { useNavigate } from "react-router-dom";
import { PostType } from "../../types/types";

import { usePost_idStore } from "../../provider/post_idProvider";
import { usePostRouterStore } from "../../provider/postRouterProvider";
import PostCard from "./PostCard";

const RecentPost = ({ data }: { data: PostType[] }) => {
  const navigate = useNavigate();
  const { setPost_id } = usePost_idStore();
  const { setNickname, setTitle } = usePostRouterStore();

  const handlePost = (post_id: string, nickname: string, title: string) => {
    const hyphenatedTitle = title.replace(/\s+/g, "-");
    navigate(`/${nickname}/${hyphenatedTitle}`);
    setPost_id(post_id);
    setNickname(nickname);
    setTitle(hyphenatedTitle);
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 sm:mt-24 lg:mt-32">
      {data.map((post, index) => (
        <PostCard
          key={post.post_id}
          post={post}
          index={index}
          handlePost={handlePost}
        />
      ))}
    </section>
  );
};

export default RecentPost;
