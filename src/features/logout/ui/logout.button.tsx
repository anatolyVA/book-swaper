"use client";

import React from "react";
import { Button } from "@/shared/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { removeFromStorage } from "@/shared/lib/auth-tokens";
import { logout } from "@/features/logout/api";
import { usePathname, useRouter } from "next/navigation";
import { PROTECTED_ROUTES, ROUTES } from "@/shared/config/routes";

interface LogoutButtonProps {
  onLogout?: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleButtonClick = (e: React.MouseEvent) => {
    logout()
      .then((res) => {
        if (PROTECTED_ROUTES.includes(pathname)) {
          router.push(ROUTES.SIGN_IN);
        }
        onLogout?.();
        removeFromStorage();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Button variant="outline" size="icon" onClick={handleButtonClick}>
      <ExitIcon />
    </Button>
  );
}
