import React from "react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";

export function ProfileNavSidebar() {
  return (
    <aside className="flex flex-col gap-4 items-start">
      <header className="text-3xl font-semibold ">My profile</header>
      <main className="flex lg:flex-col gap-2 items-start">
        <Button asChild className="pl-0 pr-2" variant="link">
          <Link href={ROUTES.PROFILE}>Overview</Link>
        </Button>
        <Button asChild className="pl-0 pr-2" variant="link">
          <Link href={ROUTES.USER_SETTINGS}>Settings</Link>
        </Button>
        <Button asChild className="pl-0 pr-2" variant="link">
          <Link href={ROUTES.USER_BOOKS}>Books</Link>
        </Button>
        <Button asChild className="pl-0 pr-2" variant="link">
          <Link href={ROUTES.USER_SWAPS}>Swaps</Link>
        </Button>
        <Button asChild className="pl-0 pr-2" variant="link">
          <Link href={ROUTES.USER_REQUESTS}>Requests</Link>
        </Button>
      </main>
    </aside>
  );
}
