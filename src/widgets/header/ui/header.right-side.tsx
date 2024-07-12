"use client";

import React, { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { User, userApi, UserMenuButton } from "@/entities/user";
import Link from "next/link";
import { LogoutButton } from "@/features/logout";
import { ROUTES } from "@/shared/config/routes";
import { ThemeToggle } from "@/features/theme-toggle/ui/theme.toggle";

function HeaderRightSide() {
  const [data, setData] = React.useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  useEffect(() => {
    userApi
      .getCurrentUser()
      .then((data) => {
        setIsAuthorized(true);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex gap-4 items-center">
      {isAuthorized && data ? (
        <>
          {data && (
            <UserMenuButton
              data={data}
              logoutButton={
                <LogoutButton
                  onLogout={() => setIsAuthorized(false)}
                  asDropdownItem
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
