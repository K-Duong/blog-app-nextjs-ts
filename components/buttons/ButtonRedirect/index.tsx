"use client"
import { redirect } from "next/navigation";
import Button from "../ButtonWrapper";

export default function ButtonRedirectNewBlog({children, path} : {children: React.ReactNode, path: string}) {
   const handleRedirect = () => {
      redirect(path);
    };
  return <Button type="button"  onClick={handleRedirect}>
          {children}
        </Button>
}