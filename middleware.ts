import { PATHS } from "@/constants";
import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: PATHS.LOGIN.path, // redirect here if not authenticated
  },
});
export const config = {
  matcher: [`/blogs/:path*`, "/new-blog/:path*"],
}