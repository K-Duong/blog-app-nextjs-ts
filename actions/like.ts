'use server'
import { revalidatePath } from "next/cache";

import { toggleLikeBlog } from "@/libs/blogs";
import { getCurrentUser } from "@/libs/auth";

export default async function actionToggleLike(blogId: number) {
  const user = await getCurrentUser() 
  try {
   const result = await toggleLikeBlog(blogId, Number(user.id)); 
   console.log('Like toggled, result:', result);
   
   if(result) {
    revalidatePath('/blogs');
   }
  }catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}