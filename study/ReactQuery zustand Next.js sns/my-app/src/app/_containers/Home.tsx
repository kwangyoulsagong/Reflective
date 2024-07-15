'use client'
import PostCard from "../_components/PostCard";
import usePostQuery from "../_hooks/api/usePostQuery";

export default function Home() {
    const { data, isLoading, error } = usePostQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="overflow-y-scroll "style={{ height: "90vh"}}>
            <h1 className="text-3xl font-bold text-center my-4">Instagram Feed</h1>
            <div className="flex flex-col items-center " >
                {data?.map((post) => (
                    <PostCard
                        key={post}
                        postId={post.postId}
                        nickname={post.nickname}
                        title={post.title}
                        imageUrl={post.imageUrl}
                        content={post.content}
                    />
                ))}
            </div>
        </div>
    );
}
