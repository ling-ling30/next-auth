import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

type Props = {};

export default function Socials({}: Props) {
  const onClick = (provider: "github" | "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full bg-background"
        size={"lg"}
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        <FcGoogle />
      </Button>
      <Button
        className="w-full bg-background"
        size={"lg"}
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <GitHubLogoIcon />
      </Button>
    </div>
  );
}
