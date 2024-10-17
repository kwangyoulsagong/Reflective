import { Request, Response } from "express";
import userService from "../service/userService";
class UserController {
  // 회원가입 컨틀롤러
  public async Register(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.Register(req.body);
      console.log(user);
      res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      // 에러 메시지에 따라 상태 코드 설정
      if (error.message === "모든 필드를 입력해야 합니다.") {
        res.status(400).json({ error: error.message });
      } else if (error.message === "이미 등록된 이메일입니다.") {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "회원가입에 실패 하였습니다." });
      }
    }
  }
  public async Login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    console.log(email);
    try {
      const result = await userService.Login(email, password);
      if (result) {
        res.json(result);
      } else {
        res.status(401).json({ message: "인증 권한 없음" });
      }
    } catch (error: any) {
      console.log(error);
      res.status(401).json({ error: error.message });
    }
  }
}
export default new UserController();
