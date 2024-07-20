import RoleGate from "@/components/role-gate";
import { Card, CardHeader } from "@/components/ui/card";
import React from "react";

type Props = {};

export default async function Page({}: Props) {
  return (
    <RoleGate allowedRole="ADMIN">
      <Card>
        <CardHeader>
          <p className="text-2xl font-semibold text-center">🔑 Admin</p>
        </CardHeader>
        <p>You are allow to see this content</p>
      </Card>
    </RoleGate>
  );
}
