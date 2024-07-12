import Image from "next/image";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { userApi } from "@/entities/user";
import HeaderRightSide from "@/widgets/header/ui/header.right-side";
import { ROUTES } from "@/shared/config/routes";
import { Logo } from "@/entities/logo";
import { ThemeToggle } from "@/features/theme-toggle/ui/theme.toggle";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center py-3 px-12 h-[70px] bg-background/95 backdrop-blur">
      <div className="flex items-center">
        <Link href={ROUTES.HOME} className="mr-8">
          <Logo />
        </Link>
        <div className="flex gap-2">
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
      <HeaderRightSide />
    </header>
  );
}
