import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { type User, AuthOptions } from "next-auth"

import { errorMessages } from "@/constants"
import { getUserByEmail, verifyPw } from "@/libs/users"
import { isValidEmail, isValidPw } from "@/libs/utils"



const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<User | null> {
        // console.log("credentials for authorize:", credentials)
        if (!credentials) return null;

        const email = credentials.email;
        const password = credentials.password;

        // 1- validation my credentials
        if (!isValidEmail(email) || !isValidPw(password)) {
          throw new Error("Invalid credentials.");
        };

        // 2- getUserByEmail
        const user = await getUserByEmail(email);
        if (!user) throw new Error(errorMessages.notValidCredentials)

        // 3. check password
        const isCorrectPw = await verifyPw(password, user.password);
        if (!isCorrectPw) throw new Error(errorMessages.notValidCredentials)
        const userData = { ...user, id: user.id.toString() };
        console.log("userData:", userData);
        
        return userData
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },

};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }