import { NextResponse } from "next/server";

import { deleteBlog } from "@/libs/blogs";

export const DELETE = async (req: Request) => {
  try {
    if (req.method !== 'DELETE') {
      return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
    }
    const payload = await req.json();
    const result = await deleteBlog(payload.blogId);
    // check if failed
    if (result.changes === 0) {
      return NextResponse.json({ message: "Failed to delete blog." }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}