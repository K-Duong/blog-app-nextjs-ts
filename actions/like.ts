'use server'

import { revalidatePath } from "next/cache";
import { toggleLikeBlog } from "@/libs/blogs";

export default async function actionToggleLike(blogId: number) {
  try {
   const result = await toggleLikeBlog(blogId, 1); // assuming userId is 1 for now
   
   if(result) {
    revalidatePath('/blogs');
   }
  }catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}