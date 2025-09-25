import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]/options";
import Navbar from "@/components/navbar";
import Providers from "./Providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My blogs",
  description: "Welcome to my blogs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <Providers> */}
        <Providers session={session}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
