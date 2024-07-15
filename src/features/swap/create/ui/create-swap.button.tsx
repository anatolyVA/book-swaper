"use client";

import React from "react";
import { Button } from "@/shared/ui/button";
import useStore from "@/shared/lib/use-store";
import { useProfile } from "@/entities/user";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";

export function CreateSwapButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const isAuthorized = useStore(useProfile, (state) => state.isAuthorized);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthorized) {
      e.preventDefault();
      router.push(ROUTES.SIGN_IN);
      return;
    }
    onClick?.(e);
  };

  return (
    <Button onClick={handleClick} className={className}>
      Swap
    </Button>
  );
}
