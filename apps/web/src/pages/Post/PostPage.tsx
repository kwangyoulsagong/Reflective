import Header from "../../shared/Header/Header";
import React, { Suspense } from "react";
import PostPageSkeleton from "./PostPageSkeleton/PostPageSkeleton";
const Comments = React.lazy(
  () => import("../../features/Comments/ui/Comments")
);
const PostView = React.lazy(() => import("../../features/Post/ui/Post/Post"));
const PostPage = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[full] ">
        <Suspense fallback={<PostPageSkeleton />}>
          <Header />
          <PostView />
          <Comments />
        </Suspense>
        <footer className="h-[300px]"></footer>
      </div>
    </div>
  );
};
export default PostPage;
