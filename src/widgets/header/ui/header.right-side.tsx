"use client";

import React, { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { User, userApi } from "@/entities/user";
import Link from "next/link";
import { LogoutButton } from "@/features/logout";
import { ROUTES } from "@/shared/config/routes";

function HeaderRightSide() {
  const [data, setData] = React.useState<User | null>(null);

  useEffect(() => {
    userApi
      .getCurrentUser()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex gap-2">
      {data ? (
        <>
          <Button variant="default" asChild>
            <Link href={ROUTES.PROFILE}>Profile</Link>
          </Button>
          <LogoutButton />
        </>
      ) : (
        <>
          <Button variant="default" asChild>
            <Link href={ROUTES.LOGIN}>Sign In</Link>
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
