import Post,{IPost} from "../model/postModel";

class PostService{
    // 게시물 저장
    public async savePost(user_id:string,data:IPost):Promise<IPost|null>{
        const body={
            user_id:user_id,
            title:data.title,
            contents:data.contents,
            like_count:data.like_count
        }
        const post= new Post(body)
        return await post.save()

    }
}

export default new PostService