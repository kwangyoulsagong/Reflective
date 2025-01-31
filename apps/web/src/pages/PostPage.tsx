import { usePost_idStore } from "../app/provider/post_idProvider";
import Comments from "../components/Comments/Comments";
import PostView from "../features/Post/ui/Post/Post";

import usePostDetailQuery from "../hooks/api/usePostDetailQuery";

import Header from "../shared/Header/Header";
const PostPage = () => {
  const { post_id } = usePost_idStore();
  const { data, isLoading, error } = usePostDetailQuery(post_id);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[full] ">
        <Header />
        <PostView {...data} />
        <Comments />
        <footer className="h-[300px]"></footer>
      </div>
    </div>
  );
};
export default PostPage;
