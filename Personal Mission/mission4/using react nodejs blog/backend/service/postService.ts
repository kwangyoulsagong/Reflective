import Post,{IPost} from "../model/postModel";

class PostService{
    public async savePost(data:IPost):Promise<IPost|null>{
        const post= new Post(data)
        return await post.save()

    }
}

export default new PostService