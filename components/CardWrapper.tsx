"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Socials from "./Socials";

type Props = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  BackButtonHref: string;
  showSocial?: boolean;
};

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  BackButtonHref,
  showSocial = false,
}: Props) => {
  return (
    <Card className="">
      <CardHeader className="text-neutral-500">
        <section className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn("text-3xl font-semibold text-[#2f2f2f]")}>
            🔐Auth
          </h1>
          <h1 className={cn("text-sm font-semibold")}>{headerLabel}</h1>
        </section>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter className="flex justify-center">
        <Link href={BackButtonHref}>
          <Button size={"sm"} variant={"link"} className="font-semibold">
            {backButtonLabel}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
