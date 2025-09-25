import { redirect } from "next/navigation";

import { getCurrentUser } from "@/libs/auth";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  redirect("/blogs");
}
