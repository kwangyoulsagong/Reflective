import Comments from "../components/Comments";
import Header from "../components/common/Header/Header";
import PostView from "../components/PostView";
import usePostDetailQuery from "../hooks/api/usePostDetailQuery";
import { usePost_idStore } from "../provider/post_idProvider";
const PostDetail = () => {
  const { post_id } = usePost_idStore();
  const { data, isLoading, error } = usePostDetailQuery(post_id);
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[1920px] ">
        <Header />
        <PostView {...data} />
        <Comments />
        <footer className="h-[300px]"></footer>
      </div>
    </div>
  );
};
export default PostDetail;
