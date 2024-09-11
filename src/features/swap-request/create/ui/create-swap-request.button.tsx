"use client";

import React from "react";
import { Button, ButtonProps } from "@/shared/ui/button";
import useStore from "@/shared/lib/use-store";
import { useProfile } from "@/entities/user";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";

interface CreateSwapRequestButtonProps extends ButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export const CreateSwapRequestButton = React.forwardRef<
  HTMLButtonElement,
  CreateSwapRequestButtonProps
>(({ onClick, ...props }, ref) => {
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
    <Button ref={ref} onClick={handleClick} {...props}>
      Swap
    </Button>
  );
});

CreateSwapRequestButton.displayName = "CreateSwapRequestButton";
