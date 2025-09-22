"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>{children}</SessionProvider>
// }

export default function Providers({ session, children }: { session: Session |null, children: React.ReactNode }) {
  return <SessionProvider session={session} refetchInterval={60} refetchOnWindowFocus={true}>{children}</SessionProvider>
}