'use server'
import { revalidatePath } from "next/cache";

import { toggleLikeBlog } from "@/libs/blogs";
import { getCurrentUserId } from "@/libs/auth";

export default async function actionToggleLike(blogId: number) {
  const userId = await getCurrentUserId() 
  try {
   const result = await toggleLikeBlog(blogId, userId); 
   console.log('Like toggled, result:', result);
   
   if(result) {
    revalidatePath('/blogs');
   }
  }catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}