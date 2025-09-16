'use client'
import { notFound, redirect } from "next/navigation"
import { useSession } from "next-auth/react";

import { BlogType } from "@/types";
import Button from "@/components/Button"

export function ButtonModifyBlog ({blog}: {blog: BlogType}) {
  const session = useSession();
  // const isAuthor = session?.data?.user?.username === blog.author;
  // console.log("isAuthor:", isAuthor);

   const handleOpenEditor = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log("open editor for blog id:", blogId);
    e.stopPropagation();
    // if(isAuthor) {
      redirect(`/blogs/${blog.id}/edit`);
    // } else {
    //   notFound();
    // }
  };
  return (
    <Button type="button" onClick={handleOpenEditor}> Edit </Button>
  )
}