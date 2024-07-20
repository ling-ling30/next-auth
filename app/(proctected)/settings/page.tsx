"use client";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useSession, signOut } from "next-auth/react";
import React, { useTransition } from "react";

type Props = {};

export default function Page({}: Props) {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const onClickSignout = () => {
    signOut();
  };
  const updateName = () => {
    startTransition(() => {
      settings({
        name: "Test",
      }).then(() => {
        update();
      });
    });
  };
  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙ Settings</p>
      </CardHeader>
      <Button disabled={isPending} onClick={updateName}>
        Update name
      </Button>
    </Card>
  );
}
