"use client"; // Error components must be Client Components

import { useEffect } from "react";
import PillButton from "./components/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[200px]">
      <h1 className="text-lg pb-2">Something went wrong!</h1>
      <PillButton label="Try again" handleClick={() => reset()} />
    </div>
  );
}
