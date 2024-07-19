import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import CardWrapper from "./CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type Props = {};

function ErrorCard({}: Props) {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      BackButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
}

export default ErrorCard;
