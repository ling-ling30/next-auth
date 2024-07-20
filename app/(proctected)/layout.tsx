import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "./_components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <main className="flex items-center justify-center w-full h-screen flex-col bg-gradient-to-tr from-violet-200 to-pink-200">
        <Navbar />
        {children}
      </main>
    </SessionProvider>
  );
}
