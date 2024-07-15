"use client";

import React, { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { useProfile, User, userApi, UserMenuButton } from "@/entities/user";
import Link from "next/link";
import { LogoutButton } from "@/features/logout";
import { ROUTES } from "@/shared/config/routes";
import { ThemeToggle } from "@/features/theme-toggle/ui/theme.toggle";
import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import { CreateBookModal } from "@/features/book/create";

function HeaderRightSide() {
  const fetchProfile = useProfile((state) => state.fetchProfile);
  const profile = useProfile((state) => state.profile);
  const isAuthorized = useProfile((state) => state.isAuthorized);
  const setIsAuthorized = useProfile((state) => state.setIsAuthorized);

  useEffect(() => {
    fetchProfile();
  }, [isAuthorized]);

  return (
    <div className="flex gap-2 items-center">
      {profile ? (
        <>
          {profile && (
            <UserMenuButton
              data={profile}
              logoutButton={
                <LogoutButton
                  onLogout={() => setIsAuthorized?.(false)}
                  asDropdownItem
                />
              }
              createBookSlot={
                <CreateBookModal
                  triggerAsChild
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <PlusIcon className="w-4 h-4 mr-1" /> Add book
                    </DropdownMenuItem>
                  }
                />
              }
            />
          )}
        </>
      ) : (
        <>
          <Button variant="default" asChild>
            <Link href={ROUTES.SIGN_IN}>Sign In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
          </Button>
        </>
      )}
      <ThemeToggle />
    </div>
  );
}

export default HeaderRightSide;
