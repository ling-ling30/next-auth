"use client";
import UseCurrentUser from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";
import React from "react";
import FormError from "./form-error";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export default function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = UseCurrentUser()?.role;
  if (role !== allowedRole) {
    return (
      <FormError message="You dont have permission to view this content!" />
    );
  }
  return <>{children}</>;
}
