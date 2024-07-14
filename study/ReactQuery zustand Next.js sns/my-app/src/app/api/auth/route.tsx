import { NextResponse } from "next/server";
//auth api get 메소드
const arr:string[]=[]
export async function GET(req: Request) {
    const uid = arr
    
    return NextResponse.json(uid);
  }

export async function POST(req: Request) {
  const requestBody=await req.json()
    const {email,password}=requestBody
    if(email=="sgky0511@naver.com"&&password=="ky4400")
    return NextResponse.json("광열");
}