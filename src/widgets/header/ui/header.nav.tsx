"use client";

import React from "react";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { Logo } from "@/entities/logo";
import { Button } from "@/shared/ui/button";
import { HeaderBurgerMenu } from "./header.burger-menu";

export function HeaderNav() {
  return (
    <div className="flex items-center">
      <HeaderBurgerMenu />
      <Link href={ROUTES.HOME} className="mr-8 hidden md:block">
        <Logo className="block" />
      </Link>
      <div className="md:flex gap-2 hidden">
        <Button size="default" asChild variant="link">
          <Link href={ROUTES.BOOKS}>Books</Link>
        </Button>
        <Button size="default" asChild variant="link">
          <Link href={`${ROUTES.HOME}/#about-us`}>About us</Link>
        </Button>
        <Button size="default" asChild variant="link">
          <Link href={`${ROUTES.HOME}/#support-form`}>Support</Link>
        </Button>
      </div>
    </div>
  );
}
