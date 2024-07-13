import { NextResponse } from "next/server";
//auth api get 메소드
const arr:any=[]
export async function GET(req: Request) {
    const uid = arr
    
    return NextResponse.json(uid);
  }

export async function POST(req: Request) {
  const requestBody=await req.json()
    const {email,password}=requestBody
    return new Response();
}