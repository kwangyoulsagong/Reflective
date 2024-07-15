import { useQuery } from "@tanstack/react-query"

interface Post{
    postId:string,
    nickname:string,
    title:string,
    imageUrl:string
    content:string
}

const fetchPosts=async():Promise<Post[]>=>{
    const response = await fetch('/api/post'); // 실제 API 경로에 맞게 수정
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const usePostQuery = () => {
    return useQuery<Post[],Error>({
        queryKey:['posts'],
        queryFn:fetchPosts
    })
       
};

export default usePostQuery