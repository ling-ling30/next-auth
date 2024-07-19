"use client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export default function LoginButton({ children, mode, asChild }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/auth/login`);
  };
  return (
    <span onClick={onClick} className=" cursor-pointer">
      {children}
    </span>
  );
}
