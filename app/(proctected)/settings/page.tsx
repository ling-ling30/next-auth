"use client";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession, signOut } from "next-auth/react";
import React, { useTransition } from "react";
import SettingsForm from "./_components/SettingsForm";

type Props = {};

export default function Page({}: Props) {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const onClickSignout = () => {
    signOut();
  };

  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙ Settings</p>
      </CardHeader>
      <CardContent>
        <SettingsForm />
      </CardContent>
    </Card>
  );
}
