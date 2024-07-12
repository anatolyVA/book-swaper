"use client";

import React from "react";
import { Button } from "@/shared/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { removeFromStorage } from "@/shared/lib/auth-tokens";
import { logout } from "@/features/logout/api";
import { usePathname, useRouter } from "next/navigation";
import { PROTECTED_ROUTES, ROUTES } from "@/shared/config/routes";
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";

interface LogoutButtonProps {
  onLogout?: () => void;
  asDropdownItem?: boolean;
}

export function LogoutButton({ onLogout, asDropdownItem }: LogoutButtonProps) {
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
  return asDropdownItem ? (
    <DropdownMenuItem onClick={handleButtonClick}>
      <ExitIcon className="h-4 w-4 mr-1" /> Logout
    </DropdownMenuItem>
  ) : (
    <Button variant="outline" size="icon" onClick={handleButtonClick}>
      <ExitIcon />
    </Button>
  );
}
