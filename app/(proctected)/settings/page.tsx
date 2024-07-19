import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

export default async function Page({}: Props) {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut({
            redirectTo: "/",
          });
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
