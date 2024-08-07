import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

type Props = {
  message?: string | undefined;
};

function FormError({ message }: Props) {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon />
      <p>{message}</p>
    </div>
  );
}

export default FormError;
