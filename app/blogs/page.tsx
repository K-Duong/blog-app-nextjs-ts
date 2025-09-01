import { BlogType } from "@/constants/types";
import { getAllBlogs } from "@/libs/blogs"

import Blogs from "@/components/Blogs";  

export default async function BlogsPage(){
  const blogs = await getAllBlogs() as BlogType[];
  // console.log("Blogs:", blogs)
  return (
    <div>
      <h1>All posts by all users</h1>
      <Blogs blogs={blogs} />
    
    </div>
  )
}