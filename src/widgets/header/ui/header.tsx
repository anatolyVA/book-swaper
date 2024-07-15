import Image from "next/image";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { userApi } from "@/entities/user";
import HeaderRightSide from "@/widgets/header/ui/header.right-side";
import { ROUTES } from "@/shared/config/routes";
import { Logo } from "@/entities/logo";
import { ThemeToggle } from "@/features/theme-toggle/ui/theme.toggle";
import { HEADER_HEIGHT } from "@/shared/config/const";
import { cn } from "@/shared/lib/utils";

export async function Header() {
  return (
    <header
      className={cn(
        `sticky top-0 z-50 flex justify-between items-center py-3 px-8 bg-background/80 backdrop-blur`,
      )}
      style={{
        minHeight: HEADER_HEIGHT,
      }}
    >
      <div className="flex items-center">
        <Link href={ROUTES.HOME} className="mr-8">
          <Logo className="hidden md:block" />
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
      <HeaderRightSide />
    </header>
  );
}
