"use client";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  const session = useSession();
  const onClick = () => {
    signOut();
  };
  return (
    <div>
      {JSON.stringify(session)}
      <form>
        <Button onClick={onClick} type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
