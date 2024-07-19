import { Button } from "@/components/ui/button";
import React from "react";

import { Poppins } from "next/font/google";
import LoginButton from "@/components/LoginButton";
import { cn } from "@/lib/utils";

type Props = {};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Page({}: Props) {
  return (
    <main className="bg-background min-h-screen flex justify-center items-center">
      <section
        className={cn(
          "bg-card flex justify-center flex-col items-center font-semibold p-10 space-y-2"
        )}
      >
        <h1 className="text-center text-5xl">🔐 Auth Service</h1>
        <p className="">Simple Demonstration for NextAuth</p>
        <LoginButton>
          <Button>Sign In</Button>
        </LoginButton>
      </section>
    </main>
  );
}
