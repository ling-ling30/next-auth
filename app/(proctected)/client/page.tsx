"use client";
import { UserInfo } from "@/components/user-info";
import UseCurrentUser from "@/hooks/use-current-user";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  const user = UseCurrentUser();
  return <UserInfo label="👤 Client Component" user={user} />;
}
