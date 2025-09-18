"use client";
import Button from "../ButtonWrapper";
import { notFound, redirect } from "next/navigation";
export default function ButtonDeleteBlog({ blogId }: { blogId: number }) {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // fetch to delete
    const result = await fetch(`/api/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId }),
    });
    if(result.ok) {
      // redirect to /blogs
      console.log("deleted blog id:", blogId);
      redirect('/blogs');
    } else{
      notFound()
    }
    
  };
  return (
    <Button type="button" onClick={handleDelete}>
      {" "}
      Delete{" "}
    </Button>
  );
}
