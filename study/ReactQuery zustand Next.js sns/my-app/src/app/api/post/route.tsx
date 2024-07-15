import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

interface Post {
    postId: string;
    nickname: string;
    title: string;
    content: string;
}

// Helper function to read JSON data from file
const readDataFromFile = (filePath: string): { posts: Post[] } => {
    if (!fs.existsSync(filePath)) {
        return { posts: [] };
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
};

// Helper function to write JSON data to file
const writeDataToFile = (filePath: string, data: { posts: Post[] }) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function POST(req: Request) {
    try {
        const requestBody = await req.json();
        const { postId, nickname, title, content } = requestBody;

        const newPost: Post = { postId, nickname, title, content };
        const filePath = path.resolve(process.cwd(), 'post.json');

        // Read existing posts
        const postsData = readDataFromFile(filePath);

        // Add new post to the existing posts array
        postsData.posts.push(newPost);

        // Write updated posts data to file
        writeDataToFile(filePath, postsData);

        return NextResponse.json({ message: "Success" });
    } catch (error) {
        console.error("Failed to process request:", error);
        return NextResponse.error();
    }
}

export async function GET(req: Request) {
    try {
        const filePath = path.resolve(process.cwd(), 'post.json');

        // Read posts data from file
        const postsData = readDataFromFile(filePath);

        return NextResponse.json(postsData.posts);
    } catch (error) {
        console.error("Failed to process request:", error);
        return NextResponse.error();
    }
}
