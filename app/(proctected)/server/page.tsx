import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";
import React from "react";

type Props = {};

export default async function Page({}: Props) {
  const user = await currentUser();
  return <UserInfo label="💻 Server Component" user={user} />;
}
