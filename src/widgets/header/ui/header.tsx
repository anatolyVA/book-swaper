import Image from "next/image";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { userApi } from "@/entities/user";
import HeaderRightSide from "@/widgets/header/ui/header.right-side";
import { ROUTES } from "@/shared/config/routes";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center py-3 px-12 h-[70px] border-b bg-background">
      <div className="flex items-center">
        <Link href={ROUTES.HOME} className="mr-8">
          <Image src="/logo.svg" alt="logo" width={180} height={24} />
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
