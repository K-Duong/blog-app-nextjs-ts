import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { type User, AuthOptions, Session } from "next-auth"

import { ERRORMESSAGES } from "@/constants"
import { getUserByEmail, verifyPw } from "@/libs/users"
import { isValidEmail, isValidPw } from "@/libs/utils"
import { JWT } from "next-auth/jwt"


// TODO: move to options.ts
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, 
  },
  secret: process.env.NEXTAUTH_SECRET,
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
        if (!user) throw new Error(ERRORMESSAGES.notValidCredentials)

        // 3. check password
        const isCorrectPw = await verifyPw(password, user.password);
        if (!isCorrectPw) throw new Error(ERRORMESSAGES.notValidCredentials)
        const userData = { id: user.id.toString(), email: user.email, username: user.username };
        // console.log("-------userData:", userData);

        return userData
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({token, user}: {token: JWT, user?: User}) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      };
      return token;
    },

    async session ({session, token} : {session: Session, token: JWT}) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.username= token.username as string;
      };
      console.log("session callback session:", session);
      return session;
    }
  
  }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }