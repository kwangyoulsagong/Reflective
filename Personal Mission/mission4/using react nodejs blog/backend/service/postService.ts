import Post,{IPost} from "../model/postModel";
import User from "../model/userModel";

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
    // 게시물 조회 
    public async getRecentPost():Promise<IPost[]|null>{
        try{
             // 좋아요가 많은 순으로 정렬된 최신 게시물 3개를 먼저 가져옴
             const topPost=await Post.find().sort({like_count:-1,created_date:-1}).limit(3).exec()
             // 만약 좋아요 수가 0 개인 경우
             const tryCatchTop= topPost.some(post=>post.like_count>0)
             let recentPosts:IPost[]=[]
             if(tryCatchTop){
                //최신순으로 가져옴(top 3 제외)
                recentPosts=await Post.find({_id:{$nin: topPost.map(post=>post._id)}})
                    .sort({created_date:-1})
                    .exec() as IPost[]
             }
             // 좋아요 수가 0개인경우 최신수으로 가져옴
             else{
                recentPosts = await Post.find().sort({created_date:-1}).exec() as IPost[]
             }
            const posts=[...topPost,...recentPosts]     

            // nickname 추가
            const nicknameWithPosts=await Promise.all(posts.map(async (post)=>{
                const user = await User.findOne({user_id:post.user_id})
                if(user){
                    return({...post.toObject(),nickname:user.nickname})
                }
                return post.toObject()
            }))
            return nicknameWithPosts 
        }
        
        catch(error){
            console.error("게시물 조회 에러",error)
            return null
        }
    }
}


export default new PostService