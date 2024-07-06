import Image from "next/image";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center py-3 px-12 h-[70px] bg-black">
      <div className="flex text-white leading-[2.2rem]">
        <Image
          src="/logo.svg"
          alt="logo"
          width={0}
          height={50}
          className="w-full"
        />
      </div>
      {/*<Search />*/}
      <div className="flex gap-2">
        <Button asChild>
          <Link href="#">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="#">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}
