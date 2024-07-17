import User,{IUser} from "../model/userModel";

class UserService {

    //회원가입 서비스 
    public async Register(data: IUser): Promise<IUser> {
        const user = new User(data);
        return await user.save();
    }

}

export default new UserService();