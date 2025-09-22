import { NextResponse } from "next/server";

import { sortBlogsByType } from "@/libs/blogs";
import { getCurrentUser } from "@/libs/auth";

export const GET = async (req: Request) => {
  try {
    const user = await getCurrentUser();
    if(!user) return NextResponse.json({ message: "No user found" }, { status: 401 });
    
    const {searchParams} = new URL(req.url);
    const type = searchParams.get('type') || 'createdAt';
    const order = searchParams.get('order') || 'DESC';
    if (req.method !== 'GET') {
      return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
    };
    
    const result = await sortBlogsByType(Number(user.id),type, order);
    // check if failed
    if (!result || result?.length < 1) {
      return NextResponse.json({ message: "Failed to sort." }, { status: 400 });
    } else {
      return NextResponse.json({ data: result, message: 'Sorted blog' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}