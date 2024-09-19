import MainHeader from "../components/MainHeader";
import PostView from "../components/PostView";

const PostDetail = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[1920px] ">
        <MainHeader />
        <PostView />
      </div>
    </div>
  );
};
export default PostDetail;
