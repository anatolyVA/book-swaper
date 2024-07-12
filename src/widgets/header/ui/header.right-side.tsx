"use client";

import React, { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { User, userApi, UserMenuButton } from "@/entities/user";
import Link from "next/link";
import { LogoutButton } from "@/features/logout";
import { ROUTES } from "@/shared/config/routes";

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
          {data && <UserMenuButton data={data} />}
          <LogoutButton onLogout={() => setIsAuthorized(false)} />
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
    </div>
  );
}

export default HeaderRightSide;
