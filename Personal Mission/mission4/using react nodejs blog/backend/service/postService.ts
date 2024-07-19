import Post,{IPost} from "../model/postModel";

class PostService{
    // 게시물 저장
    public async savePost(data:IPost):Promise<IPost|null>{
        const post= new Post(data)
        return await post.save()

    }
}

export default new PostService