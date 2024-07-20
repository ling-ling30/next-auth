import { logout } from "@/actions/logout";
import React, { useTransition } from "react";

type Props = {
  children: React.ReactNode;
};

function LogOutButton({ children }: Props) {
  const onClick = () => {
    logout();
  };
  return <span onClick={onClick}>{children}</span>;
}

export default LogOutButton;
