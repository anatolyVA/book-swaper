import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { Logo } from "@/entities/logo";
import { Button } from "@/shared/ui/button";

export function HeaderBurgerMenu() {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col font-medium">
        <Link href={ROUTES.HOME}>
          <Logo className="h-14 w-48" />
        </Link>
        <Button
          size="default"
          asChild
          variant="link"
          className="pl-0 justify-start text-lg font-medium"
        >
          <Link href={ROUTES.BOOKS}>Books</Link>
        </Button>
        <Button
          size="default"
          asChild
          variant="link"
          className="pl-0 justify-start text-lg font-medium"
        >
          <Link href={`${ROUTES.HOME}/#about-us`}>About us</Link>
        </Button>
        <Button
          size="default"
          asChild
          variant="link"
          className="pl-0 justify-start text-lg font-medium"
        >
          <Link href={`${ROUTES.HOME}/#support-form`}>Support</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
