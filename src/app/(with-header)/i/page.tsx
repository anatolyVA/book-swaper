import React from "react";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";

export default function ProfilePage() {
  return (
    <main>
      <Avatar className="h-36 w-36">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </main>
  );
}
