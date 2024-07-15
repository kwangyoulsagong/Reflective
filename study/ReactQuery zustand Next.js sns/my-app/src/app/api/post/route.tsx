import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
            const requestBody = await req.json();
            const { postId, title, content } = requestBody;
            console.log(postId, title, content);

            const postData = { postId, title, content };
            const filePath = path.resolve(process.cwd(), 'post.json');

            // 데이터를 JSON 형식으로 파일에 저장
            fs.writeFileSync(filePath, JSON.stringify({ post: postData }));

            return NextResponse.json({ message: "Success" });
        } catch (error) {
            console.error("Failed to process request:", error);
            return NextResponse.error();
        }
    } else {
        console.error("405 에러 ")
    }
  }