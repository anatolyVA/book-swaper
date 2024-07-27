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
import { HeaderNav } from "./header.nav";

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
      <HeaderNav />
      <HeaderRightSide />
    </header>
  );
}
