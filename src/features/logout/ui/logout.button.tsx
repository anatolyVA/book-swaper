"use client";

import React from "react";
import { Button } from "@/shared/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { removeFromStorage } from "@/shared/lib/auth-tokens";
import { logout } from "@/features/logout/api";
import { usePathname, useRouter } from "next/navigation";
import { PROTECTED_ROUTES } from "@/shared/config/routes";

export function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logout()
      .then((res) => {
        if (PROTECTED_ROUTES.includes(pathname)) {
          router.push("/auth#sign-in");
        }
        removeFromStorage();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Button size="icon" onClick={handleButtonClick}>
      <ExitIcon />
    </Button>
  );
}
