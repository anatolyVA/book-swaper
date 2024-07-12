import React from "react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export default function ProfilePage() {
  return (
    <main className="container py-8 grid grid-cols-[2fr_7fr]">
      <aside className="flex flex-col gap-2 items-start">
        <header className="text-3xl mb-4 font-semibold">My profile</header>
        <Button className="pl-0" variant="link">
          Overview
        </Button>
        <Button className="pl-0" variant="link">
          Settings
        </Button>
        <Button className="pl-0" variant="link">
          Books
        </Button>
        <Button className="pl-0" variant="link">
          Swaps
        </Button>
      </aside>
      <section>
        <Avatar className="h-36 w-36">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </section>
    </main>
  );
}
