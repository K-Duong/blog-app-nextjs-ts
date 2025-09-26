import { BlogType } from "@/types";
import { getAllBlogs } from "@/libs/blogs";
import { getCurrentUser } from "@/libs/auth";
import { BlogsProvider } from "@/components/context/blogsContext";
import { redirect } from "next/navigation";

export default async function BlogsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const blogs = (await getAllBlogs(Number(user.id))) as BlogType[];
  return (
    <div>
      <BlogsProvider blogs={blogs}>
        {children}
        {/* Modal slot */}
        {modal}
      </BlogsProvider>
    </div>
  );
}
