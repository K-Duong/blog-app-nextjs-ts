"use client";
import { redirect } from "next/navigation";
import { CiEdit } from "react-icons/ci";

import Button from "@/components/buttons/ButtonWrapper";
import IconProvider from "@/components/IconProvider";

export default function ButtonModifyBlog({ blogId }: { blogId: number }) {
  const handleOpenEditor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    redirect(`/blogs/${blogId}/edit`);
  };
  return (
    <Button type="button" onClick={handleOpenEditor}>
      <IconProvider>
        <CiEdit />
      </IconProvider>{" "}
      Edit{" "}
    </Button>
  );
}
