import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found");
  } 
  return session.user
};

