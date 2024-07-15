import React from "react";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";

export function ProfileNavSidebar() {
  return (
    <aside className="flex flex-col gap-2 items-start">
      <header className="text-3xl mb-4 font-semibold">My profile</header>
      <Button asChild className="pl-0" variant="link">
        <Link href={ROUTES.PROFILE}>Overview</Link>
      </Button>
      <Button asChild className="pl-0" variant="link">
        <Link href={ROUTES.USER_SETTINGS}>Settings</Link>
      </Button>
      <Button asChild className="pl-0" variant="link">
        <Link href={ROUTES.USER_BOOKS}>Books</Link>
      </Button>
      <Button asChild className="pl-0" variant="link">
        <Link href={ROUTES.USER_SWAPS}>Swaps</Link>
      </Button>
    </aside>
  );
}
