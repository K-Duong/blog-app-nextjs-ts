import { getAllBlogs } from "@/libs/blogs"

export default async function BlogsPage(){
  const blogs = await getAllBlogs();
  console.log("Blogs:", blogs)
  return (
    <div>
      Blog page
    </div>
  )
}